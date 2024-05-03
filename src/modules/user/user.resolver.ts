import { Request, Response } from "express";
import authMiddleware from "../../middlewares/auth.middleware";

export default {
  Query: {
    myAccount: async (
      _: any,
      __: any,
      { req, res }: { req: Request; res: Response }
    ) => {
      await authMiddleware(req, res);
      return (req as any).user;
    },
  },
  
};
