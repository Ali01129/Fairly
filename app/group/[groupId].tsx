import { ActivityRow, ActivitySectionLabel } from "@/components/activity";
import {
    GroupActionButtons,
    GroupBalancesList,
    GroupHeader,
    GroupMembersList,
    GroupSummaryCard,
} from "@/components/group";
import { SectionLabel } from "@/components/home";
import {
    getExpensesForGroup,
    getGroupById,
    getGroupSummaryById,
} from "@/constants/mockData";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GroupScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const router = useRouter();
  const { groupId } = useLocalSearchParams<{ groupId?: string }>();

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

  const expenses = useMemo(() => {
    if (!group) {
      return [];
    }

    return getExpensesForGroup(group.name);
  }, [group]);

  if (!group || !summary) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor }}>
        <View className="flex-1 items-center justify-center px-5" />
      </SafeAreaView>
    );
  }

  const netBalance = summary.netBalance;
  const owedLabel =
    netBalance < 0 ? "YOU OWE IN THIS GROUP" : "THEY OWE YOU IN THIS GROUP";

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <View className="flex-1 px-5 pt-2">
        <GroupHeader
          groupName={group.name}
          memberCount={group.members.length}
          onBack={() => router.back()}
        />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 96 }}
        >
          <GroupSummaryCard
            emoji={group.emoji}
            color={group.color}
            owedLabel={owedLabel}
            netBalance={netBalance}
            symbol="€"
            totalSpent={summary.totalSpent}
          />

          <GroupActionButtons
            onAddExpense={() => {}}
            onSettleUp={() =>
              router.push({
                pathname: "/group/settle-up",
                params: { groupId: group.id },
              })
            }
          />

          <SectionLabel title="BALANCES" subtitle="Simplified" />
          <GroupBalancesList balances={summary.balances} />

          <SectionLabel title="MEMBERS" />
          <GroupMembersList members={summary.members} />

          <SectionLabel title="EXPENSES" />
          <View>
            {expenses.map((section) => (
              <View key={section.label} className="mb-5">
                <ActivitySectionLabel label={section.label} />
                {section.items.map((item) => (
                  <ActivityRow key={item.id} item={item} />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
