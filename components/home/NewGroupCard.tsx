import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface NewGroupCardProps {
  onPress: () => void;
}

export const NewGroupCard: React.FC<NewGroupCardProps> = ({ onPress }) => {
  return (
    <Pressable
      className="flex-row items-center gap-3 p-5 border-2 border-dashed border-[#DEDCD4] rounded-[16px] mt-2 mb-2.5 bg-[#FCFBF8]"
      onPress={onPress}
    >
      <View className="w-14 h-14 rounded-[11px] bg-[#F4F1EA] justify-center items-center shrink-0">
        <Text className="text-3xl font-light text-[#929089]">+</Text>
      </View>

      <View className="flex-1">
        <Text
          className="text-xl font-medium text-[#4A4A48] mb-0.5"
          style={{ letterSpacing: -0.45 }}
        >
          Start a new group
        </Text>
        <Text
          className="text-md text-[#B2B0A8]"
          style={{ letterSpacing: -0.3 }}
        >
          Trip, household, or whatever
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={24} color="#8D8B85" />
    </Pressable>
  );
};
