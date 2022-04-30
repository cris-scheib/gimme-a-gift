import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user";
import Invite from "../models/invite";
import UserList from "../models/userList";

class AuthController {
  login = async (request: Request, response: Response) => {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (user) {
      if (user.deletedAt != null) {
        return response.status(401).json({
          auth: false,
          message: "Usuário inativo!",
        });
      }
      user.comparePassword(password, (error: Error, isMatch: boolean) => {
        if (error || !isMatch) {
          return response.status(401).json({
            auth: false,
            message: "Autenticação inválida!",
          });
        }
        const id = user._id;
        const name = user.name;
        const dirImg = `${request.protocol}://${request.headers.host}/`
        const photo = user.photo === undefined ? null : dirImg + user.photo 
        const secret = process.env.JWT_SECRET ?? "";
        const token = jwt.sign({ id }, secret);

        return response.status(200).json({
          auth: true,
          token,
          name,
          photo,
        });
      });
    } else {
      return response.status(401).json({
        auth: false,
        message: "Autenticação inválida!",
      });
    }
  };

  register = async (request: Request, response: Response) => {
    const { email, password, name } = request.body;
    const user = await User.create({
      email: email,
      password: password,
      name: name,
    });
    if (user) {
      const invites = await Invite.find({ email: email });
      for (let invite of invites) {
        await UserList.create({
          listId: invite.listId,
          userId: user._id,
          permission: "client",
        });
      }
      const id = user._id;
      const name = user.name;
      const photo = user.photo;
      const secret = process.env.JWT_SECRET ?? "";
      const token = jwt.sign({ id }, secret);

      return response.status(200).json({
        auth: true,
        token,
        photo,
        name,
      });
    } else {
      return response.status(401).json({
        auth: false,
        message: "Erro ao registrar do usuário!",
      });
    }
  };
}

export default AuthController;
