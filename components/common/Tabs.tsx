import React from "react";
import { Pressable, Text, View } from "react-native";

interface TabsComponentProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabsComponent: React.FC<TabsComponentProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <View className="mt-6 flex-row items-start gap-2">
      {tabs.map((tab) => {
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
};
