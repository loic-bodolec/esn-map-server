import NotFoundException from './NotFoundException';

export default class UserNotFoundException extends NotFoundException {
  constructor() {
    super('User');
  }
}
