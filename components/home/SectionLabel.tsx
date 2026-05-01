import React from "react";
import { Text, View } from "react-native";

interface SectionLabelProps {
  title: string;
  subtitle?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  title,
  subtitle,
}) => {
  return (
    <View className="flex-row justify-between items-center py-4 mt-1">
      <Text
        className="text-md font-semibold text-[#B1B0AB] uppercase"
        style={{ letterSpacing: 1 }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          className="text-md text-[#7C7B78] font-normal"
          style={{ letterSpacing: 0 }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};
