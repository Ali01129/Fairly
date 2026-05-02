import React from "react";
import { Pressable, Text } from "react-native";

interface SettleUpConfirmButtonProps {
  amount: number;
  symbol: string;
  onPress?: () => void;
}

export const SettleUpConfirmButton: React.FC<SettleUpConfirmButtonProps> = ({
  amount,
  symbol,
  onPress,
}) => {
  return (
    <Pressable
      className="items-center justify-center rounded-full bg-[#101013] py-6"
      onPress={onPress}
    >
      <Text className="text-xl font-semibold text-white">
        Confirm payment · {symbol}
        {Math.abs(amount).toFixed(2)}
      </Text>
    </Pressable>
  );
};
