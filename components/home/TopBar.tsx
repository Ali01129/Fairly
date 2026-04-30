import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TopBarProps {
  onSearch?: () => void;
  onNotifications?: () => void;
  hasNotifications?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  onSearch,
  onNotifications,
  hasNotifications = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.logoBg}>
          <Text style={styles.logoText}>F</Text>
        </View>
        <Text style={styles.brandName}>Fairly</Text>
      </View>

      <View style={styles.iconsContainer}>
        <Pressable
          style={[styles.iconButton, styles.notificationButton]}
          onPress={onNotifications}
        >
          <Ionicons name="notifications-outline" size={26} color="#2B2B2B" />
          {hasNotifications && <View style={styles.notificationDot} />}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FAFAF7",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#0D0D0D",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontWeight: "700",
    fontSize: 24,
    color: "#FFF",
  },
  brandName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E1E1E",
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationButton: {
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 5,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D76C56",
    borderWidth: 1,
    borderColor: "#FAFAF7",
  },
});
