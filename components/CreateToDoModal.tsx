import { CreateToDo } from "@/database/queries/ToDoQueries";
import {
  Button,
  CheckBox,
  Datepicker,
  Input,
  Modal,
  ModalProps,
  Text,
} from "@ui-kitten/components";
import { useState } from "react";
import { View } from "react-native";

interface Props extends ModalProps {
  getAllToDos: () => void;
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateToDoModal(props: Props) {
  const [form, setForm] = useState({
    nameToDo: "",
    description: "",
    dateToDo: new Date(),
    itsNotificable: false,
  });

  const clearForm = () => {
    setForm({
      nameToDo: "",
      description: "",
      dateToDo: new Date(),
      itsNotificable: false,
    });
  };

  const handleCreateToDo = async () => {
    try {
      console.log(form);

      const result = await CreateToDo({ ...form });

      clearForm();
      props.getAllToDos();
      props.setIsVisibleModal(false);
    } catch (e) {
      console.log(e);
      // pass
    }
  };

  return (
    <Modal
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      style={{
        width: "80%",
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 40,
        paddingHorizontal: 20,
        justifyContent: "center",
      }}
      {...props}
    >
      <Text category="h2" style={{ marginBottom: 40 }}>
        Criar Tarefa
      </Text>
      <View style={{ gap: 30 }}>
        <Input
          label={"Nome da tarefa"}
          value={form.nameToDo}
          maxLength={40}
          onChangeText={(text) => setForm({ ...form, nameToDo: text })}
        />
        <Input
          label={"Descrição"}
          value={form.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
        />
        <Datepicker
          label={"Data da Tarefa"}
          date={form.dateToDo}
          onSelect={(nextDate) => setForm({ ...form, dateToDo: nextDate })}
        />
        <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <Text>Notificar?</Text>
          <CheckBox
            checked={form.itsNotificable}
            onChange={(nextChecked) =>
              setForm({ ...form, itsNotificable: nextChecked })
            }
          />
        </View>
        <Button style={{ borderRadius: 10 }} onPress={handleCreateToDo}>
          Criar
        </Button>
      </View>
    </Modal>
  );
}
