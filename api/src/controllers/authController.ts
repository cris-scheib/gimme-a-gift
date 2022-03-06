import { Request, Response} from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user';

class AuthController {
  store = async (request: Request, response: Response) => {
    const { username, password } = request.body;

    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });

    if (user) {
      if (user.deletedAt != null) {
        return response.status(401).json({
          auth: false,
          message: 'Usuário inativo!'
        });
      }

      user.comparePassword(password, (error: Error, isMatch: boolean) => {
        if (error || !isMatch) {
          return response.status(401).json({
            auth: false,
            message: 'Autenticação inválida!'
          });
        }

        const id = user._id;
        const name = user.name;
        const secret = process.env.JWT_SECRET ?? '';
        const token = jwt.sign({ id }, secret);

        return response.status(200).json({
          auth: true,
          token,
          name
        });
      });
    } else {
      return response.status(401).json({
        auth: false,
        message: 'Autenticação inválida!'
      });
    }
  };
}

export default AuthController;
