import React from "react";
import { Text, View } from "react-native";

export default function SettingsHeader() {
  return (
    <View className="flex-row justify-between items-center px-5 py-4">
      <Text className="text-3xl font-black text-[#11181C]">Settings</Text>
    </View>
  );
}
