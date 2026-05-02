import React from "react";
import { Pressable, Text, View } from "react-native";

const ACTIVITY_TABS = ["All activity", "Expenses", "Payments", "@You"];

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
            className={`h-[46px] shrink-0 justify-center rounded-3xl px-4 ${isActive ? "bg-[#101013]" : "bg-[#F4F3EF]"}`}
          >
            <Text
              className={`text-[15px] ${isActive ? "font-semibold text-white" : "font-normal text-[#3D3D3D]"}`}
              style={{ letterSpacing: -0.2 }}
            >
              {tab}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
