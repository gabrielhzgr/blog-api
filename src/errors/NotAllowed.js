import CustomError from "./CustomError";

class NotAllowed extends CustomError {
  constructor(message) {
    super(message, 403, "NotAllowed");
  }
}
export default NotAllowed;
