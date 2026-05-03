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

interface Member {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

interface MemberModalProps {
  visible: boolean;
  members: Member[];
  selectedMemberId?: string;
  onSelectMember: (memberId: string) => void;
  onClose: () => void;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  visible,
  members,
  selectedMemberId,
  onSelectMember,
  onClose,
}) => {
  const { height } = useWindowDimensions();

  // dynamic height: base + per-member height, capped
  const modalHeight = Math.min(
    Math.max(220, 80 + members.length * 64),
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
          <View className="flex-row items-center justify-between px-5 py-4">
            <Text className="text-xl font-bold text-[#1B1B1B]">Paid by</Text>
            <Pressable
              onPress={onClose}
              className="h-10 w-10 items-center justify-center"
            >
              <Feather name="x" size={20} color="#1B1B1B" />
            </Pressable>
          </View>

          <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
            {members.map((m) => {
              const selected = selectedMemberId === m.id;
              return (
                <Pressable
                  key={m.id}
                  onPress={() => {
                    onSelectMember(m.id);
                    onClose();
                  }}
                  className={`w-full rounded-xl my-2 px-4 py-3 ${selected ? "bg-white" : ""}`}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <View
                        className="h-10 w-10 items-center justify-center rounded-full mr-4"
                        style={{ backgroundColor: m.color }}
                      >
                        <Text className="text-sm font-bold text-white">
                          {m.avatar}
                        </Text>
                      </View>

                      <Text className="text-base text-[#1B1B1B]">{m.name}</Text>
                    </View>

                    {selected ? (
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
