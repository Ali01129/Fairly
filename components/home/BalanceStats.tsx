import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BalanceStatsProps {
  totalOwed: number;
  totalOwe: number;
  symbol: string;
}

export const BalanceStats: React.FC<BalanceStatsProps> = ({
  totalOwed,
  totalOwe,
  symbol,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        {/* Owed to You */}
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Owed to you</Text>
          <Text style={styles.amountOwed}>
            {symbol}
            {totalOwed.toFixed(2)}
          </Text>
        </View>

        {/* You Owe */}
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>You owe</Text>
          <Text style={styles.amountOwe}>
            {symbol}
            {totalOwe.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 0,
    marginTop: -24,
    position: "relative",
    zIndex: 10,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statBox: {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  statLabel: {
    fontSize: 9,
    color: "rgba(255, 255, 255, 0.5)",
    textTransform: "uppercase",
    letterSpacing: 0.08,
    marginBottom: 8,
    fontWeight: "600",
  },
  amountOwed: {
    fontSize: 20,
    fontWeight: "600",
    color: "#7CFFB2",
  },
  amountOwe: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FF6B6B",
  },
});
