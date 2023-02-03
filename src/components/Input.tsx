import React from "react";
import { Input as NativeBaseInput, IInputProps } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      w="50%"
      placeholder="Write a task"
      bgColor="#fff"
      borderRadius={16}
      borderColor="#C0C0C0"
      borderWidth={1}
      {...rest}
    />
  );
}
