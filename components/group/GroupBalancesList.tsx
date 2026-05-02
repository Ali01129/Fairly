import React from "react";
import { Text, View } from "react-native";

interface Balance {
  id: string;
  name: string;
  relation: string;
  amount: number;
  symbol: string;
  avatar: string;
  color: string;
}

interface GroupBalancesListProps {
  balances: Balance[];
}

function formatAmount(amount: number, symbol: string) {
  return `${amount > 0 ? "+" : amount < 0 ? "-" : ""}${symbol}${Math.abs(amount).toFixed(2)}`;
}

export const GroupBalancesList: React.FC<GroupBalancesListProps> = ({
  balances,
}) => {
  return (
    <View>
      {balances.map((balance) => {
        const amountColor = balance.amount > 0 ? "#008839" : "#D16A5A";

        return (
          <View
            key={balance.id}
            className="mb-3 flex-row items-center rounded-3xl border border-[#EFEAE1] bg-white px-4 py-4"
          >
            <View
              className="h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: balance.color }}
            >
              <Text className="text-lg font-bold text-white">
                {balance.avatar}
              </Text>
            </View>

            <View className="ml-3 flex-1">
              <Text className="text-lg text-[#222222]">
                <Text className="font-semibold text-[#1F1F1F]">
                  {balance.relation} {balance.name}
                </Text>
              </Text>
            </View>

            <Text
              className="text-lg font-semibold"
              style={{ color: amountColor }}
            >
              {formatAmount(balance.amount, balance.symbol)}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
