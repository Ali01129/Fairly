import { Text, TextInput, View } from "react-native";

type AddExpenseAmountSectionProps = {
  amountInput: string;
  onChangeAmount: (value: string) => void;
};

export function AddExpenseAmountSection({
  amountInput,
  onChangeAmount,
}: AddExpenseAmountSectionProps) {
  return (
    <View className="items-center pt-6">
      <Text
        className="text-sm font-semibold uppercase text-[#B1B0AB]"
        style={{ letterSpacing: 1 }}
      >
        Amount
      </Text>

      <View className="mt-3 flex-row items-center">
        <Text
          className="text-6xl font-black text-[#B7B4AF]"
          style={{ lineHeight: 66 }}
        >
          €
        </Text>
        <TextInput
          className="ml-2 min-w-[130px] text-6xl font-black text-[#76736E]"
          style={{ letterSpacing: -1.2, lineHeight: 66 }}
          keyboardType="decimal-pad"
          value={amountInput}
          onChangeText={onChangeAmount}
          placeholder="0.00"
          placeholderTextColor="#C7C4BE"
          textAlign="left"
        />
      </View>
    </View>
  );
}
