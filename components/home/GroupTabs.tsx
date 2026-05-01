import React from "react";
import { Pressable, ScrollView, Text } from "react-native";

interface GroupTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = ["All groups", "Trips", "Roommates", "Friends", "Settled"];

export const GroupTabs: React.FC<GroupTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-2 mb-1"
      contentContainerStyle={{ gap: 7, paddingRight: 16 }}
    >
      {TABS.map((tab) => (
        <Pressable
          key={tab}
          onPress={() => onTabChange(tab)}
          className={`px-5 py-3 rounded-[20px] ${
            activeTab === tab ? "bg-[#101013]" : "bg-[#f4f3ef]"
          }`}
        >
          <Text
            className={`text-base ${
              activeTab === tab
                ? "text-white font-semibold"
                : "font-normal text-[#3D3D3D]"
            }`}
            style={{ letterSpacing: -0.3 }}
          >
            {tab}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};
