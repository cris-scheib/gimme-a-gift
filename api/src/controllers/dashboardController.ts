import { Request, Response } from "express";
import { now } from "mongoose";
import Payment from "../models/payment";
import Product from "../models/product";
import List from "../models/list";
import User from "../models/user";
import UserList from "../models/userList";
const mongoose = require("mongoose");

class DashboardController {
  countLists = async (request: Request, response: Response) => {
    const { permission } = request.query;
    const userId = response.locals.jwtPayload.id;
    const userLists = await UserList.find({
      userId: userId,
      permission: String(permission),
      deletedAt: null,
    }).select({ listId: 1, _id: 0 });
    const listIds = userLists.map((userList) => {
      return userList.listId;
    });
    const count = await List.countDocuments({
      _id: { $in: listIds },
      deletedAt: null,
    });
    return response.json(count);
  };
}

export default DashboardController;
