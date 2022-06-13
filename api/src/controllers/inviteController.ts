import { Request, Response } from "express";

import Invite from "../models/invite";
import List from "../models/list";
import User from "../models/user";
import UserList from "../models/userList";
import InviteService from "../utils/invite";

class InviteController {
  create = async (request: Request, response: Response) => {
    const { email, listId, permission } = request.body;

    const user = await User.findOne({ email: email });
    if (!user) {

      const invite = await Invite.create({ email, listId, permission });

      const list = await List.findOne({
        id: listId
      });

      if (list) {
        const inviteService = new InviteService();
        inviteService.sendInvite(
          email, list.name, listId, []
        );
      }

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
        permission: permission,
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
