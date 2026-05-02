import React from "react";
import { Pressable, Text, View } from "react-native";

type ActivityItem = {
  id: string;
  type: string;
  emoji: string;
  color: string;
  person: string;
  activity: string;
  group: string;
  amount: number;
  symbol: string;
};

export default function ActivityRow({ item }: { item: ActivityItem }) {
  const amountColor =
    item.amount > 0 ? "#008839" : item.amount < 0 ? "#D16A5A" : "#9A9A98";

  return (
    <Pressable className="flex-row items-center rounded-[24px] bg-[#fff] px-4 py-4 mb-3 border border-[#EFEAE1]">
      <View
        className="w-14 h-14 rounded-[11px] justify-center items-center shrink-0"
        style={{ backgroundColor: `${item.color}1A` }}
      >
        <Text className="text-3xl">{item.emoji}</Text>
      </View>

      <View className="flex-1 min-w-0 ml-3 mr-3">
        <View className="flex-row items-start gap-2">
          <View className="flex-1 min-w-0">
            <Text
              className="text-[15px] text-[#222222] leading-5"
              style={{ letterSpacing: -0.25 }}
            >
              <Text className="font-semibold">{item.person}</Text>{" "}
              <Text className="font-normal">{item.activity}</Text>
            </Text>

            <Text
              className="mt-1 text-sm text-[#94918A]"
              style={{ letterSpacing: -0.15 }}
            >
              {item.group}
            </Text>
          </View>
        </View>
      </View>

      <View className="items-end shrink-0">
        <Text
          className="text-[17px] font-semibold"
          style={{ letterSpacing: -0.45, color: amountColor }}
        >
          {item.amount > 0 ? "+" : item.amount < 0 ? "-" : ""}
          {item.symbol}
          {Math.abs(item.amount).toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
}
