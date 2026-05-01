import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeColor } from "@/hooks/use-theme-color";

export default function ActivityScreen() {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView
      className="flex-1 items-center justify-center"
      style={{ backgroundColor }}
    >
      <Text className="text-xl text-[#11181C]">Activity</Text>
    </SafeAreaView>
  );
}
