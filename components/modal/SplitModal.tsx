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

interface SplitModalProps {
  visible: boolean;
  selected: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const OPTIONS = [
  {
    key: "Equally",
    label: "Equally",
    description: "Split evenly across selected people",
    icon: "hash",
  },
  {
    key: "By amounts",
    label: "By amounts",
    description: "Type how much each person owes",
    icon: "hash",
  },
  {
    key: "By percent",
    label: "By percent",
    description: "Split by percentages",
    icon: "percent",
  },
  {
    key: "By shares",
    label: "By shares",
    description: "e.g. 2x for one, 1x for rest",
    icon: "clock",
  },
  {
    key: "Itemized",
    label: "Itemized",
    description: "Per-item, like a restaurant bill",
    icon: "list",
  },
];

export const SplitModal: React.FC<SplitModalProps> = ({
  visible,
  selected,
  onSelect,
  onClose,
}) => {
  const { height } = useWindowDimensions();

  // dynamic height based on option count, similar to MemberModal
  const modalHeight = Math.min(
    Math.max(220, 180 + OPTIONS.length * 64),
    height * 0.72,
    520,
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-transparent">
        <View
          className="rounded-t-3xl"
          style={{ backgroundColor: "#E8E4DC", height: modalHeight }}
        >
          <View className="flex-row items-center justify-between p-6">
            <Text className="text-xl font-bold text-[#1B1B1B]">
              How to split
            </Text>
            <Pressable
              onPress={onClose}
              className="h-10 w-10 items-center justify-center"
            >
              <Feather name="x" size={20} color="#1B1B1B" />
            </Pressable>
          </View>

          <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
            {OPTIONS.map((opt) => {
              const active = selected === opt.key;
              return (
                <Pressable
                  key={opt.key}
                  onPress={() => {
                    onSelect(opt.key);
                    onClose();
                  }}
                  className={`w-full rounded-xl my-2 px-4 py-3 ${active ? "bg-white" : ""}`}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <View className="h-14 w-14 items-center justify-center rounded-xl bg-[#F4F3EF] mr-4">
                        <Feather
                          name={opt.icon as any}
                          size={18}
                          color="#1B1B1B"
                        />
                      </View>

                      <View style={{ maxWidth: 260 }}>
                        <Text className="text-xl text-[#1B1B1B]">
                          {opt.label}
                        </Text>
                        <Text className="text-md text-[#A19C94] mt-1">
                          {opt.description}
                        </Text>
                      </View>
                    </View>

                    {active ? (
                      <Feather name="check" size={20} color="#2D5BFF" />
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default SplitModal;
