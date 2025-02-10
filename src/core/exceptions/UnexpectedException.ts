import Exception from './Exception';

export default class UnexpectedException extends Exception {
  constructor() {
    super('Something went wrong');
  }
}
