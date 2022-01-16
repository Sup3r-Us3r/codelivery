export class AppError {
  public readonly message;
  public readonly statusCode;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
