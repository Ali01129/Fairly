import React from "react";
import { Text, View } from "react-native";

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
    <View className="py-3">
      <View className="bg-[#101D42] rounded-[22px] p-7 border border-[rgba(255,255,255,0.22)]">
        <View className="flex-row justify-between items-center mb-4">
          <Text
            className="text-sm font-semibold text-[rgba(243,247,255,0.72)] uppercase"
            style={{ letterSpacing: 0.7 }}
          >
            Overall balance
          </Text>
          <Text
            className="text-sm text-[rgba(243,247,255,0.65)] font-mono font-semibold"
            style={{ letterSpacing: 1.1 }}
          >
            APR 2026
          </Text>
        </View>

        <View className="mb-2">
          <Text
            className="text-6xl text-white font-semibold"
            style={{ lineHeight: 58, letterSpacing: -1 }}
          >
            {overallNet < 0 ? "-" : "+"}
            {symbol}
            {Math.abs(overallNet).toFixed(2)}
          </Text>
        </View>

        <Text
          className="text-base text-[rgba(241,245,255,0.86)] font-medium"
          style={{ letterSpacing: -0.3 }}
        >
          {getStatusMessage()}
        </Text>

        <View className="my-6 h-px bg-[rgba(255,255,255,0.2)]" />

        <View className="flex-row justify-between items-center gap-3">
          <View className="flex-1">
            <Text
              className="text-sm text-[rgba(243,247,255,0.72)] uppercase font-semibold mb-1.5"
              style={{ letterSpacing: 0.9 }}
            >
              Owed to you
            </Text>
            <Text
              className="text-3xl font-semibold text-[#00fc4c]"
              style={{ letterSpacing: -0.5 }}
            >
              {symbol}
              {totalOwed.toFixed(2)}
            </Text>
          </View>
          <View className="flex-1">
            <Text
              className="text-sm text-[rgba(243,247,255,0.72)] uppercase font-semibold mb-1.5"
              style={{ letterSpacing: 0.9 }}
            >
              You owe
            </Text>
            <Text
              className="text-3xl font-semibold text-[#d76250]"
              style={{ letterSpacing: -0.5 }}
            >
              {symbol}
              {totalOwe.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
