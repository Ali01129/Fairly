import React, { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ActivitySectionLabel } from "@/components/activity";
import CardRow from "@/components/common/CardRow";
import { TabsComponent } from "@/components/common/Tabs";
import { ACTIVITY_SECTIONS } from "@/constants/mockData";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function ActivityScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const [activeTab, setActiveTab] = useState<string>("All Activities");

  const filteredSections = useMemo(() => {
    return ACTIVITY_SECTIONS.map((section) => ({
      ...section,
      items:
        activeTab === "All Activities"
          ? section.items
          : section.items.filter((item) => item.type === activeTab),
    })).filter((section) => section.items.length > 0);
  }, [activeTab]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <View className="flex-1 px-5 pt-2">
        <View className="flex-row items-start justify-between">
          <Text
            className="text-4xl font-black text-[#1B1B1B]"
            style={{ letterSpacing: -1.2, lineHeight: 36 }}
          >
            Activity
          </Text>
        </View>

        <TabsComponent
          tabs={["All Activities", "Expenses", "Payments", "@You"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

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
                  <CardRow
                    key={item.id}
                    left={{
                      icon: item.categoryIcon,
                      backgroundColor: `${item.groupColor || "#CCCCCC"}1A`,
                    }}
                    title={
                      <>
                        <Text className="font-semibold">{item.person}</Text>{" "}
                        <Text className="font-normal">{item.activity}</Text>
                      </>
                    }
                    subtitle={item.group}
                    amount={item.amount}
                    symbol={item.symbol}
                  />
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
