import { Feather } from "@expo/vector-icons";
import { Pressable, Text, TextInput, View } from "react-native";

type NewGroupIconCardProps = {
  groupName: string;
  onChangeGroupName: (value: string) => void;
  selectedColor: string;
  selectedIcon: string;
  onOpenIconSelect: () => void;
};

export function NewGroupIconCard({
  groupName,
  onChangeGroupName,
  selectedColor,
  selectedIcon,
  onOpenIconSelect,
}: NewGroupIconCardProps) {
  return (
    <View className="mt-6 flex-row items-center gap-4">
      <Pressable
        onPress={onOpenIconSelect}
        className="h-20 w-20 items-center justify-center rounded-3xl"
        style={{ backgroundColor: selectedColor }}
      >
        <Feather
          name={selectedIcon as keyof typeof Feather.glyphMap}
          size={40}
          color="#FFFFFF"
        />
      </Pressable>

      <View className="flex-1">
        <TextInput
          value={groupName}
          onChangeText={onChangeGroupName}
          placeholder="Group name"
          placeholderTextColor="#9E9A93"
          className="text-4xl font-semibold text-[#1B1B1B]"
        />
        <Text className="text-md text-[#9E9A93]">e.g. "Lisbon, May '26"</Text>
      </View>
    </View>
  );
}
