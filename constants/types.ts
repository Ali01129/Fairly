import { Feather } from "@expo/vector-icons";

export interface GroupType {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
}

export const GROUP_TYPES: GroupType[] = [
  {
    id: "trip",
    name: "Trip",
    description: "Vacations and getaways",
    icon: "image",
  },
  {
    id: "roommates",
    name: "Roommates",
    description: "Shared household bills",
    icon: "home",
  },
  {
    id: "friends",
    name: "Friends",
    description: "Outings and hangouts",
    icon: "users",
  },
  {
    id: "couple",
    name: "Couple",
    description: "Shared with a partner",
    icon: "heart",
  },
  {
    id: "other",
    name: "Other",
    description: "Anything else",
    icon: "more-horizontal",
  },
];

export const GROUP_COLORS = [
  "#2563EB",
  "#FF6B6B",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#1F2937",
];
