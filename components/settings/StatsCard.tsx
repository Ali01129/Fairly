import React from "react";
import { Text, View } from "react-native";

interface Stat {
  number: number;
  label: string;
}

interface StatsCardProps {
  stats: Stat[];
}

export default function StatsCard({ stats }: StatsCardProps) {
  return (
    <View className="flex-row justify-between gap-3 px-5 py-4">
      {stats.map((stat, index) => (
        <View
          key={index}
          className="flex-1 bg-white rounded-3xl py-6 items-center border border-gray-200"
        >
          <Text className="text-4xl font-bold text-[#11181C]">
            {stat.number}
          </Text>
          <Text className="text-lg text-gray-400 mt-1">{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}
