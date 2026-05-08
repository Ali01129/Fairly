import CardRow from "@/components/common/CardRow";
import { TabsComponent } from "@/components/common/Tabs";
import {
  Group,
  GROUP_BALANCES,
  GroupWithBalance,
  MOCK_GROUPS,
} from "@/constants/mockData";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  HeroBalanceCard,
  NewGroupCard,
  SectionLabel,
  TopBar,
} from "../../components/home";

export default function HomeScreen() {
  const [groups, setGroups] = useState<Group[]>(MOCK_GROUPS);
  const [activeTab, setActiveTab] = useState("All groups");
  const currencySymbol = "€";
  const backgroundColor = useThemeColor({}, "background");
  const router = useRouter();

  // Calculate balances - mock data
  const groupsWithBalance: GroupWithBalance[] = groups.map((group) => {
    const myNet = GROUP_BALANCES[groups.indexOf(group)] || 0;
    return { group, myNet };
  });

  const totalOwed = groupsWithBalance.reduce((sum, { myNet }) => {
    if (myNet > 0) return sum + myNet;
    return sum;
  }, 0);

  const totalOwe = groupsWithBalance.reduce((sum, { myNet }) => {
    if (myNet < 0) return sum + Math.abs(myNet);
    return sum;
  }, 0);

  const overallNet = totalOwed - totalOwe;

  // Filter groups by category
  const filteredGroups = useMemo(() => {
    if (activeTab === "All groups") {
      return groupsWithBalance;
    }
    return groupsWithBalance.filter(
      (item) => item.group.category === activeTab,
    );
  }, [activeTab, groupsWithBalance]);
  const handleOpenGroup = (groupId: string) => {
    router.push({ pathname: "/group/[groupId]", params: { groupId } });
  };

  const handleNewGroup = () => {
    router.push("/group/new-group");
  };

  const handleSearch = () => {
    Alert.alert("Search", "Search functionality");
  };

  const handleNotifications = () => {
    Alert.alert("Notifications", "View notifications");
  };

  return (
    <SafeAreaView className="flex-1 p-5" style={{ backgroundColor }}>
      <View className="flex-1" style={{ backgroundColor }}>
        {/* Top Bar */}
        <TopBar
          onSearch={handleSearch}
          onNotifications={handleNotifications}
          hasNotifications={false}
        />

        {/* Scrollable Content */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingBottom: 96,
            paddingTop: 4,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Balance Card */}
          <HeroBalanceCard
            overallNet={overallNet}
            groupsCount={groups.length}
            symbol={currencySymbol}
            totalOwed={totalOwed}
            totalOwe={totalOwe}
          />

          {/* Group Tabs Filter */}
          <TabsComponent
            tabs={["All groups", "Trips", "Roommates", "Friends", "Couples"]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Groups Section */}
          <SectionLabel
            title={`Your groups - ${filteredGroups.length}`}
            subtitle="Sort: Recent"
          />

          {/* Group Cards */}
          <View>
            {filteredGroups.map(({ group, myNet }) => (
              <CardRow
                key={group.id}
                left={{
                  icon: group.icon as any,
                  backgroundColor: group.color,
                }}
                title={group.name}
                subtitle={`${group.category} • ${group.members.length} members`}
                members={group.members}
                expensesCount={group.expensesCount}
                amount={myNet}
                symbol={currencySymbol}
                onPress={() => handleOpenGroup(group.id)}
              />
            ))}
          </View>

          {/* New Group Card */}
          <NewGroupCard onPress={handleNewGroup} />

          {/* Bottom Spacing */}
          <View style={{ height: 96 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
