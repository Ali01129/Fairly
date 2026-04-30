import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface SectionLabelProps {
  title: string;
  subtitle?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  title,
  subtitle,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    marginTop: 4,
  },
  title: {
    fontSize: 11,
    fontWeight: "600",
    color: "#B1B0AB",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 12,
    color: "#7C7B78",
    fontWeight: "400",
    letterSpacing: 0,
  },
});
