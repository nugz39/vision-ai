"use client";

import { useMemo } from "react";

/**
 * Mock subscription hook.
 * Replace with real auth/subscription later without changing page UI structure.
 */
export function useSubscription() {
  // Toggle these for testing:
  const isLoggedIn = false;
  const hasStudioAccess = false;

  return useMemo(() => ({ isLoggedIn, hasStudioAccess }), [isLoggedIn, hasStudioAccess]);
}
