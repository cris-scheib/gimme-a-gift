import { Request, Response } from "express";
import { now } from "mongoose";

import Payment from "../models/payment";
import Product from "../models/product";
import List from "../models/list";
import User from "../models/user";

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
    const { id } = request.params;
    const { field, productId } = request.body;
    const list = await List.findById(id);
    try {
      if (list) {
        let newListProduct: any = [];
        for (let product of list.listProduct) {
          let prod: any = product;
          switch (field) {
            case "buyable":
              if (
                String(prod.productId) === productId &&
                !prod.buyable &&
                prod.payments.length === 0
              ) {
                newListProduct.push({
                  productId: prod.productId,
                  buyable: false,
                  payments: [],
                });
              } else {
                newListProduct.push(product);
              }
              break;
            case "payment":
              if (String(prod.productId) === productId && !prod.buyable) {
                const user = await User.findById(response.locals.jwtPayload.id);
                const payment = await Payment.create({
                  userId: user?._id,
                  value: request.body.value,
                });
                console.log(payment)
                if (payment) {
                  prod.payments.push({
                    paymentId: payment._id,
                  });
                }
              }
              newListProduct.push(product);
              break;
          }
        }
        list.listProduct = newListProduct;
        // list.save();
        console.log(list);
        return response.status(200).json(list);
      }
    } catch (e) {
      console.log((e as Error).message);
      return response.status(500).json({
        error: true,
        message: "Erro ao atualizar a lista",
      });
    }
  };

  destroy = async (request: Request, response: Response) => {
    const { id, productId } = request.params;
    const list = await List.findById(id);
    if (list) {
      let newListProduct: any = [];
      for (let product of list.listProduct) {
        let prod: any = product;
        if (
          String(prod.productId) !== productId &&
          prod.buyable &&
          prod.payments.length === 0
        ) {
          newListProduct.push(product);
        }
      }
      list.listProduct = newListProduct;
      list.save();
      return response.status(200).json(list);
    }

    return response.status(500).json({
      error: true,
      message: "Erro ao remover a lista",
    });
  };
}

export default ListProductController;
