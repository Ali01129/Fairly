import React from "react";
import { Text, View } from "react-native";

interface UserProfileProps {
  name?: string;
  email?: string;
  initial?: string;
  onEdit?: () => void;
}

export default function UserProfile({
  name = "YO",
  email = "you@paytrack.app",
  initial = "Y",
  onEdit,
}: UserProfileProps) {
  return (
    <View className="flex-row items-center justify-between px-5 py-6">
      <View className="flex-row items-center gap-4 flex-1">
        {/* Black circle with initial */}
        <View className="w-24 h-24 rounded-full bg-[#0D0D0D] justify-center items-center">
          <Text className="text-4xl font-bold text-white">{initial}</Text>
        </View>

        {/* Name and email */}
        <View className="flex-1">
          <Text className="text-4xl font-bold text-[#11181C]">{name}</Text>
          <Text className="text-xl text-gray-500">{email}</Text>
        </View>
      </View>
    </View>
  );
}
