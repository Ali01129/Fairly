// ===== Home Screen Types & Data =====

export interface Group {
  id: string;
  name: string;
  emoji: string;
  color: string;
  members: string[];
  expensesCount: number;
}

export interface GroupWithBalance {
  group: Group;
  myNet: number;
}

export const MOCK_GROUPS: Group[] = [
  {
    id: "1",
    name: "Lisbon, May '26",
    emoji: "🇵🇹",
    color: "#FF6B9D",
    members: ["user1", "user2", "user3"],
    expensesCount: 7,
  },
  {
    id: "2",
    name: "Flat 4B",
    emoji: "🏠",
    color: "#FFD93D",
    members: ["user1", "user4"],
    expensesCount: 4,
  },
  {
    id: "3",
    name: "Climbing crew",
    emoji: "🧗",
    color: "#6BCB77",
    members: ["user1", "user2", "user5"],
    expensesCount: 2,
  },
];

export const GROUP_BALANCES = [-131.02, -11.47, 16.33];

// ===== Activity Screen Types & Data =====

export interface ActivityItem {
  id: string;
  type: string;
  emoji: string;
  color: string;
  person: string;
  activity: string;
  group: string;
  amount: number;
  symbol: string;
}

export interface ActivitySection {
  label: string;
  items: ActivityItem[];
}

export const ACTIVITY_SECTIONS: ActivitySection[] = [
  {
    label: "3 DAYS AGO",
    items: [
      {
        id: "1",
        type: "Expenses",
        emoji: "🚕",
        color: "#8BC4A4",
        person: "Amelie",
        activity: "added Uber to airport",
        group: "Lisbon, May '26",
        amount: -8.2,
        symbol: "€",
      },
    ],
  },
  {
    label: "4 DAYS AGO",
    items: [
      {
        id: "2",
        type: "Payments",
        emoji: "🌟",
        color: "#F0C38E",
        person: "You",
        activity: "added Fado night cover",
        group: "Lisbon, May '26",
        amount: 45,
        symbol: "€",
      },
      {
        id: "3",
        type: "Expenses",
        emoji: "🍴",
        color: "#FFB6A1",
        person: "Rohan",
        activity: "added Lunch at Cervejaria",
        group: "Lisbon, May '26",
        amount: -19.5,
        symbol: "€",
      },
    ],
  },
  {
    label: "5 DAYS AGO",
    items: [
      {
        id: "4",
        type: "Expenses",
        emoji: "🚌",
        color: "#9BC8D9",
        person: "Rohan",
        activity: "added Tram passes (4)",
        group: "Lisbon, May '26",
        amount: -6,
        symbol: "€",
      },
      {
        id: "5",
        type: "@You",
        emoji: "🍝",
        color: "#FFC7A7",
        person: "Sofia",
        activity: "added Pastéis de Belém",
        group: "Lisbon, May '26",
        amount: -4.63,
        symbol: "€",
      },
    ],
  },
  {
    label: "6 DAYS AGO",
    items: [
      {
        id: "6",
        type: "Expenses",
        emoji: "🏠",
        color: "#AFC5FF",
        person: "Amelie",
        activity: "added Airbnb in Alfama",
        group: "Lisbon, May '26",
        amount: -210,
        symbol: "€",
      },
      {
        id: "7",
        type: "Payments",
        emoji: "🍽️",
        color: "#FFB6A1",
        person: "You",
        activity: "added Time Out Market dinner",
        group: "Lisbon, May '26",
        amount: 72.3,
        symbol: "€",
      },
    ],
  },
  {
    label: "MONDAY, APR 27",
    items: [
      {
        id: "8",
        type: "Payments",
        emoji: "💳",
        color: "#C7B8FF",
        person: "You",
        activity: "paid back the apartment deposit",
        group: "Flat 4B",
        amount: 120,
        symbol: "€",
      },
    ],
  },
];

// ===== Insights Screen Types & Data =====

export interface Category {
  name: string;
  amount: number;
  color: string;
  icon: string;
}

export interface InsightGroup {
  name: string;
  amount: number;
  memberCount: number;
}

// Period-based categories data
const CATEGORIES_BY_PERIOD: Record<"week" | "month" | "year", Category[]> = {
  week: [
    { name: "Stay", amount: 45.0, color: "#3B82F6", icon: "🏠" },
    { name: "Utilities", amount: 12.5, color: "#10B981", icon: "⚡" },
    { name: "Food & drink", amount: 28.75, color: "#EF4444", icon: "🍽️" },
    { name: "Groceries", amount: 9.5, color: "#A855F7", icon: "🛒" },
    { name: "Fun", amount: 15.2, color: "#D97706", icon: "🎉" },
    { name: "Transport", amount: 8.1, color: "#6B7280", icon: "🚗" },
  ],
  month: [
    { name: "Stay", amount: 210.0, color: "#3B82F6", icon: "🏠" },
    { name: "Utilities", amount: 62.43, color: "#10B981", icon: "⚡" },
    { name: "Food & drink", amount: 62.39, color: "#EF4444", icon: "🍽️" },
    { name: "Groceries", amount: 29.22, color: "#A855F7", icon: "🛒" },
    { name: "Fun", amount: 27.0, color: "#D97706", icon: "🎉" },
    { name: "Transport", amount: 14.2, color: "#6B7280", icon: "🚗" },
  ],
  year: [
    { name: "Stay", amount: 2520.0, color: "#3B82F6", icon: "🏠" },
    { name: "Utilities", amount: 747.0, color: "#10B981", icon: "⚡" },
    { name: "Food & drink", amount: 748.8, color: "#EF4444", icon: "🍽️" },
    { name: "Groceries", amount: 350.64, color: "#A855F7", icon: "🛒" },
    { name: "Fun", amount: 324.0, color: "#D97706", icon: "🎉" },
    { name: "Transport", amount: 170.4, color: "#6B7280", icon: "🚗" },
  ],
};

// Period-based insight groups data - using the same groups from MOCK_GROUPS
const INSIGHT_GROUPS_BY_PERIOD: Record<
  "week" | "month" | "year",
  InsightGroup[]
> = {
  week: [
    { name: "Lisbon, May '26", amount: 89.5, memberCount: 3 },
    { name: "Flat 4B", amount: 45.3, memberCount: 2 },
    { name: "Climbing crew", amount: 18.6, memberCount: 3 },
  ],
  month: [
    { name: "Lisbon, May '26", amount: 456.2, memberCount: 3 },
    { name: "Flat 4B", amount: 234.5, memberCount: 2 },
    { name: "Climbing crew", amount: 89.3, memberCount: 3 },
  ],
  year: [
    { name: "Lisbon, May '26", amount: 5547.0, memberCount: 3 },
    { name: "Flat 4B", amount: 2814.0, memberCount: 2 },
    { name: "Climbing crew", amount: 1071.6, memberCount: 3 },
  ],
};

export function getCategoriesForPeriod(
  period: "week" | "month" | "year",
): Category[] {
  return CATEGORIES_BY_PERIOD[period] || CATEGORIES_BY_PERIOD.month;
}

export function getInsightGroupsForPeriod(
  period: "week" | "month" | "year",
): InsightGroup[] {
  return INSIGHT_GROUPS_BY_PERIOD[period] || INSIGHT_GROUPS_BY_PERIOD.month;
}

// Backward compatibility exports
export const CATEGORIES = CATEGORIES_BY_PERIOD.month;
export const INSIGHT_GROUPS = INSIGHT_GROUPS_BY_PERIOD.month;

export const COLORS = ["#3B82F6", "#10B981", "#EF4444"];
