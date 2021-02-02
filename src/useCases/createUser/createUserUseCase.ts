import { IMailProvider } from "./../../providers/IMailProvider";
import { User } from "../../entities/User";
import { IUserRepository } from "./../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./createUserDTO";

export class createUserUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already Exists");
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Equipe legal",
        email: "equipe@epq.com",
      },
      subject: "Seja Bem vindo a Plataforma",
      body: "<p>Do u know tha way?</p>",
    });
  }
}
