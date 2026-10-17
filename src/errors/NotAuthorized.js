import CustomError from "./CustomError.js";

class NotAuthorized extends CustomError {
  constructor(message) {
    super(message, 401, "NotAuthorizedError");
  }
}
export default NotAuthorized;
