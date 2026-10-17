class CustomError extends error {
  constructor(message, statusCode, name) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

export default CustomError;
