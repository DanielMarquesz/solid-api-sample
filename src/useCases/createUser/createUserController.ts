import { createUserUseCase } from "./createUserUseCase";
import { Request, Response } from "express";
export class createUserController {
  constructor(private createUserUseCase: createUserUseCase) {}

  handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      await this.createUserUseCase.execute({
        name,
        mail,
        password,
      });

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Enexpected Error",
      });
    }
  }
}
