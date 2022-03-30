import { Request, Response } from 'express';
import { now } from 'mongoose';

import User from '../models/user';

class UserController {
  index = async(request: Request, response: Response) => {
    const { page = 1 } = request.query;
    const users = await User.paginate({
      deletedAt: null
    }, {
      page: Number(page),
      limit: 10,
      select: ['name', 'email'],
    });
    return response.json(users);
  }

  show = async (request: Request, response: Response) => {
    const user = await User.findById(response.locals.jwtPayload.id);

    return response.json({
      id: user?._id,
      name: user?.name,
      email: user?.email,
      photo: user?.photo,
      genre: user?.genre,
      cpf: user?.cpf,
    });
  }

  store = async (request: Request, response: Response) => {
    console.log('Chegou no registra user');
    const user = await User.create(request.body);
    return response.json({ user, token: 'abc' });
  }

  update = async(request: Request, response: Response) => {
    const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if(user){
      return response.status(200).json({
        error: false,
        message: "Usuário atualizado com sucesso!",
      });
    }
    return response.status(500).json({
      error: true,
      message: "Erro ao atualizar o Usuário!",
    });
  }

  destroy = async(request: Request, response: Response) => {
    const user = await User.findByIdAndUpdate(response.locals.jwtPayload.id, { deletedAt: now() }, { new: true });
    return response.json(user);
  }

  rebuild = async(request: Request, response: Response) => {
    const user = await User.findByIdAndUpdate(response.locals.jwtPayload.id, { deletedAt: null }, { new: true });
    return response.json(user);
  }
}

export default UserController;
