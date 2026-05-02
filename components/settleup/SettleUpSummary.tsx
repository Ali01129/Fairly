import React from "react";
import { Text, View } from "react-native";

interface SettleUpSummaryProps {
  amount: number;
  symbol: string;
  toName: string;
  method: string;
  groupName: string;
}

function formatAmount(amount: number, symbol: string) {
  return `${symbol}${Math.abs(amount).toFixed(2)}`;
}

const SummaryRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <View className="flex-row items-center justify-between py-2">
      <Text className="text-xl text-[#9A968E]">{label}</Text>
      <Text className="text-xl font-semibold text-[#1F1F1F]">{value}</Text>
    </View>
  );
};

export const SettleUpSummary: React.FC<SettleUpSummaryProps> = ({
  amount,
  symbol,
  toName,
  method,
  groupName,
}) => {
  return (
    <View className="rounded-3xl border border-[#E8E5DE] bg-white p-6">
      <SummaryRow label="You'll pay" value={formatAmount(amount, symbol)} />
      <SummaryRow label="To" value={toName} />
      <SummaryRow label="Method" value={method} />
      <SummaryRow label="Group" value={groupName} />
    </View>
  );
};
