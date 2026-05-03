import { GROUP_COLORS } from "@/constants/types";
import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, View } from "react-native";
import { SectionLabel } from "../home/SectionLabel";

type NewGroupColorPickerProps = {
  selectedColor: string;
  onSelectColor: (color: string) => void;
};

export function NewGroupColorPicker({
  selectedColor,
  onSelectColor,
}: NewGroupColorPickerProps) {
  return (
    <View className="mt-4">
      <SectionLabel title="COLOR" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
        className="mt-2"
      >
        {GROUP_COLORS.map((color) => (
          <Pressable
            key={color}
            onPress={() => onSelectColor(color)}
            className="h-12 w-12 items-center justify-center rounded-full border-2"
            style={{
              backgroundColor: color,
              borderColor: selectedColor === color ? "#1B1B1B" : "transparent",
            }}
          >
            {selectedColor === color && (
              <Feather name="check" size={24} color="#FFFFFF" />
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
