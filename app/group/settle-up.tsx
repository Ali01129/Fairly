import { SectionLabel } from "@/components/home";
import {
    PaymentMethod,
    SettleUpBalanceCard,
    SettleUpConfirmButton,
    SettleUpHeader,
    SettleUpPaymentMethods,
    SettleUpSummary,
} from "@/components/settleup";
import { getGroupById, getGroupSummaryById } from "@/constants/mockData";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettleUpScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const router = useRouter();
  const { groupId } = useLocalSearchParams<{ groupId?: string }>();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("Cash");

  const group = useMemo(() => {
    if (typeof groupId !== "string") {
      return undefined;
    }

    return getGroupById(groupId);
  }, [groupId]);

  const summary = useMemo(() => {
    if (typeof groupId !== "string") {
      return undefined;
    }

    return getGroupSummaryById(groupId);
  }, [groupId]);

  const selectedBalance = useMemo(() => {
    if (!summary) {
      return undefined;
    }

    return (
      summary.balances.find((balance) => balance.amount < 0) ??
      summary.balances[0]
    );
  }, [summary]);

  if (!group || !summary || !selectedBalance) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor }}>
        <View className="flex-1 items-center justify-center px-5" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <View className="flex-1 px-5 pt-2">
        <SettleUpHeader onBack={() => router.back()} />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
        >
          <SectionLabel title="CHOOSE A BALANCE" />
          <SettleUpBalanceCard balance={selectedBalance} />

          <SectionLabel title="HOW ARE YOU PAYING" />
          <SettleUpPaymentMethods
            selectedMethod={selectedMethod}
            onSelectMethod={setSelectedMethod}
          />

          <SectionLabel title="SUMMARY" />
          <SettleUpSummary
            amount={selectedBalance.amount}
            symbol={selectedBalance.symbol}
            toName={selectedBalance.name}
            method={selectedMethod}
            groupName={group.name}
          />
        </ScrollView>

        <View className="pb-5">
          <SettleUpConfirmButton
            amount={selectedBalance.amount}
            symbol={selectedBalance.symbol}
            onPress={() =>
              router.push({
                pathname: "/group/settle-success" as never,
                params: {
                  groupId: group.id,
                  amount: Math.abs(selectedBalance.amount).toFixed(2),
                  symbol: selectedBalance.symbol,
                  toName: selectedBalance.name,
                },
              })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
