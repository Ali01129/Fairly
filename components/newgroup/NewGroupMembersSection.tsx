import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { SectionLabel } from "../home/SectionLabel";

type NewGroupMembersSectionProps = {
  memberCount: number;
  onAddMember: () => void;
};

export function NewGroupMembersSection({
  memberCount,
  onAddMember,
}: NewGroupMembersSectionProps) {
  return (
    <View className="mt-6">
      <View className="flex-row items-center justify-between">
        <SectionLabel title="MEMBERS" />
        <Pressable
          onPress={onAddMember}
          className="flex-row items-center gap-1 rounded-xl p-3"
          style={{ backgroundColor: "#EFEDE7" }}
        >
          <Feather name="plus" size={18} color="#000000" />
          <Text className="text-md font-semibold text-black">Add by email</Text>
        </Pressable>
      </View>
    </View>
  );
}
