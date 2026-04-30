import { useThemeColor } from "@/hooks/use-theme-color";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GroupCard,
  GroupTabs,
  HeroBalanceCard,
  NewGroupCard,
  SectionLabel,
  TopBar,
} from "../../components/home";

// Mock data types
interface Group {
  id: string;
  name: string;
  emoji: string;
  color: string;
  members: string[];
  expensesCount: number;
}

interface GroupWithBalance {
  group: Group;
  myNet: number;
}

// Mock data
const MOCK_GROUPS: Group[] = [
  {
    id: "1",
    name: "Lisbon, May '26",
    emoji: "🇵🇹",
    color: "#FF6B9D",
    members: ["user1", "user2", "user3"],
    expensesCount: 7,
  },
  {
    id: "2",
    name: "Flat 4B",
    emoji: "🏠",
    color: "#FFD93D",
    members: ["user1", "user4"],
    expensesCount: 4,
  },
  {
    id: "3",
    name: "Climbing crew",
    emoji: "🧗",
    color: "#6BCB77",
    members: ["user1", "user2", "user5"],
    expensesCount: 2,
  },
];

export default function HomeScreen() {
  const [groups, setGroups] = useState<Group[]>(MOCK_GROUPS);
  const [activeTab, setActiveTab] = useState("All groups");
  const currencySymbol = "€";
  const backgroundColor = useThemeColor({}, "background");

  // Calculate balances - mock data
  const groupsWithBalance: GroupWithBalance[] = groups.map((group) => {
    const balances = [-131.02, -11.47, 16.33];
    const myNet = balances[groups.indexOf(group)] || 0;
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

  // Handlers
  const handleOpenGroup = (groupId: string) => {
    Alert.alert("Group", `Opening group: ${groupId}`);
  };

  const handleNewGroup = () => {
    Alert.alert("New Group", "Create a new group");
  };

  const handleSearch = () => {
    Alert.alert("Search", "Search functionality");
  };

  const handleNotifications = () => {
    Alert.alert("Notifications", "View notifications");
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={[styles.container, { backgroundColor }]}>
        {/* Top Bar */}
        <TopBar
          onSearch={handleSearch}
          onNotifications={handleNotifications}
          hasNotifications={false}
        />

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
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
          <GroupTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Groups Section */}
          <SectionLabel
            title={`Your groups - ${groups.length}`}
            subtitle="Sort: Recent"
          />

          {/* Group Cards */}
          <View style={styles.groupsContainer}>
            {groupsWithBalance.map(({ group, myNet }) => (
              <GroupCard
                key={group.id}
                group={group}
                myNet={myNet}
                symbol={currencySymbol}
                onPress={handleOpenGroup}
              />
            ))}
          </View>

          {/* New Group Card */}
          <NewGroupCard onPress={handleNewGroup} />

          {/* Bottom Spacing */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingTop: 4,
  },
  groupsContainer: {},
  bottomPadding: {
    height: 30,
  },
});
