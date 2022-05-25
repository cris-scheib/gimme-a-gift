import { Request, Response } from "express";
import { now } from "mongoose";

import UserList from "../models/userList";

class UserListController {

  destroy = async (request: Request, response: Response) => {
    const { id } = request.params;
    const userId = request.params.userId ?? response.locals.jwtPayload.id;
    const userList = await UserList.updateMany(
      { listId: id, userId },
      { deletedAt: now() },
      { new: false }
    );
    if (userList) {
      return response.status(200).json(userList);
    }
    return response.status(500).json({
      error: true,
      message: "Erro ao sair a lista",
    });
  };
}

export default UserListController;
