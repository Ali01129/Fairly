import { Feather } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import type { GroupMemberItem } from "@/constants/mockData";

type ItemizedLineItem = {
  id: string;
  name: string;
  amount: string;
  memberIds: string[];
};

type AddExpenseSplitPreviewProps = {
  members: GroupMemberItem[];
  selectedSplit: string;
  selectedMemberIds: string[];
  splitAmount: number;
  memberAmounts: Record<string, string>;
  onToggleMember: (memberId: string) => void;
  onChangeMemberAmount: (memberId: string, value: string) => void;
  onFocusAmount: () => void;
  parsedAmount?: number;
  memberPercentages?: Record<string, string>;
  onChangeMemberPercentage?: (memberId: string, value: string) => void;
  memberShares?: Record<string, number>;
  onChangeMemberShare?: (memberId: string, delta: number) => void;
};

export function AddExpenseSplitPreview({
  members,
  selectedSplit,
  selectedMemberIds,
  splitAmount,
  memberAmounts,
  onToggleMember,
  onChangeMemberAmount,
  onFocusAmount,
  parsedAmount = 0,
  memberPercentages = {},
  onChangeMemberPercentage = () => {},
  memberShares = {},
  onChangeMemberShare = () => {},
}: AddExpenseSplitPreviewProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [focusedMemberId, setFocusedMemberId] = useState<string | null>(null);
  const [itemizedItems, setItemizedItems] = useState<ItemizedLineItem[]>([]);

  const createItemizedItem = (): ItemizedLineItem => ({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: "",
    amount: "",
    memberIds: members.map((member) => member.id),
  });

  const addItemizedItem = () => {
    setItemizedItems((prev) => [...prev, createItemizedItem()]);
  };

  const removeItemizedItem = (itemId: string) => {
    setItemizedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const toggleItemizedMember = (itemId: string, memberId: string) => {
    setItemizedItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        const isSelected = item.memberIds.includes(memberId);
        return {
          ...item,
          memberIds: isSelected
            ? item.memberIds.filter((id) => id !== memberId)
            : [...item.memberIds, memberId],
        };
      }),
    );
  };

  const handleInputFocus = (memberId: string) => {
    setFocusedMemberId(memberId);
    onFocusAmount();

    // Scroll to the focused input
    setTimeout(() => {
      const memberIndex = members.findIndex((m) => m.id === memberId);
      if (scrollViewRef.current && memberIndex !== -1) {
        scrollViewRef.current.scrollTo({
          y: Math.max(0, memberIndex * 80 - 50),
          animated: true,
        });
      }
    }, 100);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ width: "100%" }}
    >
      <ScrollView
        ref={scrollViewRef}
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
      >
        <View className="rounded-3xl border border-[#ECE8DF] bg-white p-6">
          <Text className="mb-3 text-base text-[#A19C94]">
            Tap to include or exclude. Each pays €{splitAmount.toFixed(2)}
          </Text>

          {selectedSplit === "By amounts" ? (
            members.map((member) => {
              const value = memberAmounts[member.id] ?? "";

              return (
                <View
                  key={member.id}
                  className="flex-row items-center justify-between py-3"
                >
                  <View className="flex-row items-center gap-3">
                    <View
                      className="h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: member.color }}
                    >
                      <Text className="text-xs font-bold text-white">
                        {member.avatar}
                      </Text>
                    </View>

                    <Text className="text-xl text-[#1F1F1F]">
                      {member.name}
                    </Text>
                  </View>

                  <View className="flex-row items-center rounded-2xl border border-[#ECE8DF] bg-[#FAF9F6] px-4">
                    <Text className="mr-2 text-xl text-black">€</Text>
                    <TextInput
                      value={value}
                      onChangeText={(nextValue) =>
                        onChangeMemberAmount(member.id, nextValue)
                      }
                      onFocus={() => handleInputFocus(member.id)}
                      keyboardType="decimal-pad"
                      placeholder="0.00"
                      placeholderTextColor="#C7C4BE"
                      className="min-w-[72px] text-right text-xl text-[#1F1F1F]"
                      style={{ lineHeight: 24 }}
                    />
                  </View>
                </View>
              );
            })
          ) : selectedSplit === "Itemized" ? (
            <View>
              <Text className="mb-4 text-base text-[#A19C94]">
                Add line items, then choose who splits each one.
              </Text>

              {itemizedItems.length === 0 ? null : (
                <View className="mb-4 gap-4">
                  {itemizedItems.map((item, index) => (
                    <View
                      key={item.id}
                      className="rounded-3xl border border-[#ECE8DF] bg-[#FCFBF8] p-4"
                    >
                      <View className="flex-row items-center gap-3">
                        <TextInput
                          value={item.name}
                          onChangeText={(nextValue) => {
                            setItemizedItems((prev) =>
                              prev.map((currentItem) =>
                                currentItem.id === item.id
                                  ? {
                                      ...currentItem,
                                      name: nextValue,
                                    }
                                  : currentItem,
                              ),
                            );
                          }}
                          placeholder={`Item ${index + 1}`}
                          placeholderTextColor="#C7C4BE"
                          className="flex-1 text-xl text-[#1F1F1F]"
                          style={{ lineHeight: 24 }}
                        />

                        <View className="flex-row items-center rounded-2xl border border-[#ECE8DF] bg-white px-4">
                          <Text className="mr-2 text-xl text-black">€</Text>
                          <TextInput
                            value={item.amount}
                            onChangeText={(nextValue) => {
                              const cleaned = nextValue.replace(/[^0-9.]/g, "");
                              const parts = cleaned.split(".");
                              const formatted =
                                parts.length === 1
                                  ? parts[0]
                                  : `${parts[0]}.${parts
                                      .slice(1)
                                      .join("")
                                      .slice(0, 2)}`;

                              setItemizedItems((prev) =>
                                prev.map((currentItem) =>
                                  currentItem.id === item.id
                                    ? {
                                        ...currentItem,
                                        amount: formatted,
                                      }
                                    : currentItem,
                                ),
                              );
                            }}
                            keyboardType="decimal-pad"
                            placeholder="0.00"
                            placeholderTextColor="#C7C4BE"
                            className="min-w-[88px] text-right text-xl text-[#1F1F1F]"
                            style={{ lineHeight: 24 }}
                          />
                        </View>

                        <Pressable
                          onPress={() => removeItemizedItem(item.id)}
                          className="h-10 w-10 items-center justify-center rounded-full bg-[#F2EFE8]"
                        >
                          <Feather name="x" size={18} color="#1F1F1F" />
                        </Pressable>
                      </View>

                      <View className="mt-4 flex-row flex-wrap gap-2">
                        {members.map((member) => {
                          const isSelected = item.memberIds.includes(member.id);

                          return (
                            <Pressable
                              key={member.id}
                              onPress={() =>
                                toggleItemizedMember(item.id, member.id)
                              }
                              className={`flex-row items-center rounded-full border px-3 py-2 ${isSelected ? "border-[#1F1F1F] bg-[#1F1F1F]" : "border-[#ECE8DF] bg-white"}`}
                            >
                              <View
                                className="mr-2 h-6 w-6 items-center justify-center rounded-full"
                                style={{ backgroundColor: member.color }}
                              >
                                <Text className="text-[10px] font-bold text-white">
                                  {member.avatar}
                                </Text>
                              </View>
                              <Text
                                className={`text-sm font-medium ${isSelected ? "text-white" : "text-[#1F1F1F]"}`}
                              >
                                {member.name}
                              </Text>
                            </Pressable>
                          );
                        })}
                      </View>
                    </View>
                  ))}
                </View>
              )}

              <Pressable
                onPress={addItemizedItem}
                className="flex-row items-center gap-3 rounded-[16px] border-2 border-dashed border-[#DEDCD4] bg-[#FCFBF8] p-5"
              >
                <View className="h-14 w-14 items-center justify-center rounded-[11px] bg-[#F4F1EA]">
                  <Text className="text-3xl font-light text-[#929089]">+</Text>
                </View>

                <View className="flex-1">
                  <Text
                    className="mb-0.5 text-xl font-medium text-[#4A4A48]"
                    style={{ letterSpacing: -0.45 }}
                  >
                    Add line item
                  </Text>
                  <Text
                    className="text-md text-[#B2B0A8]"
                    style={{ letterSpacing: -0.3 }}
                  >
                    Name, amount, and members
                  </Text>
                </View>

                <Feather name="chevron-right" size={24} color="#8D8B85" />
              </Pressable>
            </View>
          ) : selectedSplit === "By percent" ? (
            members.map((member) => {
              const percentValue = memberPercentages[member.id] ?? "";
              const memberAmount =
                (parsedAmount * Number(percentValue || "0")) / 100;

              return (
                <View
                  key={member.id}
                  className="flex-row items-center justify-between py-3"
                >
                  <View className="flex-row items-center gap-3">
                    <View
                      className="h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: member.color }}
                    >
                      <Text className="text-xs font-bold text-white">
                        {member.avatar}
                      </Text>
                    </View>

                    <Text className="text-xl text-[#1F1F1F]">
                      {member.name}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Text className="text-base text-[#A19C94]">
                      €{memberAmount.toFixed(2)}
                    </Text>

                    <View className="flex-row items-center rounded-2xl border border-[#ECE8DF] bg-[#FAF9F6] px-4">
                      <TextInput
                        value={percentValue}
                        onChangeText={(nextValue) =>
                          onChangeMemberPercentage(member.id, nextValue)
                        }
                        onFocus={() => handleInputFocus(member.id)}
                        keyboardType="decimal-pad"
                        placeholder="0"
                        placeholderTextColor="#C7C4BE"
                        className="text-center text-xl text-[#1F1F1F]"
                        style={{ lineHeight: 24, minWidth: 50 }}
                      />
                      <Text className="ml-1 text-xl text-black">%</Text>
                    </View>
                  </View>
                </View>
              );
            })
          ) : selectedSplit === "By shares" ? (
            members.map((member) => {
              const shareCount = memberShares[member.id] ?? 1;
              const totalShares = members.reduce(
                (sum, currentMember) =>
                  sum + (memberShares[currentMember.id] ?? 1),
                0,
              );
              const memberAmount =
                totalShares > 0 ? (parsedAmount * shareCount) / totalShares : 0;

              return (
                <View
                  key={member.id}
                  className="flex-row items-center justify-between py-3"
                >
                  <View className="flex-row items-center gap-3">
                    <View
                      className="h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: member.color }}
                    >
                      <Text className="text-xs font-bold text-white">
                        {member.avatar}
                      </Text>
                    </View>

                    <Text className="text-xl text-[#1F1F1F]">
                      {member.name}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Text className="text-base text-[#A19C94]">
                      €{memberAmount.toFixed(2)}
                    </Text>

                    <View className="flex-row items-center rounded-2xl border border-[#ECE8DF] bg-[#FAF9F6] px-3 py-2">
                      <Pressable
                        onPress={() => onChangeMemberShare(member.id, -1)}
                        className="h-8 w-8 items-center justify-center rounded-xl bg-[#F2EFE8]"
                      >
                        <Feather name="minus" size={16} color="#1F1F1F" />
                      </Pressable>

                      <Text className="mx-3 min-w-[28px] text-center text-xl text-[#1F1F1F]">
                        {shareCount}x
                      </Text>

                      <Pressable
                        onPress={() => onChangeMemberShare(member.id, 1)}
                        className="h-8 w-8 items-center justify-center rounded-xl bg-[#F2EFE8]"
                      >
                        <Feather name="plus" size={16} color="#1F1F1F" />
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            members.map((member) => {
              const isChecked = selectedMemberIds.includes(member.id);

              return (
                <Pressable
                  key={member.id}
                  onPress={() => onToggleMember(member.id)}
                  className="flex-row items-center justify-between py-3"
                >
                  <View className="flex-row items-center gap-3">
                    <View
                      className="h-6 w-6 items-center justify-center rounded-md"
                      style={{
                        backgroundColor: isChecked ? "#2D5BFF" : "#E8E5DE",
                      }}
                    >
                      {isChecked ? (
                        <Feather name="check" size={14} color="#FFFFFF" />
                      ) : null}
                    </View>

                    <View
                      className="h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: member.color }}
                    >
                      <Text className="text-xs font-bold text-white">
                        {member.avatar}
                      </Text>
                    </View>

                    <Text className="text-xl text-[#1F1F1F]">
                      {member.name}
                    </Text>
                  </View>

                  <Text className="text-xl text-[#66625C]">
                    €{isChecked ? splitAmount.toFixed(2) : "0.00"}
                  </Text>
                </Pressable>
              );
            })
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
