#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"
STAMP="$(date +%Y-%m-%d_%H-%M-%S)"
OUT="$ROOT/image-audit-$STAMP.txt"

# what we consider "images"
IMG_EXT_RE='png|jpe?g|webp|gif|svg|ico|avif'

# exclude noisy dirs
EXCLUDE_DIRS=(node_modules .next .git dist out build coverage)

# build find prune args
PRUNE_ARGS=()
for d in "${EXCLUDE_DIRS[@]}"; do
  PRUNE_ARGS+=( -path "$ROOT/$d" -o -path "$ROOT/$d/*" -o )
done
# remove trailing -o if present
if ((${#PRUNE_ARGS[@]} > 0)); then
  unset 'PRUNE_ARGS[-1]'
fi

{
  echo "VISION AI IMAGE AUDIT"
  echo "Root: $ROOT"
  echo "Generated: $STAMP"
  echo

  echo "=============================="
  echo "1) IMAGE FILES FOUND (actual files)"
  echo "=============================="
  echo
  if [ -d "$ROOT/public" ]; then
    echo "-- public/ (served assets) --"
    find "$ROOT/public" -type f -iregex ".*\.($IMG_EXT_RE)$" | sed "s#^$ROOT/##" | sort
    echo
  else
    echo "No public/ directory found."
    echo
  fi

  echo "-- src/ (imported assets, icons, etc) --"
  if [ -d "$ROOT/src" ]; then
    find "$ROOT/src" -type f -iregex ".*\.($IMG_EXT_RE)$" | sed "s#^$ROOT/##" | sort || true
  else
    echo "No src/ directory found."
  fi
  echo

  echo "=============================="
  echo "2) RAW REFERENCES (file:line -> match)"
  echo "   (Anywhere your code references .png/.jpg/.svg/etc)"
  echo "=============================="
  echo

  # Build grep exclude args
  GREP_EX=()
  for d in "${EXCLUDE_DIRS[@]}"; do
    GREP_EX+=( --exclude-dir="$d" )
  done

  # Search places that typically contain references
  SEARCH_PATHS=()
  [ -d "$ROOT/src" ] && SEARCH_PATHS+=("$ROOT/src")
  [ -d "$ROOT/public" ] && SEARCH_PATHS+=("$ROOT/public")
  [ -f "$ROOT/README.md" ] && SEARCH_PATHS+=("$ROOT/README.md")
  [ -f "$ROOT/next.config.js" ] && SEARCH_PATHS+=("$ROOT/next.config.js")
  [ -f "$ROOT/next.config.mjs" ] && SEARCH_PATHS+=("$ROOT/next.config.mjs")
  [ -f "$ROOT/next.config.ts" ] && SEARCH_PATHS+=("$ROOT/next.config.ts")
  [ -f "$ROOT/tailwind.config.js" ] && SEARCH_PATHS+=("$ROOT/tailwind.config.js")
  [ -f "$ROOT/tailwind.config.ts" ] && SEARCH_PATHS+=("$ROOT/tailwind.config.ts")

  if ((${#SEARCH_PATHS[@]} == 0)); then
    echo "Nothing to search (no src/public?)"
  else
    # Print matching lines w/ file + line number
    grep -RIn "${GREP_EX[@]}" -E "\.($IMG_EXT_RE)\b" "${SEARCH_PATHS[@]}" \
      | sed "s#^$ROOT/##" || true
  fi

  echo
  echo "=============================="
  echo "3) EXTRACTED PATHS (unique) + EXISTENCE CHECK"
  echo "   - Detects '/something.png' and import paths like './x.png' or '@/.../x.png'"
  echo "=============================="
  echo

  TMP_RAW="$(mktemp)"
  TMP_PATHS="$(mktemp)"
  TMP_UNIQ="$(mktemp)"

  # Pull out common patterns:
  #  - "/assets/....png"
  #  - "./foo.png" "../bar.jpg" "foo.svg"
  #  - "@/.../img.png" "~/" etc
  #  - CSS url(/x.png)
  if ((${#SEARCH_PATHS[@]} > 0)); then
    grep -RIn "${GREP_EX[@]}" -E "\.($IMG_EXT_RE)\b" "${SEARCH_PATHS[@]}" > "$TMP_RAW" || true
  else
    : > "$TMP_RAW"
  fi

  # Extract probable paths from each matched line
  # - Pull quoted strings OR url(...) contents that end in an image extension
  # - Keep it simple and readable for debugging
  awk -v exts="$IMG_EXT_RE" '
    {
      line=$0
      # url(...) patterns
      while (match(line, /url\(([^)]+)\)/, m)) {
        val=m[1]
        gsub(/^[[:space:]]+|[[:space:]]+$/, "", val)
        gsub(/^["\047]|["\047]$/, "", val) # trim quotes
        if (val ~ "\\.(" exts ")(\\?|#|$)") print val
        line=substr(line, RSTART+RLENGTH)
      }

      # quoted strings that include image extension
      line=$0
      while (match(line, /["\047`][^"\047`]*\.(png|jpe?g|webp|gif|svg|ico|avif)[^"\047`]*["\047`]/, m)) {
        val=m[0]
        gsub(/^["\047`]|["\047`]$/, "", val)
        print val
        line=substr(line, RSTART+RLENGTH)
      }
    }
  ' "$TMP_RAW" > "$TMP_PATHS"

  # Clean + unique
  sed -E 's/[[:space:]]+$//; s/^[[:space:]]+//' "$TMP_PATHS" \
    | grep -Ei "\.($IMG_EXT_RE)($|[?#])" \
    | sort -u > "$TMP_UNIQ" || true

  if [ ! -s "$TMP_UNIQ" ]; then
    echo "No extracted image paths found in code (or pattern didn’t match)."
  else
    printf "%-8s  %s\n" "STATUS" "PATH"
    printf "%-8s  %s\n" "------" "----"

    while IFS= read -r p; do
      # Normalize: remove query/hash for existence checks
      base="${p%%\?*}"
      base="${base%%\#*}"

      # If it starts with "/", treat as public-root path
      if [[ "$base" == /* ]]; then
        file="$ROOT/public$base"
        if [ -f "$file" ]; then
          printf "%-8s  %s\n" "OK" "$p"
        else
          printf "%-8s  %s\n" "MISSING" "$p"
        fi
      else
        # otherwise treat as relative-to-repo or alias-like; try repo root
        # (this will mark many alias imports as MISSING, but you’ll still see them)
        file="$ROOT/$base"
        if [ -f "$file" ]; then
          printf "%-8s  %s\n" "OK" "$p"
        else
          printf "%-8s  %s\n" "CHECK" "$p"
        fi
      fi
    done < "$TMP_UNIQ"
  fi

  echo
  echo "=============================="
  echo "4) WHERE EACH '/public' IMAGE IS USED (reverse lookup)"
  echo "   (Gives you: image -> file(s) that reference it)"
  echo "=============================="
  echo

  if [ -d "$ROOT/public" ]; then
    # list actual public images and search for references to each basename + web path
    while IFS= read -r img; do
      rel="${img#"$ROOT/public"}"       # e.g. /assets/branding/logo.png
      base="$(basename "$img")"

      echo "---- $rel ----"
      # search references by full web path and by basename (helps catch imports)
      grep -RIn "${GREP_EX[@]}" -E "(${rel//\//\\/}|${base//./\\.})" "$ROOT/src" 2>/dev/null \
        | sed "s#^$ROOT/##" || true
      echo
    done < <(find "$ROOT/public" -type f -iregex ".*\.($IMG_EXT_RE)$" | sort)
  else
    echo "No public/ directory found, skipping reverse lookup."
  fi

  echo "DONE. Report saved to: $OUT"
} | tee "$OUT"

