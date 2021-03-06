import { Request, Response } from 'express';
import { now } from 'mongoose';

import Payment from '../models/payment';
import Product from '../models/product';
import List from '../models/list';

class ListProductController {
  create = async (request: Request, response: Response) => {
    const { listId, productId } = request.body;
    const list = await List.findById(listId);
    const product = await Product.findById(productId);
    if (list && product) {
      list.listProduct.push({
        productId: product._id,
      });
      list.save();

      if (list) {
        return response.status(200).json(list);
      }
    }
    return response.status(500).json({
      error: true,
      message: 'Erro ao inserir o produto na lista',
    });
  };

  destroy = async (request: Request, response: Response) => {
    const { id, productId } = request.params;
    const list = await List.findById(id);
    if (list) {
      let newListProduct: any = [];
      for (let product of list.listProduct) {
        let prod: any = product;
        if (String(prod.productId) !== productId || !prod.buyable || prod.payments.length !== 0) {
          newListProduct.push(product);
        }
      }
      list.listProduct = newListProduct;
      list.save();
      return response.status(200).json(list);
    }

    return response.status(500).json({
      error: true,
      message: 'Erro ao remover a lista',
    });
  };
}

export default ListProductController;
