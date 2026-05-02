import React from "react";
import { Text, View } from "react-native";

interface GroupCardProps {
  groups: Array<{
    name: string;
    amount: number;
    percentage: number;
    color: string;
    memberCount?: number;
  }>;
  currency?: string;
}

export default function GroupCard({ groups, currency = "€" }: GroupCardProps) {
  return (
    <View className="rounded-3xl border border-[#D8D8D8] bg-white p-6">
      {groups.map((group, index) => (
        <View key={group.name}>
          <View className={index > 0 ? "mt-4" : undefined}>
            <View className="flex-row items-center justify-between gap-4">
              <View className="flex-row items-center gap-3 flex-1">
                <View
                  className="w-12 h-12 rounded-[11px] justify-center items-center shrink-0"
                  style={{ backgroundColor: `${group.color}1A` }}
                >
                  <View
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: group.color }}
                  />
                </View>

                <View className="flex-1">
                  <Text className="text-lg font-bold text-[#11181C]">
                    {group.name}
                  </Text>
                  {group.memberCount !== undefined && (
                    <Text className="text-md text-gray-500 mt-0.5">
                      {group.memberCount} member
                      {group.memberCount !== 1 ? "s" : ""}
                    </Text>
                  )}
                </View>
              </View>

              <Text className="text-xl font-bold text-[#11181C]">
                {currency}
                {group.amount.toFixed(2)}
              </Text>
            </View>
          </View>
          {index < groups.length - 1 && (
            <View className="mt-4 border-b border-gray-300" />
          )}
        </View>
      ))}
    </View>
  );
}
