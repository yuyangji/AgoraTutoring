import React, { FC } from "react";

import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { MyTheme } from "../../Styles/useGlobalStyles";

type ButtonType = "primary" | "secondary";

interface CTAButtonProps {
  title: string;
  variant: ButtonType;
  onPress: () => void;

}

export const CTAButton: FC<CTAButtonProps> = ({ title, onPress, variant }) => {
  const containerStyle =
    variant === "primary" ? styles.containerPrimary : styles.containerSecondary;

  const textStyle =
    variant === "primary" ? styles.textPrimary : styles.textSecondary;

  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerPrimary: {
    height: 51,
    width: 280,
    backgroundColor: MyTheme.colors.primary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  containerSecondary: {
    height: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  textPrimary: {

    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  textSecondary: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
});