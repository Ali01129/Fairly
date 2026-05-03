import { Feather } from "@expo/vector-icons";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

type NewGroupHeaderProps = {
  onClose: () => void;
  onCreate: () => void;
  isCreateEnabled: boolean;
};

export function NewGroupHeader({
  onClose,
  onCreate,
  isCreateEnabled,
}: NewGroupHeaderProps) {
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
          New group
        </Text>
      </View>

      <TouchableOpacity
        className="rounded-full px-5 py-2"
        style={{ backgroundColor: isCreateEnabled ? "#101013" : "#EFEDE7" }}
        disabled={!isCreateEnabled}
        onPress={onCreate}
      >
        <Text
          className="text-lg font-semibold"
          style={{ color: isCreateEnabled ? "#FFFFFF" : "#B8B4AC" }}
        >
          Create
        </Text>
      </TouchableOpacity>
    </View>
  );
}
