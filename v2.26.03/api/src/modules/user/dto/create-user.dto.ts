export default class CreateUserDto {
  token!: string;
}

export class GenerateRegisterTokenDto {
  name!: string;
  email!: string;
  phone!: string;
  password!: string;
}

export class ClearRegisterTokenTokenDto {
  email!: string;
}
