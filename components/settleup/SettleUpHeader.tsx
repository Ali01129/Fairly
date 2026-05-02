import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface SettleUpHeaderProps {
  onBack: () => void;
}

export const SettleUpHeader: React.FC<SettleUpHeaderProps> = ({ onBack }) => {
  return (
    <View className="flex-row items-center">
      <Pressable
        className="h-11 w-11 items-start justify-center"
        onPress={onBack}
      >
        <Feather name="arrow-left" size={24} color="#1B1B1B" />
      </Pressable>

      <Text
        className="text-4xl font-black text-[#1B1B1B]"
        style={{ letterSpacing: -1, lineHeight: 36 }}
      >
        Settle up
      </Text>
    </View>
  );
};
