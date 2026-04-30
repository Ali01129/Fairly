import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface NewGroupCardProps {
  onPress: () => void;
}

export const NewGroupCard: React.FC<NewGroupCardProps> = ({ onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.plusBox}>
        <Text style={styles.plusIcon}>+</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Start a new group</Text>
        <Text style={styles.subtitle}>Trip, household, or whatever</Text>
      </View>

      <Text style={styles.arrow}>→</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#DEDCD4",
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 10,
    backgroundColor: "#FCFBF8",
  },
  plusBox: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: "#F4F1EA",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  plusIcon: {
    fontSize: 25,
    fontWeight: "300",
    color: "#929089",
  },
  content: {
    flex: 1,
    textAlign: "left",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#4A4A48",
    marginBottom: 1,
    letterSpacing: -0.45,
  },
  subtitle: {
    fontSize: 14,
    color: "#B2B0A8",
    letterSpacing: -0.3,
  },
  arrow: {
    fontSize: 27,
    color: "#8D8B85",
    fontWeight: "300",
  },
});
