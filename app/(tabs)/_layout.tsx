import { useThemeColor } from "@/hooks/use-theme-color";
import {
  Entypo,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
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
      iconColor="#797979"
      tintColor="#000000"
      indicatorColor="#f4f3ef"
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon src={<VectorIcon family={FontAwesome5} name="home" />} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="activity">
        <Label>Activity</Label>
        <Icon src={<VectorIcon family={Feather} name="activity" />} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="insights">
        <Label>Insights</Label>
        <Icon src={<VectorIcon family={Entypo} name="bar-graph" />} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="setting">
        <Label>Setting</Label>
        <Icon src={<VectorIcon family={MaterialIcons} name="person" />} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
