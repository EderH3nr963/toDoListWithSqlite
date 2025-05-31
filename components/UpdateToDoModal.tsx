import { IToDo } from "@/app/HomeScreen";
import { updateToDo } from "@/database/queries/ToDoQueries";
import {
  Button,
  CheckBox,
  Datepicker,
  Input,
  Modal,
  ModalProps,
  Text,
} from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { View } from "react-native";

interface Props extends ModalProps {
  getAllToDos: () => void;
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  toDo: IToDo;
}

export default function UpdateToDoModal(props: Props) {
  const [form, setForm] = useState({
    nameToDo: "",
    description: "",
    dateToDo: new Date(),
    itsNotificable: false,
  });

  // ✅ Atualiza o form sempre que o modal for aberto com uma nova tarefa
  useEffect(() => {
    if (props.toDo) {
      setForm({
        nameToDo: props.toDo.nameToDo,
        description: props.toDo.description,
        dateToDo: new Date(props.toDo.dateToDo),
        itsNotificable: Boolean(props.toDo.itsNotificable),
      });
    }
  }, [props.toDo]);

  const clearForm = () => {
    setForm({
      nameToDo: "",
      description: "",
      dateToDo: new Date(),
      itsNotificable: false,
    });
  };

  const handleUpdateToDo = async () => {
    try {
      await updateToDo({ id: props.toDo.id, ...form }); // ✅ Certifique-se que `updateToDo` está implementado

      clearForm();
      props.getAllToDos();
      props.setIsVisibleModal(false);
    } catch (e) {
      console.log("Erro ao atualizar tarefa:", e);
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
        Atualizar Tarefa
      </Text>
      <View style={{ gap: 30 }}>
        <Input
          label="Nome da tarefa"
          value={form.nameToDo}
          maxLength={40}
          onChangeText={(text) => setForm({ ...form, nameToDo: text })}
        />
        <Input
          label="Descrição"
          value={form.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
        />
        <Datepicker
          label="Data da Tarefa"
          date={form.dateToDo}
          onSelect={(nextDate) => setForm({ ...form, dateToDo: nextDate })}
        />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text>Notificar?</Text>
          <CheckBox
            checked={form.itsNotificable}
            onChange={(nextChecked) =>
              setForm({ ...form, itsNotificable: nextChecked })
            }
          />
        </View>
        <Button style={{ borderRadius: 10 }} onPress={handleUpdateToDo}>
          Atualizar
        </Button>
      </View>
    </Modal>
  );
}
