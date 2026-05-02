import React from "react";
import { Text, View } from "react-native";

interface SectionLabelProps {
  title: string;
}

export default function SectionLabel({ title }: SectionLabelProps) {
  return (
    <View className="py-4">
      <Text className="text-xl font-semibold text-gray-500">{title}</Text>
    </View>
  );
}
