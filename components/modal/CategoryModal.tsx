import { Feather } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    View,
    useWindowDimensions,
} from "react-native";

interface Category {
  name: string;
  icon: keyof typeof Feather.glyphMap;
}

interface CategoryModalProps {
  visible: boolean;
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
  onClose: () => void;
}

const CATEGORIES: Category[] = [
  { name: "Food & drink", icon: "coffee" },
  { name: "Stay", icon: "home" },
  { name: "Transport", icon: "truck" },
  { name: "Fun", icon: "smile" },
  { name: "Groceries", icon: "shopping-bag" },
  { name: "Utilities", icon: "zap" },
  { name: "Other", icon: "more-horizontal" },
];

export const CategoryModal: React.FC<CategoryModalProps> = ({
  visible,
  selectedCategory,
  onSelectCategory,
  onClose,
}) => {
  const { height } = useWindowDimensions();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-end"
        style={{ backgroundColor: "transparent" }}
      >
        <View
          className="rounded-t-3xl bg-white"
          style={{
            backgroundColor: "#E8E4DC",
            height: Math.min(height * 0.75, 550),
          }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between p-6">
            <Text className="text-4xl font-bold text-[#1B1B1B]">Category</Text>
            <Pressable
              className="h-10 w-10 items-center justify-center"
              onPress={onClose}
            >
              <Feather name="x" size={20} color="#1B1B1B" />
            </Pressable>
          </View>

          {/* Categories Grid */}
          <ScrollView
            className="flex-1 px-5 py-6"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-row flex-wrap justify-between">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category.name;

                return (
                  <Pressable
                    key={category.name}
                    onPress={() => {
                      onSelectCategory(category.name);
                      onClose();
                    }}
                    className="mb-4 w-[30%] items-center gap-3 rounded-2xl py-6"
                    style={{
                      backgroundColor: isSelected ? "#1B1B1B" : "#F3F0EA",
                    }}
                  >
                    <Feather
                      name={category.icon}
                      size={28}
                      color={isSelected ? "#FFFFFF" : "#4A4A4A"}
                    />
                    <Text
                      className="text-center text-sm font-medium"
                      style={{
                        color: isSelected ? "#FFFFFF" : "#4A4A4A",
                      }}
                    >
                      {category.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
