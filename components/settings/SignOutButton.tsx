import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface SignOutButtonProps {
  onPress?: () => void;
}

export default function SignOutButton({ onPress }: SignOutButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <View className="bg-white rounded-2xl py-4 px-5 border border-gray-100 flex-row items-center justify-center gap-2 mx-5 mb-8">
        <Ionicons name="log-out" size={20} color="#FF6B6B" />
        <Text className="text-base font-semibold text-[#FF6B6B]">Sign Out</Text>
      </View>
    </Pressable>
  );
}
