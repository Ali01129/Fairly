import React from "react";
import { Text, View } from "react-native";

interface GroupSummaryCardProps {
  emoji: string;
  color: string;
  owedLabel: string;
  netBalance: number;
  symbol: string;
  totalSpent: number;
}

function formatAmount(amount: number, symbol: string) {
  return `${amount > 0 ? "+" : amount < 0 ? "-" : ""}${symbol}${Math.abs(amount).toFixed(2)}`;
}

export const GroupSummaryCard: React.FC<GroupSummaryCardProps> = ({
  emoji,
  color,
  owedLabel,
  netBalance,
  symbol,
  totalSpent,
}) => {
  return (
    <View className="rounded-3xl border border-[#EFEAE1] bg-white px-5 py-8">
      <View className="flex-row items-center gap-4">
        <View
          className="h-24 w-24 items-center justify-center rounded-[16px]"
          style={{ backgroundColor: `${color}1A` }}
        >
          <Text className="text-5xl">{emoji}</Text>
        </View>

        <View className="flex-1">
          <Text
            className="text-lg font-semibold uppercase text-[#C5BFB6]"
            style={{ letterSpacing: 1 }}
          >
            {owedLabel}
          </Text>
          <Text
            className="mt-3 text-5xl font-black text-[#111111]"
            style={{ letterSpacing: -1.2, lineHeight: 36 }}
          >
            {formatAmount(netBalance, symbol)}
          </Text>
          <Text className="mt-2 text-lg text-[#A19C93]">
            Total spent:{" "}
            <Text className="text-[#111111]">€{totalSpent.toFixed(2)}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
