import CustomError from "./CustomError.js";

class NotValidInput extends CustomError {
  constructor(message) {
    super(message, 400, "NotValidInput");
  }
}
export default NotValidInput;
