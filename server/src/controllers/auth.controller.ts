import { NextFunction, Response } from "express";

import {
  authService,
  emailService,
  tokenService,
  userService,
} from "../services";
import { IRequestExtended, IUserEntity } from "../interfaces";
import { tokenRepository } from "../repositories/token/token.repository";
import { EmailTypeEnum } from "../enums/enums";

import { ErrorHandler } from "../error/error.handler";

class AuthController {
  public async registration(
    req: IRequestExtended,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { firstName, email } = req.body;

      const userFromDB = await userService.getUserByEmail(email);

      if (userFromDB) {
        next(new ErrorHandler(`User with:  ${email} email already exists`));
        return;
      }

      const createdUser = await userService.creteUser(req.body);

      const tokenData = await authService.registration(createdUser);

      // const data = await authService.registration(req.body);
      // const { firstName, email } = req.body;
      //
      // res.cookie(
      //     COOKIE.nameRefreshToken,
      //     data.refreshToken,
      //     { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
      // );

      await emailService.sendEmailHBS(email, firstName, EmailTypeEnum.WELCOME);

      res.json(tokenData);
      next();
    } catch (e) {
      next(e);
    }
  }

  public async login(
    req: IRequestExtended,
    res: Response,
    next: NextFunction
  ): Promise<void | Error> {
    try {
      const {
        id,
        firstName,
        email,
        password: hashedPassword,
      } = req.user as IUserEntity;

      const { password } = req.body;

      const { accessToken, refreshToken } =
        await tokenService.generateTokenPair({ userId: id, userEmail: email });

      await userService.compareUserPasswords(password, hashedPassword);

      await tokenRepository.createToken({
        refreshToken,
        accessToken,
        userId: id,
      });

      await emailService.sendEmailHBS(email, firstName, EmailTypeEnum.WELCOME);

      res.json({
        accessToken,
        refreshToken,
        user: req.user,
      });
    } catch (e: any) {
      next(e);
    }
  }

  public async logout(
    req: IRequestExtended,
    res: Response
  ): Promise<Response<string>> {
    const { id } = req.user as IUserEntity;

    // res.clearCookie(COOKIE.nameRefreshToken);
    await tokenRepository.deleteTokenByParams({ userId: id });

    return res.json("ok");
  }
}

export const authController = new AuthController();
