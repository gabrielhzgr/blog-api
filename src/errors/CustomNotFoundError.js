class CustomNotFoundError {
    constructor(message) {
        super(message)
        this.statusCode = 404
        this.name = "NotFoundError"
    }
}

export default CustomNotFoundError