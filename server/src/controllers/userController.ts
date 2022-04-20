import {NextFunction, Response} from "express";

import {emailService} from "../services";
import {IRequestExtended} from "../interfaces";
import {EmailTypeEnum} from "../enums/enums";

class UserController {
    public async sendResult (req: IRequestExtended, res: Response, next: NextFunction):Promise<void> {
        try{
            const {firstName, email, loanResult, loanTerm, initialLoan, downPayment, bankName} = req.body;

            await emailService.sendEmailHBS(email, firstName, EmailTypeEnum.RESULT,
                {loanResult, loanTerm, bankName, downPayment, initialLoan });

            res.json('ok');
            next();
        }catch(e){
            next(e);
        }



    }

}

export const userController = new UserController();