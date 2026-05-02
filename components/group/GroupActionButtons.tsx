import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface GroupActionButtonsProps {
  onAddExpense?: () => void;
  onSettleUp?: () => void;
}

export const GroupActionButtons: React.FC<GroupActionButtonsProps> = ({
  onAddExpense,
  onSettleUp,
}) => {
  return (
    <View className="mt-4 flex-row gap-3">
      <Pressable
        className="flex-1 flex-row items-center justify-center gap-2 rounded-full bg-[#101013] px-4 py-6"
        onPress={onAddExpense}
      >
        <Feather name="plus" size={18} color="#FFFFFF" />
        <Text className="text-xl font-semibold text-white">Add expense</Text>
      </Pressable>

      <Pressable
        className="flex-1 flex-row items-center justify-center gap-2 rounded-full bg-[#F4F3EF] px-4 py-6"
        onPress={onSettleUp}
      >
        <Feather name="send" size={18} color="#1F1F1F" />
        <Text className="text-xl font-semibold text-[#1F1F1F]">Settle up</Text>
      </Pressable>
    </View>
  );
};
