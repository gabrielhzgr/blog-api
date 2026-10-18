import CustomError from "./CustomError.js";

class NotAllowed extends CustomError {
  constructor(message) {
    super(message, 403, "NotAllowed");
  }
}
export default NotAllowed;
