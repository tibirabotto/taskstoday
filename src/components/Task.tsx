import React from "react";
import { VStack, Text, ITextProps, HStack, Button } from "native-base";

type Props = ITextProps & {
  name: string;
};

export function Task({ name, ...rest }: Props) {
  return (
    <HStack
      bg="#FFF"
      p={2}
      borderRadius={8}
      alignItems="center"
      mb={4}
      {...rest}
    >
      <Button size={5} bg="#55BCF6" opacity={0.4} borderRadius={3} mr={2} />
      <Text>{name}</Text>
      <HStack flex={1} justifyContent="flex-end">
        <Button
            size={3}
            borderColor="#55BCF5"
            borderWidth={2}
            borderRadius={8}
            bg="#fff"
            opacity={0.4}
        />
      </HStack>
    </HStack>
  );
}
