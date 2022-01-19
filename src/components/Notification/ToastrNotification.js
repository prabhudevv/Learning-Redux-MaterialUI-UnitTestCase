import Toastr from "toastr2";
import "toastr2/dist/toastr.min.css";

const toastr = new Toastr();

export default alert = (type, msg) => {
  switch (type) {
    case "info":
      return toastr.info(msg, "Info");
    case "success":
      return toastr.success(msg, "Success");
    case "warning":
      return toastr.warning(msg, "Warning");
    case "error":
      return toastr.error(msg, "Error");
    default:
      return toastr.info(msg, "Info message");
  }
};
