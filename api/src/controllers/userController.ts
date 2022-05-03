import { Request, Response } from "express";
import { now } from "mongoose";
const path = require("path");
import User from "../models/user";
import formidable from "formidable";
const fs = require("fs");

class UserController {
  index = async (request: Request, response: Response) => {
    const { page = 1 } = request.query;
    const users = await User.paginate(
      {
        deletedAt: null,
      },
      {
        page: Number(page),
        limit: 10,
        select: ["name", "email"],
      }
    );
    return response.json(users);
  };

  show = async (request: Request, response: Response) => {
    const user = await User.findById(response.locals.jwtPayload.id);
    const dirImg = `${request.protocol}://${request.headers.host}/`
    const photo = user?.photo === undefined ? null : dirImg + user?.photo 
    return response.json({
      id: user?._id,
      name: user?.name,
      email: user?.email,
      photo: photo,
      genre: user?.genre,
      cpf: user?.cpf,
    });
  };

  update = async (request: Request, response: Response) => {
    const { oldPassword } = request.body;
    const userId = response.locals.jwtPayload.id;
    if (oldPassword !== undefined) {
      const validPassword = await this.password(userId, oldPassword);
      if (!validPassword) {
        return response.status(403).json({
          error: false,
          message: "Senha inválida",
        });
      }
    }
    const user = await User.findByIdAndUpdate(userId, request.body, {
      new: true,
    });
    if (user) {
      return response.status(200).json({
        error: false,
        message: "Usuário atualizado com sucesso!",
      });
    }
    return response.status(500).json({
      error: true,
      message: "Erro ao atualizar o Usuário!",
    });
  };
  photo = async (request: Request, response: Response) => {
    const form = formidable({ multiples: true });
    const userId = response.locals.jwtPayload.id;
    const files = await new Promise(function (resolve: any, reject: any) {
      form.parse(request, (err: any, fields: any, files: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(files);
      });
    });

    const photo = await this.uploadPhoto(files);
    if (photo) {
      const save = await this.savePhoto(userId, photo);
      if (save) {
        const dirImg = `${request.protocol}://${request.headers.host}/`
        return response.status(200).json({
          error: false,
          photo: dirImg + save,
          message: "Foto atualizada com sucesso!",
        });
      }
    }
    return response.status(500).json({
      error: true,
      message: "Erro ao enviar a foto!",
    });
  };

  savePhoto = async (id: string, photo: string) => {
    const user = await User.findByIdAndUpdate(
      id,
      { photo: photo },
      {
        new: true,
      }
    );
    return user?.photo;
  };
  uploadPhoto = async (files: any) => {
    const file = files.file;
    if (file) {
      const types = ["image/jpeg", "image/png", "image/jpg"];
      const validType = types.indexOf(file.mimetype) !== -1;
      if (validType) {
        const dir = "./public/";
        const path = `img/${file.originalFilename}`;
        fs.createReadStream(file.filepath)
          .pipe(fs.createWriteStream(dir + path))
          .on("error", (error: any) => {
            throw error;
          });
        return path;
      }
    }
    return null;
  };
  password = async (id: string, oldPassword: string) => {
    const userPassword = await User.findById(id);
    if (userPassword) {
      userPassword.comparePassword(
        oldPassword,
        (error: Error, isMatch: boolean) => {
          if (error || !isMatch) {
            return false;
          }
        }
      );
    }
    return true;
  };
  destroy = async (request: Request, response: Response) => {
    const user = await User.findByIdAndUpdate(
      response.locals.jwtPayload.id,
      { deletedAt: now() },
      { new: true }
    );
    return response.json(user);
  };

  rebuild = async (request: Request, response: Response) => {
    const user = await User.findByIdAndUpdate(
      response.locals.jwtPayload.id,
      { deletedAt: null },
      { new: true }
    );
    return response.json(user);
  };
}

export default UserController;
