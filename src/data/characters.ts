/**
 * Vision AI: Characters removed.
 * This project is a premium multi-modal studio (not character-based).
 * Keep this stub only to prevent legacy imports from breaking builds.
 */
export type Character = {
  id: string;
  name: string;
  category?: string;
  style?: string;
  gender?: string;
  chats?: number;
  createdAt?: number;
  image?: string;
  tags?: string[];
  bio?: string;
  personalityTags?: string[];
};

export const characters: Character[] = [];
