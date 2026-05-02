import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SectionLabel from "@/components/insights/SectionLabel";
import {
  SettingCard,
  SettingsHeader,
  SignOutButton,
  StatsCard,
  UserProfile,
} from "@/components/settings";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function SettingScreen() {
  const backgroundColor = useThemeColor({}, "background");

  const stats = [
    { number: 3, label: "Groups" },
    { number: 5, label: "Expenses" },
    { number: 8, label: "Friends" },
  ];

  const handleSignOut = () => {
    // Handle sign out logic here
    console.log("Sign out pressed");
  };

  const handlePersonalInfo = () => {
    console.log("Personal info pressed");
  };

  const handleNotifications = () => {
    console.log("Notifications pressed");
  };

  const handleDefaultCurrency = () => {
    console.log("Default currency pressed");
  };

  const handleDefaultSplit = () => {
    console.log("Default split pressed");
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <SettingsHeader />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* User Profile Section */}
        <UserProfile
          name="You"
          email="you@paytrack.app"
          initial="Y"
          onEdit={() => console.log("Edit profile")}
        />

        {/* Stats Cards */}
        <StatsCard stats={stats} />

        {/* Account Section */}
        <View className="px-5 mt-6">
          <SectionLabel title="ACCOUNT" />
          <SettingCard
            icon="person"
            title="Personal info"
            subtitle="You"
            onPress={handlePersonalInfo}
          />
          <SettingCard
            icon="notifications"
            title="Notifications"
            subtitle="On"
            onPress={handleNotifications}
          />
        </View>

        {/* Preferences Section */}
        <View className="px-5 mt-2">
          <SectionLabel title="PREFERENCES" />
          <SettingCard
            icon="globe"
            title="Default currency"
            subtitle="€ EUR"
            onPress={handleDefaultCurrency}
          />
          <SettingCard
            icon="git-compare"
            title="Default split"
            subtitle="Equally"
            onPress={handleDefaultSplit}
          />
        </View>

        {/* Sign Out Button */}
        <View className="mt-8">
          <SignOutButton onPress={handleSignOut} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
