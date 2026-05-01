import { Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

const typeClassNames: Record<string, string> = {
  default: "text-base leading-6",
  defaultSemiBold: "text-base leading-6 font-semibold",
  title: "text-3xl font-bold leading-8",
  subtitle: "text-xl font-bold",
  link: "text-base leading-7.5 text-[#0a7ea4]",
};

export function ThemedText({
  className,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const baseClassName = typeClassNames[type] || "";
  const combinedClassName = [baseClassName, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Text
      className={combinedClassName}
      style={[{ color }, rest.style]}
      {...rest}
    />
  );
}
