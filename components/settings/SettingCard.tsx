import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface SettingCardProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export default function SettingCard({
  icon,
  title,
  subtitle,
  onPress,
}: SettingCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View className="flex-row items-center justify-between bg-white rounded-2xl px-5 py-4 mb-3 border border-gray-100">
        <View className="flex-row items-center gap-4 flex-1">
          {/* Icon with background */}
          <View className="w-12 h-12 rounded-xl bg-gray-100 justify-center items-center">
            <Ionicons name={icon as any} size={24} color="#11181C" />
          </View>

          {/* Title and subtitle */}
          <View className="flex-1">
            <Text className="text-base font-semibold text-[#11181C]">
              {title}
            </Text>
            {subtitle && (
              <Text className="text-sm text-gray-500 mt-0.5">{subtitle}</Text>
            )}
          </View>
        </View>

        {/* Arrow icon */}
        <Ionicons name="chevron-forward" size={20} color="#D0D0D0" />
      </View>
    </Pressable>
  );
}
