import React from "react";
import { Pressable, Text, View } from "react-native";

const ACTIVITY_TABS = ["All Activities", "Expenses", "Payments", "@You"];

type ActivityTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export default function ActivityTabs({
  activeTab,
  onTabChange,
}: ActivityTabsProps) {
  return (
    <View className="mt-6 flex-row items-start gap-2">
      {ACTIVITY_TABS.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <Pressable
            key={tab}
            onPress={() => onTabChange(tab)}
            className={`justify-center rounded-full p-4 ${isActive ? "bg-black" : "bg-[#F4F3EF]"}`}
          >
            <Text
              className={`text-base ${isActive ? "font-semibold text-white" : "font-normal text-[#3D3D3D]"}`}
            >
              {tab}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
