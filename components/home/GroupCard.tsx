import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
    if (myNet > 0.01) return "#7CB287";
    if (myNet < -0.01) return "#CE7565";
    return "#9A9A98";
  };

  return (
    <Pressable style={styles.container} onPress={() => onPress(group.id)}>
      <View style={[styles.avatar, { backgroundColor: `${group.color}1A` }]}>
        <Text style={styles.emoji}>{group.emoji}</Text>
      </View>

      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{group.name}</Text>
        <View style={styles.memberRow}>
          <View style={styles.membersContainer}>
            {group.members.slice(0, 3).map((memberId, idx) => (
              <View
                key={memberId}
                style={[styles.memberAvatar, { marginLeft: idx > 0 ? -8 : 0 }]}
              >
                <Text style={styles.memberInitial}>
                  {memberId.charAt(0).toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
          <Text style={styles.expensesText}>
            {group.expensesCount} expenses
          </Text>
        </View>
      </View>

      <View style={styles.balanceInfo}>
        <Text style={[styles.balanceLabel, { color: getBalanceColor() }]}>
          {getBalanceLabel()}
        </Text>
        <Text style={[styles.balanceAmount, { color: getBalanceColor() }]}>
          {myNet > 0 ? "+" : myNet < 0 ? "-" : ""}
          {symbol}
          {Math.abs(myNet).toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  emoji: {
    fontSize: 21,
  },
  groupInfo: {
    flex: 1,
    minWidth: 0,
  },
  groupName: {
    fontSize: 17,
    fontWeight: "500",
    letterSpacing: -0.35,
    marginBottom: 2,
    color: "#262626",
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  membersContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberAvatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#18273C",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#F7F6F1",
  },
  memberInitial: {
    fontSize: 8,
    fontWeight: "700",
    color: "#F4F5F8",
  },
  expensesText: {
    fontSize: 12,
    color: "#9A9A98",
    letterSpacing: -0.1,
  },
  balanceInfo: {
    textAlign: "right",
    flexShrink: 0,
    minWidth: 104,
    alignItems: "flex-end",
  },
  balanceLabel: {
    fontSize: 10,
    marginBottom: 2,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: -0.6,
  },
});
