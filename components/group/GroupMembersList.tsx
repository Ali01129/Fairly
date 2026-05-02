import React from "react";
import { Text, View } from "react-native";

interface Member {
  id: string;
  name: string;
  amount: number;
  symbol: string;
  avatar: string;
  color: string;
}

interface GroupMembersListProps {
  members: Member[];
}

function formatAmount(amount: number, symbol: string) {
  return `${amount > 0 ? "+" : amount < 0 ? "-" : ""}${symbol}${Math.abs(amount).toFixed(2)}`;
}

export const GroupMembersList: React.FC<GroupMembersListProps> = ({
  members,
}) => {
  const maxAmount = Math.max(...members.map((m) => Math.abs(m.amount)));

  return (
    <View className="rounded-3xl border border-[#EFEAE1] bg-white p-4">
      {members.map((member, index) => {
        const amountColor = member.amount > 0 ? "#008839" : "#D16A5A";
        const progressColor = member.amount > 0 ? "#008839" : "#D16A5A";
        const progressPercent = (Math.abs(member.amount) / maxAmount) * 100;

        return (
          <View key={member.id} className="py-3">
            <View className="flex-row items-start gap-3">
              <View
                className="h-12 w-12 items-center justify-center rounded-full shrink-0"
                style={{ backgroundColor: member.color }}
              >
                <Text className="text-lg font-bold text-white">
                  {member.avatar}
                </Text>
              </View>

              <View className="flex-1 min-w-0 mx-2">
                <Text className="text-lg font-medium text-[#1F1F1F]">
                  {member.name}
                </Text>

                <View className="mt-2 h-2 w-full rounded-full overflow-hidden bg-[#F0F0F0]">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor: progressColor,
                    }}
                  />
                </View>
              </View>

              <Text
                className="text-lg font-semibold shrink-0"
                style={{ color: amountColor }}
              >
                {formatAmount(member.amount, member.symbol)}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};
