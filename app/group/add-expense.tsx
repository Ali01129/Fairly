import {
    AddExpenseAmountSection,
    AddExpenseDetailsCard,
    AddExpenseHeader,
    AddExpenseSplitPreview,
} from "@/components/add-expense";
import { SectionLabel } from "@/components/home";
import { CategoryModal, MemberModal, SplitModal } from "@/components/modal";
import { getGroupSummaryById } from "@/constants/mockData";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function formatAmountInput(value: string) {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");

  if (parts.length === 1) {
    return parts[0];
  }

  const integer = parts[0];
  const decimal = parts.slice(1).join("").slice(0, 2);
  return `${integer}.${decimal}`;
}

export default function AddExpenseScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const { groupId } = useLocalSearchParams<{ groupId?: string }>();
  const CATEGORY_ICON_MAP: Record<string, keyof typeof Feather.glyphMap> = {
    "Food & drink": "coffee",
    Stay: "home",
    Transport: "truck",
    Fun: "smile",
    Groceries: "shopping-bag",
    Utilities: "zap",
    Other: "more-horizontal",
  };

  const summary = useMemo(() => {
    if (typeof groupId !== "string") {
      return undefined;
    }

    return getGroupSummaryById(groupId);
  }, [groupId]);

  const members = summary?.members ?? [];
  const [expenseName, setExpenseName] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Stay");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(
    members.map((member) => member.id),
  );
  const [selectedPayerId, setSelectedPayerId] = useState<string | undefined>(
    members[0]?.id,
  );
  const [showPaidByModal, setShowPaidByModal] = useState(false);
  const [selectedSplit, setSelectedSplit] = useState<string>("Equally");
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [memberAmounts, setMemberAmounts] = useState<Record<string, string>>(
    {},
  );
  const [memberPercentages, setMemberPercentages] = useState<
    Record<string, string>
  >({});
  const [memberShares, setMemberShares] = useState<Record<string, number>>({});

  const parsedAmount = Number(amountInput || "0");
  const selectedCount = selectedMemberIds.length;
  const splitAmount =
    selectedCount > 0 && parsedAmount > 0 ? parsedAmount / selectedCount : 0;

  const amountValues = members.map((member) => {
    const value = Number(memberAmounts[member.id] || "0");
    return Number.isFinite(value) ? value : 0;
  });
  const totalEnteredAmount = amountValues.reduce(
    (sum, value) => sum + value,
    0,
  );
  const amountsMatchTotal =
    selectedSplit !== "By amounts" ||
    (parsedAmount > 0 && Math.abs(totalEnteredAmount - parsedAmount) < 0.01);

  const percentValues = members.map((member) => {
    const value = Number(memberPercentages[member.id] || "0");
    return Number.isFinite(value) ? value : 0;
  });
  const totalPercentages = percentValues.reduce((sum, value) => sum + value, 0);
  const percentagesMatch =
    selectedSplit !== "By percent" || Math.abs(totalPercentages - 100) < 0.01;

  const shareValues = members.map((member) => memberShares[member.id] ?? 1);
  const totalShares = shareValues.reduce((sum, value) => sum + value, 0);
  const sharesMatch = selectedSplit !== "By shares" || totalShares > 0;

  const isFormValid =
    expenseName.trim().length > 0 &&
    parsedAmount > 0 &&
    amountsMatchTotal &&
    percentagesMatch &&
    sharesMatch;
  const selectedPayer = members.find((member) => member.id === selectedPayerId);
  const selectedCategoryIcon = CATEGORY_ICON_MAP[selectedCategory] ?? "tag";

  const toggleMember = (memberId: string) => {
    setSelectedMemberIds((prev) => {
      if (prev.includes(memberId)) {
        if (prev.length === 1) {
          return prev;
        }

        return prev.filter((id) => id !== memberId);
      }

      return [...prev, memberId];
    });
  };

  if (!summary) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor }}>
        <View className="flex-1 items-center justify-center px-5" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 8,
            paddingBottom: 140,
            flexGrow: 1,
          }}
        >
          <AddExpenseHeader
            onClose={() => router.back()}
            onSave={() => router.back()}
            isSaveEnabled={isFormValid}
          />

          <View className="flex-1">
            <AddExpenseAmountSection
              amountInput={amountInput}
              onChangeAmount={(value) =>
                setAmountInput(formatAmountInput(value))
              }
            />

            <AddExpenseDetailsCard
              selectedCategory={selectedCategory}
              selectedCategoryIcon={selectedCategoryIcon}
              expenseName={expenseName}
              onChangeExpenseName={setExpenseName}
              selectedPayer={selectedPayer}
              onOpenCategory={() => setShowCategoryModal(true)}
              onOpenPaidBy={() => setShowPaidByModal(true)}
              selectedSplit={selectedSplit}
              onOpenSplit={() => setShowSplitModal(true)}
            />

            <SectionLabel title="SPLIT PREVIEW" />

            <AddExpenseSplitPreview
              members={members}
              selectedSplit={selectedSplit}
              selectedMemberIds={selectedMemberIds}
              splitAmount={splitAmount}
              memberAmounts={memberAmounts}
              onToggleMember={toggleMember}
              onChangeMemberAmount={(memberId, value) =>
                setMemberAmounts((prev) => ({
                  ...prev,
                  [memberId]: formatAmountInput(value),
                }))
              }
              onFocusAmount={() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }}
              parsedAmount={parsedAmount}
              memberPercentages={memberPercentages}
              onChangeMemberPercentage={(memberId, value) => {
                const numValue = Number(value);
                // Allow 0 to 100
                if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                  setMemberPercentages((prev) => ({
                    ...prev,
                    [memberId]: value,
                  }));
                }
              }}
              memberShares={memberShares}
              onChangeMemberShare={(memberId, delta) => {
                setMemberShares((prev) => {
                  const current = prev[memberId] ?? 1;
                  const next = Math.max(0, current + delta);
                  return {
                    ...prev,
                    [memberId]: next,
                  };
                });
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CategoryModal
        visible={showCategoryModal}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onClose={() => setShowCategoryModal(false)}
      />
      <MemberModal
        visible={showPaidByModal}
        members={members}
        selectedMemberId={selectedPayerId}
        onSelectMember={(id: string) => setSelectedPayerId(id)}
        onClose={() => setShowPaidByModal(false)}
      />
      <SplitModal
        visible={showSplitModal}
        selected={selectedSplit}
        onSelect={(v: string) => setSelectedSplit(v)}
        onClose={() => setShowSplitModal(false)}
      />
    </SafeAreaView>
  );
}
