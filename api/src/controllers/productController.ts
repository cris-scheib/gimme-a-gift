import { Request, Response } from "express";
import { now } from "mongoose";

import Product from "../models/product";

class ProductController {
  index = async (request: Request, response: Response) => {
    const { page = 1, search } = request.query;
    const products = await Product.paginate(
      {
        deletedAt: null,
        name: {$regex: search, $options: 'i'}
      },
      {
        page: Number(page),
        limit: 25,
        select: ["name", "description", "link", "shop", "photos", "value", "shop"],
      }
    );
    return response.json(products);
  };

  show = async (request: Request, response: Response) => {
    const { id } = request.params;
    const product = await Product.findById(id);
    return response.json(product);
  };

  create = async (request: Request, response: Response) => {
    const product = await Product.create(request.body);
    if (product) {
      return response.json({ product, error: false });
    }
    return response.status(500).json({
      error: true,
      message: "Erro ao criar o produto",
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
    const product = await Product.findByIdAndUpdate(
      request.params.id,
      { deletedAt: now() },
      { new: true }
    );
    return response.json(product);
  };
}

export default ProductController;
