import { Feather } from "@expo/vector-icons";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

type AddExpenseHeaderProps = {
  onClose: () => void;
  onSave: () => void;
  isSaveEnabled: boolean;
};

export function AddExpenseHeader({
  onClose,
  onSave,
  isSaveEnabled,
}: AddExpenseHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <Pressable
          className="h-11 w-11 items-center justify-center"
          onPress={onClose}
        >
          <Feather name="x" size={24} color="#1B1B1B" />
        </Pressable>
        <Text
          className="text-4xl font-black text-[#1B1B1B]"
          style={{ letterSpacing: -0.9, lineHeight: 36 }}
        >
          New expense
        </Text>
      </View>

      <TouchableOpacity
        className="rounded-full px-5 py-2"
        style={{ backgroundColor: isSaveEnabled ? "#101013" : "#EFEDE7" }}
        disabled={!isSaveEnabled}
        onPress={onSave}
      >
        <Text
          className="text-lg font-semibold"
          style={{ color: isSaveEnabled ? "#FFFFFF" : "#B8B4AC" }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
}
