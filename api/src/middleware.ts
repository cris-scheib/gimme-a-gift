import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from './models/user';

class Middleware {
  validateToken = (request: Request, response: Response, next: NextFunction) => {
    let { authorization } = request.headers;

    if (authorization) {
      if (authorization.startsWith('Bearer ')) {
        authorization = authorization.slice(7, authorization.length);
      }

      const secret = process.env.JWT_SECRET ?? '';

      jwt.verify(authorization, secret, async (error, user) => {
        if (error) {
          return response.status(401).json({
            success: false,
            message: 'Autenticação inválida!'
          });
        } else {
          if (user) {
            const userProfile = await User.findById(user.id);
            if (request.originalUrl != '/api/users/rebuild') {
              if (userProfile == null || userProfile.deletedAt != null) {
                return response.status(401).json({
                  success: false,
                  message: 'Usuário inativo!'
                });
              }
            }
          }

          response.locals.jwtPayload = user;
          next();
        }
      });
    } else {
      return response.status(401).json({
        success: false,
        message: 'Autenticação não realizada!'
      });
    }
  }
}

export default new Middleware;
