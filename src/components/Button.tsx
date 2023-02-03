import React from "react";
import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

export function Button({ ...rest }: IButtonProps) {
  return (
    <NativeBaseButton
      size={50}
      bgColor="#fff"
      borderRadius={60}
      borderColor="#C0C0C0"
      borderWidth={1}
      {...rest}
    >
      <Text>+</Text>
    </NativeBaseButton>
  );
}
