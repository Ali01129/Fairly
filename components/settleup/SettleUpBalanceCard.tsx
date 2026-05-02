import { GroupBalanceItem } from "@/constants/mockData";
import React from "react";
import { Text, View } from "react-native";

interface SettleUpBalanceCardProps {
  balance: GroupBalanceItem;
}

function formatAmount(amount: number, symbol: string) {
  return `-${symbol}${Math.abs(amount).toFixed(2)}`;
}

export const SettleUpBalanceCard: React.FC<SettleUpBalanceCardProps> = ({
  balance,
}) => {
  return (
    <View className="rounded-3xl border border-[#1B1B1B] bg-white px-4 py-6">
      <View className="flex-row items-center">
        <View
          className="h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: balance.color }}
        >
          <Text className="text-lg font-bold text-white">{balance.avatar}</Text>
        </View>

        <View className="ml-3 flex-1">
          <Text className="text-lg text-[#9A968E]">You will pay</Text>
          <Text className="mt-0.5 text-2xl font-semibold text-[#1F1F1F]">
            {balance.name}
          </Text>
        </View>

        <Text className="text-3xl font-semibold text-[#D16A5A]">
          {formatAmount(balance.amount, balance.symbol)}
        </Text>
      </View>
    </View>
  );
};
