export default class Exception extends Error {
  public message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
