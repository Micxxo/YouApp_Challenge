import { toast } from "sonner";

const toastHelper = (
  message: string,
  variant: "loading" | "success" | "error",
  description?: string,
  updateId?: string | number
) => {
  let id: string | number;
  switch (variant) {
    case "loading":
      id = toast.loading("loading...", { dismissible: true, id: updateId });
      break;
    case "success":
      id = toast.success(message, {
        description,
        id: updateId,
        duration: 2000,
      });
      break;
    case "error":
      id = toast.error(message, { description, id: updateId, duration: 2000 });
      break;
    default:
      id = toast("....", { description, id: updateId, duration: 2000 });
      break;
  }
  return id;
};

export default toastHelper;
