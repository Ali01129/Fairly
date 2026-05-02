import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

export type PaymentMethod =
  | "Cash"
  | "Bank transfer"
  | "Mobile pay"
  | "Mark as paid";

interface SettleUpPaymentMethodsProps {
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
}

const METHOD_OPTIONS: {
  label: PaymentMethod;
  icon: keyof typeof Feather.glyphMap;
}[] = [
  { label: "Cash", icon: "credit-card" },
  { label: "Bank transfer", icon: "send" },
  { label: "Mobile pay", icon: "globe" },
  { label: "Mark as paid", icon: "check" },
];

export const SettleUpPaymentMethods: React.FC<SettleUpPaymentMethodsProps> = ({
  selectedMethod,
  onSelectMethod,
}) => {
  return (
    <View className="flex-row flex-wrap justify-between">
      {METHOD_OPTIONS.map((option) => {
        const selected = selectedMethod === option.label;

        return (
          <Pressable
            key={option.label}
            className="mb-3 h-34 w-[48.5%] justify-between rounded-3xl border bg-white p-6"
            style={{
              borderColor: selected ? "#1B1B1B" : "#E5E2DB",
              borderWidth: selected ? 1.5 : 1,
            }}
            onPress={() => onSelectMethod(option.label)}
          >
            <View
              className="h-12 w-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: selected ? "#1B1B1B" : "#F2F1ED" }}
            >
              <Feather
                name={option.icon}
                size={20}
                color={selected ? "#FFFFFF" : "#1B1B1B"}
              />
            </View>
            <Text className="text-xl mt-4 font-medium text-[#1F1F1F]">
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
