import { Request, Response } from "express";
import { now } from "mongoose";
const mongoose = require("mongoose");
import List from "../models/list";
import Product from "../models/product";
import User from "../models/user";
import UserList from "../models/userList";

class ListController {
  index = async (request: Request, response: Response) => {
    const { page = 1 } = request.query;
    const userId = response.locals.jwtPayload.id;
    const userLists = await UserList.find({
      userId: userId,
      deletedAt: null,
    }).select({ listId: 1, _id: 0 });
    const listIds = userLists.map((userList) => {
      return userList.listId;
    });
    const lists = await List.paginate(
      {
        _id: { $in: listIds },
        deletedAt: null,
      },
      {
        page: Number(page),
        limit: 10,
        select: ["name", "description"],
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
    });
    if (userList) {
      const list = (
        await List.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(id),
              deletedAt: null,
            },
          },
          {
            $lookup: {
              from: Product.collection.name,
              localField: "listProduct.productId",
              foreignField: "_id",
              as: "products",
            },
          },
        ])
      )[0];
      if (list) {
        const usersLists = await UserList.find({
          listId: list._id,
          deletedAt: null,
          userId: { $ne: userId },
        }).select({ userId: 1, _id: 0 });
        const userIds = usersLists.map((usersList) => {
          return usersList.userId;
        });
        const users = await User.find({
          _id: { $in: userIds },
          deletedAt: null,
        }).select({ _id: 1, name: 1, photo: 1 });
        return response.json({ list, users, userList });
      }
      return response.status(500).json({
        auth: false,
        message: "Erro ao buscar a lista!",
      });
    } else {
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
      permission: "admin",
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
    const list = await List.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    return response.json(list);
  };

  destroy = async (request: Request, response: Response) => {
    const list = await List.findByIdAndUpdate(
      request.params.id,
      { deletedAt: now() },
      { new: true }
    );
    return response.json(list);
  };
}

export default ListController;
