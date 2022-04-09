import { Request, Response } from "express";
import { now } from "mongoose";

import List from "../models/list";
import UserList from "../models/userList";

class ListController {
  index = async (request: Request, response: Response) => {
    const { page = 1 } = request.query;
    const userId = response.locals.jwtPayload.id;
    const userLists = await UserList.find({
      userId: userId
    }).select({listId: 1, _id: 0});
    const listIds = userLists.map((userList) => { return userList.listId; });
    const lists = await List.paginate(
      {
        "_id": { "$in": listIds },
        deletedAt: null,
      },
      {
        page: Number(page),
        limit: 10,
        select: ["name"],
      }
    );
    return response.json(lists);
  };

  show = async (request: Request, response: Response) => {
    const { id } = request.params;
    const userId = response.locals.jwtPayload.id;
    const userList = await UserList.findOne({
      userId: userId,
      listId: id,
      status:true
    })
    if(userList && userList.permissions.length > 0){
      const list = await List.findById(id);
      return response.json(list);
    }else{
      return response.status(401).json({
        auth: false,
        message: "Autenticação inválida!",
      });
    }

  };
  create = async (request: Request, response: Response) => {
    const list = await List.create(request.body);
    const userId = response.locals.jwtPayload.id;
    const userList = await UserList.create({
      listId: list._id,
      userId: userId,
      permissions: ["write", "read"],
    });
    if (list && userList) {
      return response.json({ list, error: false });
    }
    return response.status(500).json({
      error: true,
      message: "Erro ao criar a lista",
    });
  };

  update = async (request: Request, response: Response) => {
    // const { oldPassword } = request.body;
    // if (oldPassword !== undefined) {
    //   const validPassword = await this.password(request.params.id, oldPassword);
    //   if(!validPassword){
    //     return response.status(403).json({
    //       error: false,
    //       message: "Senha inválida",
    //     });
    //    }
    // }
    // const user = await List.findByIdAndUpdate(request.params.id, request.body, {
    //    new: true,
    //  });
    //  if (user) {
    //    return response.status(200).json({
    //      error: false,
    //      message: "Usuário atualizado com sucesso!",
    //    });
    //  }
    // return response.status(500).json({
    //   error: true,
    //   message: "Erro ao atualizar o Usuário!",
    // });
  };

  destroy = async (request: Request, response: Response) => {
    const user = await List.findByIdAndUpdate(
      response.locals.jwtPayload.id,
      { deletedAt: now() },
      { new: true }
    );
    return response.json(user);
  };
}

export default ListController;
