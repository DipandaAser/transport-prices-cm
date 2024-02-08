export class ErrorResponse {
    status: number = 500
    message: string = ""
    causedByUser: boolean = false

    constructor(status: number, message: string, causedByUser: boolean = false) {
        this.status = status
        this.message = message
        this.causedByUser = causedByUser
    }
}