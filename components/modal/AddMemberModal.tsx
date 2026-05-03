import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
}

interface AddMemberModalProps {
  visible: boolean;
  onClose: () => void;
  onAddMember: (user: User) => void;
  availableUsers: User[];
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const AVAILABLE_USERS: User[] = [
  {
    id: "1",
    name: "Amélie",
    email: "amelie@example.com",
    avatar: "AM",
    color: "#2563EB",
  },
  {
    id: "2",
    name: "Rohan",
    email: "rohan@example.com",
    avatar: "RO",
    color: "#15803D",
  },
  {
    id: "3",
    name: "Sofia",
    email: "sofia@example.com",
    avatar: "SO",
    color: "#D9482A",
  },
  {
    id: "4",
    name: "Maya",
    email: "maya@example.com",
    avatar: "MY",
    color: "#8B5CF6",
  },
  {
    id: "5",
    name: "Noah",
    email: "noah@example.com",
    avatar: "NO",
    color: "#F59E0B",
  },
];

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  visible,
  onClose,
  onAddMember,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState<"invite" | "search">("invite");
  const { height } = useWindowDimensions();
  const modalHeight = Math.min(height * 0.72, 520);

  const filteredUsers = AVAILABLE_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddMember = (user: User) => {
    onAddMember(user);
    setSearchQuery("");
  };

  const handleInviteByEmail = () => {
    if (isValidEmail(email)) {
      const newUser: User = {
        id: `email-${Date.now()}`,
        name: email.split("@")[0],
        email,
        avatar: email.substring(0, 2).toUpperCase(),
        color: "#9CA3AF",
      };
      onAddMember(newUser);
      setEmail("");
    }
  };

  const emailIsValid = isValidEmail(email);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-transparent">
        <View
          className="rounded-t-3xl bg-white"
          style={{ height: modalHeight, backgroundColor: "#E8E4DC" }}
        >
          <View className="flex-row items-center justify-between p-6">
            <Text className="text-2xl font-bold text-[#1B1B1B]">
              Add Members
            </Text>
            <Pressable
              onPress={onClose}
              className="h-10 w-10 items-center justify-center"
            >
              <Feather name="x" size={20} color="#1B1B1B" />
            </Pressable>
          </View>

          <View className="flex-row gap-2 px-5 pb-4">
            <TouchableOpacity
              onPress={() => setActiveTab("invite")}
              className={`flex-1 rounded-2xl p-4 ${
                activeTab === "invite" ? "bg-[#1B1B1B]" : "bg-[#F3F0E9]"
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  activeTab === "invite" ? "text-white" : "text-[#7A7670]"
                }`}
              >
                Invite by email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("search")}
              className={`flex-1 rounded-2xl p-4 ${
                activeTab === "search" ? "bg-[#1B1B1B]" : "bg-[#F3F0E9]"
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  activeTab === "search" ? "text-white" : "text-[#7A7670]"
                }`}
              >
                Search
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === "invite" ? (
            <View className="flex-1 px-5 pb-5">
              <View className="gap-3">
                <View className="flex-row items-center rounded-xl border border-[#ECE8DF] bg-white px-4 py-3">
                  <Feather name="mail" size={18} color="#9E9A93" />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter email address"
                    placeholderTextColor="#9E9A93"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="ml-3 flex-1 text-lg text-[#1B1B1B]"
                  />
                </View>
                {email.length > 0 && !emailIsValid ? (
                  <Text className="text-sm text-[#D9482A]">
                    Please enter a valid email address.
                  </Text>
                ) : null}
              </View>

              <View className="mt-auto pt-4">
                <TouchableOpacity
                  onPress={handleInviteByEmail}
                  disabled={!emailIsValid}
                  className="rounded-2xl p-5"
                  style={{
                    backgroundColor: emailIsValid ? "#101013" : "#EFEDE7",
                  }}
                >
                  <Text
                    className="text-center text-lg font-semibold"
                    style={{ color: emailIsValid ? "#FFFFFF" : "#B8B4AC" }}
                  >
                    Send Invite
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View className="flex-1 px-5 pb-5">
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search friends"
                placeholderTextColor="#9E9A93"
                className="mb-4 rounded-xl border border-[#ECE8DF] bg-white p-4 text-lg text-[#1B1B1B]"
              />
              <FlatList
                className="flex-1"
                scrollEnabled
                data={filteredUsers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleAddMember(item)}
                    className="mb-3 flex-row items-center justify-between rounded-2xl border border-[#ECE8DF] bg-white p-4"
                  >
                    <View className="flex-row items-center gap-3">
                      <View
                        className="h-10 w-10 items-center justify-center rounded-full"
                        style={{ backgroundColor: item.color }}
                      >
                        <Text className="text-xs font-bold text-white">
                          {item.avatar}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-lg font-semibold text-[#1B1B1B]">
                          {item.name}
                        </Text>
                        <Text className="text-sm text-[#7A7670]">
                          {item.email}
                        </Text>
                      </View>
                    </View>
                    <View className="h-6 w-6 rounded-md border-2 border-[#ECE8DF] bg-white" />
                  </Pressable>
                )}
                nestedScrollEnabled
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
