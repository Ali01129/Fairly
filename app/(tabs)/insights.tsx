import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  AmountDisplay,
  GroupCard,
  InsightsHeader,
  SectionLabel,
} from "@/components/insights";
import {
  COLORS,
  getCategoriesForPeriod,
  getInsightGroupsForPeriod,
  MOCK_GROUPS,
} from "@/constants/mockData";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function InsightsScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "year"
  >("month");

  // Get data based on selected period
  const categories = getCategoriesForPeriod(selectedPeriod);
  const insightGroups = getInsightGroupsForPeriod(selectedPeriod);

  // Calculate total and percentages for categories
  const totalCategories = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const maxCategory = Math.max(...categories.map((cat) => cat.amount));

  const categoriesWithPercentage = categories.map((cat) => ({
    name: cat.name,
    amount: cat.amount,
    percentage: (cat.amount / maxCategory) * 100,
    color: cat.color,
    // categories should provide an icon (Feather key) for the insights GroupCard
    // map category names to Feather icons
    icon: (
      {
        "Food & drink": "coffee",
        Stay: "home",
        Transport: "truck",
        Fun: "smile",
        Groceries: "shopping-bag",
        Utilities: "zap",
        Other: "more-horizontal",
      } as Record<
        string,
        keyof typeof import("@expo/vector-icons").Feather.glyphMap
      >
    )[cat.name],
    isCategory: true,
  }));

  // Calculate total and percentages for groups
  const totalGroups = insightGroups.reduce(
    (sum, group) => sum + group.amount,
    0,
  );
  const maxGroup = Math.max(...insightGroups.map((group) => group.amount));

  const groupsWithPercentage = insightGroups.map((group, index) => ({
    ...group,
    percentage: (group.amount / maxGroup) * 100,
    // Prefer the real group's configured color/icon when available
    color:
      MOCK_GROUPS.find((g) => g.name === group.name)?.color ||
      COLORS[index % COLORS.length],
    icon: MOCK_GROUPS.find((g) => g.name === group.name)?.icon as
      | keyof typeof import("@expo/vector-icons").Feather.glyphMap
      | undefined,
    emoji: MOCK_GROUPS.find((g) => g.name === group.name)?.emoji,
  }));

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <View className="flex-1 px-5 pt-2">
        <InsightsHeader
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 14, paddingBottom: 96 }}
        >
          <AmountDisplay
            amount={totalCategories}
            change={-12}
            period={selectedPeriod}
          />

          {/* <GraphPlaceholder period={selectedPeriod} /> */}

          <SectionLabel title="BY CATEGORY" />
          <GroupCard groups={categoriesWithPercentage} />

          <SectionLabel title="BY GROUP" />
          <GroupCard groups={groupsWithPercentage} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
