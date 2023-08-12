import { type Response, type NextFunction, type Request } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { Role } from '../utils/enums'
import responses from "../utils/response";
const { JWT_PRIVATE_KEY } = process.env

export const authorize = (...permittedRoles: Role[]) => {
  return async (
    req: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const token = req.headers.authorization?.split(' ')[1]

      if (token === null || token === undefined) {
        req.body = { ...req.body, verified: { role: Role.GUEST } }
      } else {
        const payload = await validateToken(token)
        if (payload === -1) {
          responses.error(401, 'Access denied. Invalid Token', _)
        }
        req.body = { ...req.body, verified: payload }
      }
      // check for permitted roles
      const found: Role|undefined = permittedRoles.filter((role) => role === req.body.verified.role).pop();

      if (found === undefined) {
        responses.error(401, 'Access denied. You cannot access this route', _)
      }
      next()
    } catch (error) {
      responses.error(401, 'Access denied. You cannot access this route', _)
    }
  }
}

export const validateToken = async (
  token: string
): Promise<JwtPayload | string | number> => {
  try {
    return jwt.verify(token, JWT_PRIVATE_KEY??'secret')
  } catch (error) {
    return -1;
  }
}
