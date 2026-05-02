import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface GroupHeaderProps {
  groupName: string;
  memberCount: number;
  onBack: () => void;
  onMembersPress?: () => void;
}

export const GroupHeader: React.FC<GroupHeaderProps> = ({
  groupName,
  memberCount,
  onBack,
  onMembersPress,
}) => {
  return (
    <View className="flex-row items-start justify-between">
      <Pressable
        className="h-11 w-11 items-start justify-center"
        onPress={onBack}
      >
        <Feather name="arrow-left" size={24} color="#1B1B1B" />
      </Pressable>

      <View className="flex-1 px-2 pt-1">
        <Text
          className="text-4xl font-black text-[#1B1B1B]"
          style={{ letterSpacing: -1, lineHeight: 32 }}
        >
          {groupName}
        </Text>
        <Text className="mt-1 text-lg text-[#A19C93]">
          Trip • {memberCount} people
        </Text>
      </View>

      <Pressable
        className="h-11 w-11 items-end justify-center"
        onPress={onMembersPress}
      >
        <Feather name="users" size={22} color="#1B1B1B" />
      </Pressable>
    </View>
  );
};
