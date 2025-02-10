import Exception from './Exception';

export default class HttpException extends Exception {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
