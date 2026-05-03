import { Feather } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useMemo, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    AddMemberModal,
    NewGroupColorPicker,
    NewGroupHeader,
    NewGroupIconCard,
    NewGroupMembersSection,
    NewGroupTypePicker,
} from "@/components/newgroup";
import { GROUP_COLORS, GROUP_TYPES } from "@/constants/types";
import { useThemeColor } from "@/hooks/use-theme-color";

interface GroupMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
}

export default function NewGroupScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const router = useRouter();
  const navigation = useNavigation();

  // Hide the default header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Form state
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(GROUP_COLORS[0]);
  const [selectedType, setSelectedType] = useState("trip");
  const [selectedIcon, setSelectedIcon] = useState(
    GROUP_TYPES.find((t) => t.id === "trip")?.icon || "image",
  );
  const [members, setMembers] = useState<GroupMember[]>([
    {
      id: "you",
      name: "You",
      email: "you@example.com",
      avatar: "YO",
      color: "#111111",
    },
  ]);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(["you"]);

  // Modal state
  const [isAddMemberModalVisible, setIsAddMemberModalVisible] = useState(false);

  // Validation
  const isCreateEnabled = useMemo(() => {
    return groupName.trim().length > 0 && members.length > 0;
  }, [groupName, members]);

  // Handle icon selection based on group type
  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    const selectedTypeObj = GROUP_TYPES.find((type) => type.id === typeId);
    if (selectedTypeObj) {
      setSelectedIcon(selectedTypeObj.icon);
    }
  };

  const handleAddMember = (newMember: GroupMember) => {
    const memberExists = members.some((m) => m.email === newMember.email);
    if (!memberExists) {
      setMembers([...members, newMember]);
      setSelectedMemberIds((current) => [...current, newMember.id]);
    }
    setIsAddMemberModalVisible(false);
  };

  const handleToggleMemberSelection = (memberId: string) => {
    if (memberId === "you") {
      return;
    }

    setSelectedMemberIds((current) =>
      current.includes(memberId)
        ? current.filter((id) => id !== memberId)
        : [...current, memberId],
    );
  };

  const handleCreate = () => {
    if (isCreateEnabled) {
      // TODO: Create group with the form data
      console.log({
        groupName,
        selectedColor,
        selectedType,
        selectedIcon,
        members: members.filter((member) =>
          selectedMemberIds.includes(member.id),
        ),
      });
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      style={{ backgroundColor }}
    >
      <SafeAreaView className="flex-1 p-5" style={{ backgroundColor }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Header */}
          <NewGroupHeader
            onClose={() => router.back()}
            onCreate={handleCreate}
            isCreateEnabled={isCreateEnabled}
          />

          {/* Icon and Name */}
          <NewGroupIconCard
            groupName={groupName}
            onChangeGroupName={setGroupName}
            selectedColor={selectedColor}
            selectedIcon={selectedIcon}
            onOpenIconSelect={() => {}} // Icon is selected through type picker
          />

          {/* Color Picker */}
          <NewGroupColorPicker
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />

          {/* Type Picker */}
          <NewGroupTypePicker
            selectedType={selectedType}
            onSelectType={handleTypeSelect}
          />

          {/* Members Section */}
          <NewGroupMembersSection
            memberCount={selectedMemberIds.length}
            onAddMember={() => setIsAddMemberModalVisible(true)}
          />

          {/* Members List */}
          <View className="mt-3">
            {members.map((member) => (
              <View
                key={member.id}
                className="mb-3 flex-row items-center justify-between rounded-2xl border border-[#ECE8DF] bg-white p-5"
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className="h-14 w-14 items-center justify-center rounded-full"
                    style={{ backgroundColor: member.color }}
                  >
                    <Text className="text-lg font-bold text-white">
                      {member.avatar}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-2xl font-semibold text-[#1B1B1B]">
                      {member.name}
                    </Text>
                    {member.id !== "you" && (
                      <Text className="text-sm text-[#7A7670]">
                        {member.email}
                      </Text>
                    )}
                  </View>
                </View>
                <Pressable
                  onPress={() => handleToggleMemberSelection(member.id)}
                  className="h-6 w-6 items-center justify-center rounded-md"
                  style={{
                    backgroundColor: selectedMemberIds.includes(member.id)
                      ? "#2D5BFF"
                      : "#E8E5DE",
                  }}
                >
                  {selectedMemberIds.includes(member.id) ? (
                    <Feather name="check" size={14} color="#FFFFFF" />
                  ) : null}
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Add Member Modal */}
        <AddMemberModal
          visible={isAddMemberModalVisible}
          onClose={() => setIsAddMemberModalVisible(false)}
          onAddMember={handleAddMember}
          availableUsers={[]}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
