import React, { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ActivityRow,
  ActivitySectionLabel,
  ActivityTabs,
} from "@/components/activity";
import { useThemeColor } from "@/hooks/use-theme-color";

type ActivityItem = {
  id: string;
  type: string;
  emoji: string;
  color: string;
  person: string;
  activity: string;
  group: string;
  amount: number;
  symbol: string;
};

type ActivitySection = {
  label: string;
  items: ActivityItem[];
};

const ACTIVITY_SECTIONS: ActivitySection[] = [
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

export default function ActivityScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const [activeTab, setActiveTab] = useState<string>("All activity");

  const filteredSections = useMemo(() => {
    return ACTIVITY_SECTIONS.map((section) => ({
      ...section,
      items:
        activeTab === "All activity"
          ? section.items
          : section.items.filter((item) => item.type === activeTab),
    })).filter((section) => section.items.length > 0);
  }, [activeTab]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <View className="flex-1 px-5 pt-2">
        <View className="flex-row items-start justify-between">
          <Text
            className="text-[34px] font-black text-[#1B1B1B]"
            style={{ letterSpacing: -1.2, lineHeight: 36 }}
          >
            Activity
          </Text>
        </View>

        <ActivityTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 14, paddingBottom: 96 }}
        >
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => (
              <View key={section.label} className="mb-6">
                <ActivitySectionLabel label={section.label} />

                {section.items.map((item) => (
                  <ActivityRow key={item.id} item={item} />
                ))}
              </View>
            ))
          ) : (
            <View className="mt-10 rounded-[24px] border border-[#EFEAE1] bg-[#FBFAF7] px-5 py-8">
              <Text className="text-base font-semibold text-[#1F1F1F]">
                No activity in this filter.
              </Text>
              <Text className="mt-1 text-sm text-[#8E8A83]">
                Try another tab to see recent updates.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
