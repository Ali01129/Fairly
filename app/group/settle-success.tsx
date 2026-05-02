import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeColor } from "@/hooks/use-theme-color";

export default function SettleSuccessScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const router = useRouter();
  const { groupId, amount, symbol, toName } = useLocalSearchParams<{
    groupId?: string;
    amount?: string;
    symbol?: string;
    toName?: string;
  }>();

  const paidText = useMemo(() => {
    const safeAmount =
      typeof amount === "string" && amount.trim().length > 0 ? amount : "0.00";
    const safeSymbol = typeof symbol === "string" ? symbol : "€";
    const safeName =
      typeof toName === "string" && toName.trim().length > 0
        ? toName
        : "friend";

    return `Marked ${safeSymbol}${safeAmount} as paid to ${safeName}.`;
  }, [amount, symbol, toName]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <View className="flex-1 items-center justify-center px-8">
        <View className="h-28 w-28 items-center justify-center rounded-full bg-[#EAF9F0]">
          <Feather name="check" size={42} color="#17A363" />
        </View>

        <Text className="mt-7 text-center text-[42px] font-black leading-[46px] text-[#121212]">
          All settled!
        </Text>

        <Text className="mt-3 text-center text-[18px] text-[#8E8A83]">
          {paidText}
        </Text>

        <Pressable
          className="mt-14 min-w-[220px] items-center justify-center rounded-full bg-[#101013] px-8 py-6"
          onPress={() => {
            if (typeof groupId === "string" && groupId.length > 0) {
              router.replace({
                pathname: "/group/[groupId]",
                params: { groupId },
              });
              return;
            }

            router.replace("/(tabs)");
          }}
        >
          <Text className="text-lg font-semibold text-white">
            Back to group
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
