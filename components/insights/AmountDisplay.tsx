import React from "react";
import { Text, View } from "react-native";

interface AmountDisplayProps {
  amount: number;
  currency?: string;
  change?: number;
  period: "week" | "month" | "year";
}

export default function AmountDisplay({
  amount,
  currency = "€",
  change,
  period,
}: AmountDisplayProps) {
  const periodLabels = {
    week: "LAST 7 DAYS",
    month: "LAST 30 DAYS",
    year: "LAST 12 MONTHS",
  };

  return (
    <View className="py-4">
      <Text className="text-lg text-gray-500 mb-2">{periodLabels[period]}</Text>
      <Text className="text-7xl font-semibold text-black mb-2">
        {currency}
        {amount.toFixed(2)}
      </Text>
    </View>
  );
}
