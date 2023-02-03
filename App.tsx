import React, { useState, useEffect } from "react";
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
  FlatList,
} from "native-base";

import firestore from "@react-native-firebase/firestore";

import { Task } from "./src/components/Task";
import { Alert, Keyboard, Platform } from "react-native";
import { Input } from "./src/components/Input";
import { Button } from "./src/components/Button";
import { TaskDTO } from "./src/dtos/TaskDTO";

export type TaskProps = {
  id: string;
  task: string;
};

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState<TaskProps[]>([
    { id: "122", task: "123" },
  ]);

  function handleAddTask() {
    Keyboard.dismiss();
    firestore()
      .collection<TaskDTO>("tasks")
      .add({
        task,
      })
      .catch((error) => {
        Alert.alert("ERROR", `${error}`);
      });
    setTask(null);
  }

  function completeTask(docID) {
    firestore()
      .collection<TaskDTO>("tasks")
      .doc(docID)
      .delete()
      .catch((error) => {
        Alert.alert("ERROR", `${error}`);
      });
  }
  useEffect(() => {
    const subscriber = firestore()
      .collection("tasks")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { task } = doc.data();
          return {
            id: doc.id,
            task,
          };
        });
        setTaskItems(data);
      });
    return subscriber;
  }, []);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <VStack flex={1} bg="#E8EAED" pt={16} pl={8} pr={8}>
          <Text fontSize={24} fontWeight="bold" mb={4}>
            Today's tasks
          </Text>
          <FlatList
            data={taskItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable key={item.id} onPress={() => completeTask(item.id)}>
                <Task name={item.task} />
              </Pressable>
            )}
          />
        </VStack>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          bg="#E8EAED"
        >
          <Center>
            <HStack mb={8} justifyContent="space-around" w="100%" ml={2}>
              <Input onChangeText={setTask} value={task} />
              <Button onPress={handleAddTask} />
            </HStack>
          </Center>
        </KeyboardAvoidingView>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
