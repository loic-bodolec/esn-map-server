import Exception from './Exception';

export default class ActionException extends Exception {
  constructor() {
    super('Vous n\'êtes pas autorisé à réaliser cette action.');
  }
}
