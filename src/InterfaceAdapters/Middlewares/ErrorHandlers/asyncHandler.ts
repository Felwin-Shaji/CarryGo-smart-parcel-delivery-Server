import type {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

export const asyncHandler = <
  P extends ParamsDictionary = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery extends ParsedQs = ParsedQs
>(
  fn: (
    req: Request<P, ResBody, ReqBody, ReqQuery>, 
    res: Response<ResBody>,
    next: NextFunction
  ) => Promise<void | Response<ResBody>>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};