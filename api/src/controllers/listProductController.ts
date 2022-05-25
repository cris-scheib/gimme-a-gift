import { Request, Response } from "express";
import { now } from "mongoose";

import UserList from "../models/userList";
import Product from "../models/product";
import List from "../models/list";

class ListProductController {
  create = async (request: Request, response: Response) => {
    const { listId, productId } = request.body;
    const list = await List.findById(listId);
    const product = await Product.findById(productId);
    if (list && product) {
      list.listProduct.push({
        productId: product._id,
        buyable: true,
        payments: [],
      });
      list.save();

      if (list) {
        return response.status(200).json(list);
      }
    }
    return response.status(500).json({
      error: true,
      message: "Erro ao inserir o produto na lista",
    });
  };

  update = async (request: Request, response: Response) => {
    const product = await Product.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );
    return response.json(product);
  };

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

export default ListProductController;
