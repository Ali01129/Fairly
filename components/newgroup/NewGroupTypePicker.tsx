import { GROUP_TYPES } from "@/constants/types";
import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SectionLabel } from "../home/SectionLabel";

type NewGroupTypePickerProps = {
  selectedType: string;
  onSelectType: (typeId: string) => void;
};

export function NewGroupTypePicker({
  selectedType,
  onSelectType,
}: NewGroupTypePickerProps) {
  return (
    <View className="mt-6">
      <SectionLabel title="TYPE" />
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={{ gap: 8 }}
        className="mt-2"
      >
        {GROUP_TYPES.map((type) => (
          <Pressable
            key={type.id}
            onPress={() => onSelectType(type.id)}
            className="flex-row items-center justify-between rounded-2xl border p-4"
            style={{
              backgroundColor: selectedType === type.id ? "#F5F3ED" : "#FFFFFF",
              borderColor: selectedType === type.id ? "#1B1B1B" : "#ECE8DF",
            }}
          >
            <View className="flex-row items-center gap-3">
              <View className="h-14 w-14 items-center justify-center rounded-xl bg-[#EAF2FF]">
                <Feather name={type.icon} size={26} color="#1B1B1B" />
              </View>
              <View>
                <Text className="text-2xl text-[#1B1B1B]">{type.name}</Text>
                <Text className="text-sm text-[#7A7670]">
                  {type.description}
                </Text>
              </View>
            </View>
            {selectedType === type.id && (
              <Feather name="check" size={20} color="#1B1B1B" />
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
