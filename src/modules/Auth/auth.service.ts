import { Request, Response } from "express";
import { SignupDto } from "./auth.dto";
import { HUserDocument ,UserModel } from "../../DB/models/user.model";

class AuthService {
  constructor() { }
  signup = async (req: Request, res: Response): Promise<Response> => {
    const { username, password, email }: SignupDto = req.body;
    const user: HUserDocument = new UserModel({ username, password, email });
    user.save();
    return res.status(200).json({ message: "signup success" });
  }

}
export default new AuthService(); // singleton