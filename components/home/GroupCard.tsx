import React from "react";
import { Pressable, Text, View } from "react-native";

interface GroupCardProps {
  group: {
    id: string;
    name: string;
    emoji: string;
    color: string;
    members: string[];
    expensesCount: number;
  };
  myNet: number;
  symbol: string;
  onPress: (groupId: string) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  myNet,
  symbol,
  onPress,
}) => {
  const getBalanceLabel = (): string => {
    if (myNet > 0.01) return "Owed";
    if (myNet < -0.01) return "You owe";
    return "Settled";
  };

  const getBalanceColor = (): string => {
    if (myNet > 0.01) return "#008839";
    if (myNet < -0.01) return "#ff2f00";
    return "#9A9A98";
  };

  return (
    <Pressable
      className="flex-row items-center gap-3 rounded-2xl p-5 bg-white mb-3 border border-[#E0E0E0]"
      onPress={() => onPress(group.id)}
    >
      <View
        className="w-14 h-14 rounded-[11px] justify-center items-center shrink-0"
        style={{ backgroundColor: `${group.color}1A` }}
      >
        <Text className="text-3xl">{group.emoji}</Text>
      </View>

      <View className="flex-1 min-w-0">
        <Text
          className="text-lg font-medium text-[#262626] mb-0.5"
          style={{ letterSpacing: -0.35 }}
        >
          {group.name}
        </Text>
        <View className="flex-row items-center gap-2">
          <View className="flex-row items-center">
            {group.members.slice(0, 3).map((memberId, idx) => (
              <View
                key={memberId}
                className="w-5 h-5 rounded-full bg-[#18273C] justify-center items-center border border-[#F7F6F1]"
                style={{ marginLeft: idx > 0 ? -8 : 0 }}
              >
                <Text className="text-[8px] font-bold text-[#F4F5F8]">
                  {memberId.charAt(0).toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
          <Text
            className="text-sm text-[#9A9A98]"
            style={{ letterSpacing: -0.1 }}
          >
            {group.expensesCount} expenses
          </Text>
        </View>
      </View>

      <View className="shrink-0 w-[104px] items-end">
        <Text
          className="text-md font-semibold uppercase mb-0.5 text-[#B1B0AB]"
          style={{ letterSpacing: 0.5 }}
        >
          {getBalanceLabel()}
        </Text>
        <Text
          className="text-xl font-semibold"
          style={{ letterSpacing: -0.6, color: getBalanceColor() }}
        >
          {myNet > 0 ? "+" : myNet < 0 ? "-" : ""}
          {symbol}
          {Math.abs(myNet).toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
};
