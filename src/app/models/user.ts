import { Base } from './_base'

export class User extends Base {
  email: string;
  password: string;
  encryptedPassword: string;
  id: number;

  constructor(data?: object, from_back: boolean = false) {
    super(data, from_back)
  }
}
