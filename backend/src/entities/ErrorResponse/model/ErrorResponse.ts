export class ErrorResponse {
    message: string
    httpCode: number

    constructor(message: string, httpCode: number) {
        this.message = message
        this.httpCode = httpCode
    }
}