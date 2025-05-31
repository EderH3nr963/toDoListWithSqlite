import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@ui-kitten/components";
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "@ui-kitten/components/devsupport";

export default function FloatButton(props: TouchableWithoutFeedbackProps) {
  const theme = useTheme();

  return (
    <TouchableWithoutFeedback
      style={{
        width: 60,
        height: 60,
        backgroundColor: theme["color-primary-600"],
        borderRadius: 12,
        opacity: 0.8,
        position: "absolute",
        bottom: 40,
        right: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    >
      <Ionicons name="add-outline" size={40} color={"white"} />
    </TouchableWithoutFeedback>
  );
}
