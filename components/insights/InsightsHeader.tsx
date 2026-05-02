import React from "react";
import { Pressable, Text, View } from "react-native";

interface InsightsHeaderProps {
  selectedPeriod: "week" | "month" | "year";
  onPeriodChange: (period: "week" | "month" | "year") => void;
}

export default function InsightsHeader({
  selectedPeriod,
  onPeriodChange,
}: InsightsHeaderProps) {
  const periods = ["Week", "Month", "Year"] as const;
  const periodValues = ["week", "month", "year"] as const;

  return (
    <View className="flex-row items-center justify-between">
      <Text
        className="text-[34px] font-black text-[#1B1B1B]"
        style={{ letterSpacing: -1.2, lineHeight: 36 }}
      >
        Insights
      </Text>

      <View className="flex-row gap-2">
        {periods.map((period, index) => {
          const value = periodValues[index];
          const isActive = selectedPeriod === value;

          return (
            <Pressable
              key={value}
              onPress={() => onPeriodChange(value)}
              className={`h-[46px] shrink-0 justify-center rounded-3xl px-4 ${
                isActive ? "bg-[#101013]" : "bg-[#F4F3EF]"
              }`}
            >
              <Text
                className={`text-[15px] ${
                  isActive
                    ? "font-semibold text-white"
                    : "font-normal text-[#3D3D3D]"
                }`}
                style={{ letterSpacing: -0.2 }}
              >
                {period}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
