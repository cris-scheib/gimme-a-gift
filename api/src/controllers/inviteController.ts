import { Request, Response } from "express";

import Invite from "../models/invite";
import User from "../models/user";
import UserList from "../models/userList";

class InviteController {
  create = async (request: Request, response: Response) => {
    const { email, listId } = request.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      const invite = await Invite.create({ email, listId });
      if (invite) {
        return response.status(201).json({
          error: false,
          message: "Convite enviado com sucesso!",
        });
      }
    } else {
      const userList = await UserList.create({
        listId: listId,
        userId: user.id,
        permission: "client",
      });
      if (userList) {
        return response.status(201).json({
          error: false,
          message: "Convite enviado com sucesso!",
        });
      }
    }
    return response.status(500).json({
      error: true,
      message: "Erro ao criar a lista",
    });
  };
}

export default InviteController;
