import Exception from './Exception';

export default class NotFoundException extends Exception {
  constructor(entity: string) {
    super(`${entity} non trouvé(e)`);
  }
}
