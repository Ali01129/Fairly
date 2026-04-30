import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

interface GroupTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = ["All groups", "Trips", "Roommates", "Friends", "Settled"];

export const GroupTabs: React.FC<GroupTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {TABS.map((tab) => (
        <Pressable
          key={tab}
          onPress={() => onTabChange(tab)}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 4,
  },
  content: {
    gap: 7,
    paddingRight: 16,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#f4f3ef",
  },
  activeTab: {
    backgroundColor: "#101013",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#3D3D3D",
    letterSpacing: -0.3,
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
