import React from "react";
import { Text } from "react-native";

export default function ActivitySectionLabel({ label }: { label: string }) {
  return (
    <Text
      className="mb-3 text-sm font-medium text-[#A19C93]"
      style={{ letterSpacing: 0.9 }}
    >
      {label}
    </Text>
  );
}
