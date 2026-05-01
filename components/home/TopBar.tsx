import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface TopBarProps {
  onSearch?: () => void;
  onNotifications?: () => void;
  hasNotifications?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  onSearch,
  onNotifications,
  hasNotifications = false,
}) => {
  return (
    <View className="flex-row justify-between items-center bg-[#FAFAF7]">
      <View className="flex-row items-center gap-2.5">
        <View className="w-12 h-12 rounded-[12px] bg-[#0D0D0D] justify-center items-center">
          <Text className="font-bold text-2xl text-white">F</Text>
        </View>
        <Text
          className="text-2xl font-black text-[#1E1E1E]"
          style={{ letterSpacing: -0.3, lineHeight: 24 }}
        >
          Fairly
        </Text>
      </View>

      <View className="flex-row gap-2">
        <Pressable
          className="relative w-[30px] h-[30px] rounded-full justify-center items-center"
          onPress={onNotifications}
        >
          <Ionicons name="notifications-outline" size={26} color="#2B2B2B" />
          {hasNotifications && (
            <View className="absolute top-[5px] right-1 w-1.5 h-1.5 rounded-full bg-[#D76C56] border border-[#FAFAF7]" />
          )}
        </Pressable>
      </View>
    </View>
  );
};
