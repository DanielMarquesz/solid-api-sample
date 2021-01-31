import { User } from "../../entities/User";
import { IUserRepository } from "./../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./createUserDTO";

export class createUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already Exists");
    }

    const user = new User(data);

    await this.usersRepository.save(user);
  }
}
