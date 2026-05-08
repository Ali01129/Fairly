import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

type FeatherIconName = keyof typeof Feather.glyphMap;

interface LeftProps {
  icon?: FeatherIconName;
  emoji?: string;
  backgroundColor?: string;
  borderColor?: string;
}

interface CardRowProps {
  variant?: "group" | "activity" | "default";
  left?: LeftProps;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  // small label above amount (eg. "Owed", "You owe", "Settled")
  topRightLabel?: React.ReactNode;
  amount?: number;
  symbol?: string;
  amountColor?: string;
  // for group-style member avatars
  members?: string[];
  expensesCount?: number;
  onPress?: () => void;
  className?: string;
}

const defaultPositive = "#008839";
const defaultNegative = "#D16A5A";
const neutral = "#9A9A98";

export default function CardRow({
  variant = "default",
  left,
  title,
  subtitle,
  topRightLabel,
  amount,
  symbol,
  amountColor,
  members,
  expensesCount,
  onPress,
  className,
}: CardRowProps) {
  const renderLeft = () => {
    const bg = left?.backgroundColor || "#CCCCCC";
    const borderColor = left?.borderColor || "#ECE8DF";

    return (
      <View
        className="w-14 h-14 rounded-[11px] justify-center items-center shrink-0"
        style={{ backgroundColor: bg }}
      >
        {left?.icon ? (
          <Feather name={left.icon} size={20} color="#FFFFFF" />
        ) : left?.emoji ? (
          <Text className="text-3xl" style={{ color: "#1B1B1B" }}>
            {left.emoji}
          </Text>
        ) : null}
      </View>
    );
  };

  const getAmountColor = () => {
    if (amountColor) return amountColor;
    if (amount == null) return neutral;
    if (amount > 0) return defaultPositive;
    if (amount < 0) return defaultNegative;
    return neutral;
  };

  const formatAmount = () => {
    if (amount == null) return null;
    const sign = amount > 0 ? "+" : amount < 0 ? "-" : "";
    const abs = Math.abs(amount).toFixed(2);
    return (
      <Text
        className="text-xl font-semibold"
        style={{ letterSpacing: -0.6, color: getAmountColor() }}
      >
        {sign}
        {symbol}
        {abs}
      </Text>
    );
  };

  return (
    <Pressable
      className={`flex-row items-center gap-3 rounded-3xl p-5 bg-white mb-3 border border-[#E0E0E0] ${
        className || ""
      }`}
      onPress={onPress}
    >
      {renderLeft()}

      <View className="flex-1 min-w-0">
        {title ? (
          <Text
            className="text-lg font-medium text-[#262626] mb-0.5"
            style={{ letterSpacing: -0.35 }}
          >
            {title}
          </Text>
        ) : null}

        <View className="flex-row items-center gap-2">
          <View className="flex-1 min-w-0">
            {subtitle ? (
              <Text
                className="text-sm text-[#94918A]"
                style={{ letterSpacing: -0.15 }}
              >
                {subtitle}
              </Text>
            ) : null}

            {variant === "group" && members ? (
              <View className="flex-row items-center mt-2">
                <View className="flex-row items-center">
                  {members.slice(0, 3).map((m, idx) => (
                    <View
                      key={m}
                      className="w-5 h-5 rounded-full bg-[#18273C] justify-center items-center border border-[#F7F6F1]"
                      style={{ marginLeft: idx > 0 ? -8 : 0 }}
                    >
                      <Text className="text-xs font-bold text-[#F4F5F8]">
                        {m.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  ))}
                </View>
                {typeof expensesCount === "number" ? (
                  <Text
                    className="text-sm text-[#9A9A98] ml-3"
                    style={{ letterSpacing: -0.1 }}
                  >
                    {expensesCount} expenses
                  </Text>
                ) : null}
              </View>
            ) : null}
          </View>
        </View>
      </View>

      <View className="shrink-0 w-[104px] items-end">
        {topRightLabel ? (
          <Text
            className="text-md font-semibold uppercase mb-0.5 text-[#B1B0AB]"
            style={{ letterSpacing: 0.5 }}
          >
            {topRightLabel}
          </Text>
        ) : null}

        {formatAmount()}
      </View>
    </Pressable>
  );
}
