import { Exercise } from './exercise';

export class User {
    constructor(public uid: string, public email: string) {
      console.log('Object User init: ' + uid + ', ' + email);
    }
  }
