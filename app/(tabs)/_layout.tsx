import { useThemeColor } from "@/hooks/use-theme-color";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import React from "react";

export default function TabLayout() {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <NativeTabs
      backgroundColor={backgroundColor}
      disableTransparentOnScrollEdge
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon src={<VectorIcon family={Octicons} name="home" />} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="setting">
        <Label>Setting</Label>
        <Icon src={<VectorIcon family={MaterialCommunityIcons} name="cog" />} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
