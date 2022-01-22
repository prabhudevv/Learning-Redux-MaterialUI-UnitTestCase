import Toastr from "react-hot-toast";

export default alert = (type, msg) => {
  switch (type) {
    case "info":
      return Toastr.info(msg, "Info");
    case "success":
      return Toastr.success(msg, "Success");
    case "warning":
      return Toastr.warning(msg, "Warning");
    case "error":
      return Toastr.error(msg, "Error");
    default:
      return Toastr.info(msg, "Info message");
  }
};
