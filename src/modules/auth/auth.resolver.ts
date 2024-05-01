import httpStatus from "http-status";
import { RegisterBody, LoginBody } from "../../typings/auth.type";
import { registerService , loginService} from "./auth.service";
export const registerResolver = {
  Query: {
    hello: () => "Hello, World!",
  },
  Mutation: {
    async register(
      _: any,
      { input }: { input: RegisterBody },
    ) {
      const { accessToken, success } = await registerService(input);
      return {
        statusCode: httpStatus.CREATED,
        message: success,
        token: accessToken
      };
    },
    async login(    _: any, { input }: { input: LoginBody }){
      const { accessToken, success } = await loginService(input);
      return {
        statusCode: httpStatus.OK,
        message: success,
        token: accessToken
      };      
    }
  },
};
