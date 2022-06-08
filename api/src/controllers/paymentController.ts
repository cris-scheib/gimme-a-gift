import { Request, Response } from "express";
import { now } from "mongoose";
import Payment from "../models/payment";
import Product from "../models/product";
import List from "../models/list";
import User from "../models/user";
import UserList from "../models/userList";
const mongoose = require("mongoose");

class PaymentController {
  index = async (request: Request, response: Response) => {
    const { productId, listId } = request.query;
    const payments = await Payment.aggregate([
      {
        $match: {
          deletedAt: null,
          listId: new mongoose.Types.ObjectId(String(listId)),
          productId: new mongoose.Types.ObjectId(String(productId)),
        },
      },
      {
        $lookup: {
          from: Product.collection.name,
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $lookup: {
          from: List.collection.name,
          localField: "listId",
          foreignField: "_id",
          as: "list",
        },
      },
      {
        $lookup: {
          from: User.collection.name,
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);
    return response.json(payments);
  };
  myPayments = async (request: Request, response: Response) => {
    const userId = response.locals.jwtPayload.id;
    const payments = await Payment.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          deletedAt: null,
        },
      },
      {
        $lookup: {
          from: Product.collection.name,
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $lookup: {
          from: List.collection.name,
          localField: "listId",
          foreignField: "_id",
          as: "list",
        },
      },
      {
        $lookup: {
          from: User.collection.name,
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);
    return response.json(payments);
  };

  show = async (request: Request, response: Response) => {
    const { id } = request.params;
    const payment = await Payment.findById(id);
    return response.json(payment);
  };

  create = async (request: Request, response: Response) => {
    const { listId, productId, value } = request.body;
    const userId = response.locals.jwtPayload.id;
    const userList = await UserList.findOne({
      userId: userId,
      listId: listId,
    });
    if (userList) {
      const payment = await Payment.create({
        listId,
        productId,
        value,
        userId,
      });
      if (payment) {
        return response.json({ payment, error: false });
      }
    }
    return response.status(500).json({
      error: true,
      message: "Erro ao criar o produto",
    });
  };

  destroy = async (request: Request, response: Response) => {
    const payment = await Payment.findByIdAndUpdate(
      request.params.id,
      { deletedAt: now() },
      { new: true }
    );
    return response.json(payment);
  };
}

export default PaymentController;
