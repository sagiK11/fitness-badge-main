import { toast as BaseToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toast = {
  showSuccess: (text: string) => BaseToast.success(text),
  showInfo: (text: string) => BaseToast.info(text),
  showWarning: (text: string) => BaseToast.warning(text),
  showError: (text: string) => BaseToast.error(text),
} as const;
