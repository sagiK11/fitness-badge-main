import { toast as BaseToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IToastProps {
  variant: "info" | "success" | "warning" | "error";
  text: string;
}

function Toast({ text, variant = "info" }: IToastProps) {
  return (
    <div className={`alert alert-${variant} rounded md:rounded-xl`}>
      <span>{text}</span>
    </div>
  );
}

export const toast = {
  showSuccess: (text: string) =>
    BaseToast(<Toast text={text} variant="success" />),
  showInfo: (text: string) => BaseToast(<Toast text={text} variant="info" />),
  showWarning: (text: string) =>
    BaseToast(<Toast text={text} variant="warning" />),
  showError: (text: string) => BaseToast(<Toast text={text} variant="error" />),
} as const;
