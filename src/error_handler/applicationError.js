export class ApplicationError extends Error {
    constructor(message, code) {
    console.log("jfjjfjgjjgjfhhh");
        super(message);
        this.code = code;
    }
}