import { Request, Response } from "express";
import { now } from "mongoose";

import List from "../models/list";

class ListController {
  index = async (request: Request, response: Response) => {
    const { page = 1 } = request.query;
    // const user = response.locals.jwtPayload.id;
    const lists = await List.paginate(
      {
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
    const list = await List.findById(response.locals.jwtPayload.id);

    return response.json({
      id: list?._id,
      name: list?.name,
      listProduct: list?.listProduct,
    });
  };
  create = async (request: Request, response: Response) => {
    const list = await List.create(request.body);
    if (list) {
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
