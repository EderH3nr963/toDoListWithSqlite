import CreateToDoModal from "@/components/CreateToDoModal";
import FloatButton from "@/components/FloatButton";
import UpdateToDoModal from "@/components/UpdateToDoModal";
import {
  completedToDo,
  excludeToDo,
  selectAllToDo,
} from "@/database/queries/ToDoQueries";
import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  Card,
  Layout,
  Spinner,
  Text,
  ThemeType,
  useTheme,
} from "@ui-kitten/components";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface IToDo {
  id: number;
  nameToDo: string;
  description: string;
  dateToDo: string;
  itsNotificable: boolean;
  thisCompleted: boolean;
}

export default function HomeScreen() {
  const [toDos, setToDos] = useState<IToDo[] | null>(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleEditModal, setIsVisibleEditModal] = useState(false);
  const [toDoToEdit, setToDoToEdit] = useState<IToDo | null>(null);
  const theme = useTheme();

  const getToDos = async () => {
    try {
      const allToDos = (await selectAllToDo()) as IToDo[];
      setToDos([...allToDos]);
    } catch {
      // erro silencioso
    }
  };

  useEffect(() => {
    getToDos();
  }, []);

  if (toDos === null) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Spinner size="giant" status="primary" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "#f9f9f9" }}
    >
      <View style={{ marginTop: 20 }}>
        <Text category="h1" style={{ fontSize: 28, marginBottom: 16 }}>
          Lista de Tarefas
        </Text>
        <FlatList
          scrollEnabled={true}
          data={toDos}
          renderItem={({ item }) =>
            renderToDo({
              item,
              theme,
              onComplete: getToDos,
              onEdit: (toDo) => {
                setToDoToEdit(toDo);
                setIsVisibleEditModal(true);
              },
            })
          }
          keyExtractor={(toDo) => toDo.id.toString()}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 125 }}
        />
      </View>

      <FloatButton onPress={() => setIsVisibleModal(true)} />

      <CreateToDoModal
        setIsVisibleModal={setIsVisibleModal}
        getAllToDos={getToDos}
        visible={isVisibleModal}
        onBackdropPress={() => setIsVisibleModal(false)}
      />

      {toDoToEdit && (
        <UpdateToDoModal
          visible={isVisibleEditModal}
          setIsVisibleModal={setIsVisibleEditModal}
          getAllToDos={getToDos}
          onBackdropPress={() => setIsVisibleEditModal(false)}
          toDo={toDoToEdit}
        />
      )}
    </SafeAreaView>
  );
}

const renderToDo = ({
  item,
  theme,
  onComplete,
  onEdit,
}: {
  item: IToDo;
  theme: ThemeType;
  onComplete: () => void;
  onEdit: (toDo: IToDo) => void;
}) => {
  return (
    <Card style={{ marginVertical: 10, borderRadius: 16 }} status="basic">
      <Layout style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          onPress={async () => {
            await completedToDo(item.id);
            onComplete();
          }}
        >
          <Ionicons
            name={
              item.thisCompleted
                ? "checkmark-circle-outline"
                : "radio-button-off-outline"
            }
            fill={item.thisCompleted ? "#28a745" : "#aaa"}
            style={{ width: 24, height: 24, marginRight: 12 }}
            size={24}
          />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text category="s1" style={{ fontWeight: "bold", marginBottom: 4 }}>
            {item.nameToDo}
          </Text>
          <Text appearance="hint" category="c1" style={{ marginBottom: 4 }}>
            {item.description}
          </Text>
          <Text category="c1" appearance="hint">
            {format(new Date(item.dateToDo), "dd/MM/yyyy HH:mm")}
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <Button
            appearance="ghost"
            size="small"
            onPress={() => onEdit(item)}
            accessoryLeft={
              <Ionicons
                name="create-outline"
                size={20}
                style={{ color: theme["color-primary-500"] }}
              />
            }
          />
          <Button
            appearance="ghost"
            size="small"
            onPress={async () => {
              await excludeToDo(item.id);
              onComplete();
            }}
            accessoryLeft={
              <Ionicons
                name="trash-bin-outline"
                size={20}
                style={{ color: theme["color-danger-700"] }}
              />
            }
          />
        </View>
      </Layout>
    </Card>
  );
};
