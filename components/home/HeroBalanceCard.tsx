import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface HeroBalanceCardProps {
  overallNet: number;
  groupsCount: number;
  symbol: string;
  totalOwed: number;
  totalOwe: number;
}

export const HeroBalanceCard: React.FC<HeroBalanceCardProps> = ({
  overallNet,
  groupsCount,
  symbol,
  totalOwed,
  totalOwe,
}) => {
  const getStatusMessage = (): string => {
    if (overallNet > 0.01) {
      return `You're owed across ${groupsCount} groups`;
    } else if (overallNet < -0.01) {
      return `You owe across ${groupsCount} groups`;
    }
    return "You're all settled up";
  };

  const getNetColor = (): string => {
    if (overallNet > 0.01) return "#7CFFB2";
    if (overallNet < -0.01) return "#FFB4A3";
    return "#FFF";
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <View style={styles.header}>
          <Text style={styles.headerLabel}>Overall balance</Text>
          <Text style={styles.dateLabel}>APR 2026</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amount}>
            {overallNet < 0 ? "-" : "+"}
            {symbol}
            {Math.abs(overallNet).toFixed(2)}
          </Text>
        </View>

        <Text style={styles.statusMessage}>{getStatusMessage()}</Text>

        <View style={styles.divider} />

        <View style={styles.statsRow}>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>Owed to you</Text>
            <Text style={styles.amountOwed}>
              {symbol}
              {totalOwed.toFixed(2)}
            </Text>
          </View>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>You owe</Text>
            <Text style={styles.amountOwe}>
              {symbol}
              {totalOwe.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  heroCard: {
    backgroundColor: "#101D42",
    borderRadius: 22,
    padding: 28,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.22)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(243, 247, 255, 0.72)",
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  dateLabel: {
    fontSize: 14,
    color: "rgba(243, 247, 255, 0.65)",
    letterSpacing: 1.1,
    fontFamily: "monospace",
    fontWeight: "600",
  },
  amountContainer: {
    marginBottom: 8,
  },
  amount: {
    fontSize: 60,
    color: "#fff",
    fontWeight: "600",
    lineHeight: 58,
    letterSpacing: -1,
  },
  statusMessage: {
    fontSize: 15,
    color: "rgba(241, 245, 255, 0.86)",
    marginTop: 3,
    letterSpacing: -0.3,
    fontWeight: "500",
  },
  divider: {
    marginVertical: 24,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  statCol: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: "rgba(243, 247, 255, 0.72)",
    textTransform: "uppercase",
    letterSpacing: 0.9,
    marginBottom: 6,
    fontWeight: "600",
  },
  amountOwed: {
    fontSize: 28,
    fontWeight: "600",
    color: "#00fc4c",
    letterSpacing: -0.5,
  },
  amountOwe: {
    fontSize: 28,
    fontWeight: "600",
    color: "#d76250",
    letterSpacing: -0.5,
  },
});
