import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeBaseProvider,
  VStack,
  Text,
  KeyboardAvoidingView,
  HStack,
  Input as NativeBaseInput,
  Center,
  Pressable,
} from "native-base";
import { Task } from "./src/components/Task";
import { Keyboard, Platform } from "react-native";
import { Input } from "./src/components/Input";
import { Button } from "./src/components/Button";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  function handleAddTask() {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  function completeTask(index) {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <VStack flex={1} bg="#E8EAED" pt={16} pl={8} pr={8}>
          <Text fontSize={24} fontWeight="bold" mb={4}>
            Today's tasks
          </Text>
          {taskItems.map((item, index) => {
            return (
              <Pressable key={index} onPress={() => completeTask(index)}>
                <Task name={item} />
              </Pressable>
            );
          })}
        </VStack>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          bg="#E8EAED"
        >
          <Center>
            <HStack mb={8} justifyContent="space-around" w="100%" ml={2}>
              <Input onChangeText={setTask} value={task}/>
              <Button onPress={handleAddTask} />
            </HStack>
          </Center>
        </KeyboardAvoidingView>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
