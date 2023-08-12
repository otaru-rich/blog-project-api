import { type Request, type Response } from 'express'
import responses from '../utils/response'

import Service from '../services'
import type response from '../utils/response'

const { UserService } = Service

class UserControllers {
  /**
     * Find all users
     * @param req
     * @param res
     * @returns response
     */
  findUsers = async (req: Request, res: Response): Promise<Response> => {
    const response = await UserService.findUsers()

    if (response === null) {
      return responses.error(404, 'Not Found', res)
    }

    return responses.success(
      200,
      'success',
      {
        count: response[1],
        data: response[0]
      },
      res
    )
  }

  /**
     * Find one user
     * @param req
     * @param res
     * @returns response
     */
  findOneUser = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params

    const response = await UserService.findOneUser(parseInt(userId))

    if (response === null) {
      return responses.error(404, 'Not Found', res)
    }

    return responses.success(200, 'success', response, res)
  }

  /**
     * Login a new user
     * @param req
     * @param res
     * @returns response
     */
  login = async (req: Request, res: Response): Promise<Response> => {
    const {
      username,
      password
    }: {
      username: string
      password: string
    } = req.body

    const token = await UserService.login(username, password)

    if (token === null) {
      return responses.error(401, 'Invalid Credentials', res)
    }

    return responses.success(
      200,
      'logged in',
      { username, token },
      res
    )
  }

  /**
     * Create a new user
     * @param req
     * @param res
     * @returns response
     */
  createUser = async (req: Request, res: Response): Promise<Response> => {
    const {
      username,
      email,
      password
    }: {
      username: string
      email: string
      password: string
    } = req.body

    const response = await UserService.createUser({
      username,
      email,
      password
    })

    if (response === null) {
      return responses.error(404, 'Not Found', res)
    }

    const userId = response.raw.insertId

    return responses.success(
      201,
      'created',
      { userId, username, email },
      res
    )
  }

  /**
     * Update one user
     * @param req
     * @param res
     * @returns response
     */
  updateUser = async (req: Request, res: Response): Promise<Response> => {
    const {
      username,
      email,
      password
    }: {
      username: string
      email: string
      password: string
    } = req.body

    const { userId } = req.params

    const response = await UserService.updateUser(parseInt(userId), {
      username,
      email,
      password
    })

    if (response === null) {
      return responses.error(404, 'Not Found', res)
    }

    return responses.success(
      200,
      'success',
      { userId, username, email },
      res
    )
  }

  /**
     * Update one user
     * @param req
     * @param res
     * @returns response
     */
  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params

    const response = await UserService.deleteUser(parseInt(userId))

    if (response === null) {
      return responses.error(404, 'Not Found', res)
    }

    return responses.ok(200, 'success', res)
  }
}

export default UserControllers
