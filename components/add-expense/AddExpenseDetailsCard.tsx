import { Feather } from "@expo/vector-icons";
import { Pressable, Text, TextInput, View } from "react-native";

import type { GroupMemberItem } from "@/constants/mockData";

type AddExpenseDetailsCardProps = {
  selectedCategory: string;
  selectedCategoryIcon: keyof typeof Feather.glyphMap;
  expenseName: string;
  onChangeExpenseName: (value: string) => void;
  selectedPayer: GroupMemberItem | undefined;
  onOpenCategory: () => void;
  onOpenPaidBy: () => void;
  selectedSplit: string;
  onOpenSplit: () => void;
};

export function AddExpenseDetailsCard({
  selectedCategory,
  selectedCategoryIcon,
  expenseName,
  onChangeExpenseName,
  selectedPayer,
  onOpenCategory,
  onOpenPaidBy,
  selectedSplit,
  onOpenSplit,
}: AddExpenseDetailsCardProps) {
  return (
    <View className="mt-8 rounded-3xl border border-[#ECE8DF] bg-white p-4">
      <View className="flex-row items-center justify-between py-3">
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF2FF]">
            <Feather name={selectedCategoryIcon} size={22} color="#1B1B1B" />
          </View>
          <TextInput
            value={expenseName}
            onChangeText={onChangeExpenseName}
            placeholder="What's this for?"
            placeholderTextColor="#9E9A93"
            className="text-xl text-[#1F1F1F]"
          />
        </View>

        <Pressable
          onPress={onOpenCategory}
          className="flex-row items-center rounded-full border border-[#E8E4DC] bg-[#f4f3ef] px-5 py-3"
        >
          <Text className="text-xl font-medium text-black">
            {selectedCategory}
          </Text>
          <Feather name="chevron-right" size={18} color="#B0ACA5" />
        </Pressable>
      </View>

      <View className="h-px bg-[#F3F0E9]" />

      <Pressable
        onPress={onOpenPaidBy}
        className="flex-row items-center justify-between py-4"
      >
        <View className="flex-row items-center gap-3">
          <Text className="text-xl text-[#7A7670]">Paid by</Text>
          <View
            className="ml-4 h-7 w-7 items-center justify-center rounded-full"
            style={{ backgroundColor: selectedPayer?.color ?? "#2A2A2A" }}
          >
            <Text className="text-xs font-bold text-white">
              {selectedPayer?.avatar ?? "YO"}
            </Text>
          </View>
          <Text className="text-xl font-medium text-[#1B1B1B]">
            {selectedPayer?.name ?? "You"}
          </Text>
        </View>
        <Feather name="chevron-right" size={18} color="#B0ACA5" />
      </Pressable>

      <View className="h-px bg-[#F3F0E9]" />

      <Pressable
        onPress={onOpenSplit}
        className="flex-row items-center justify-between py-4"
      >
        <View className="flex-row items-center gap-2">
          <Text className="text-xl text-[#7A7670]">Split</Text>
          <Text className="ml-4 text-xl font-medium text-[#1B1B1B]">
            {selectedSplit}
          </Text>
        </View>
        <Feather name="chevron-right" size={18} color="#B0ACA5" />
      </Pressable>
    </View>
  );
}
