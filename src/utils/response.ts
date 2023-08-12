import { type Response } from 'express'

class Res {
  /**
     * @param status
     * @param message
     * @param data
     * @param res
     * @memberof Res
     * @returns
     */

  public success = (
    status: number,
    message: string,
    data: object,
    res: Response
  ) => {
    return res.status(status).json({ status, message, data })
  }

  /**
     * @param status
     * @param message
     * @param res
     * @memberof Res
     * @returns
     */
  public ok = (status: number, message: string, res: Response) => {
    return res.status(status).json({
      status,
      message
    })
  }

  /**
     * @param {number} status
     * @param {string} message
     * @param {string} res
     * @memberof Res
     * @returns
     */
  public error = (status: number, message: string, res: Response) => {
    return res.status(status).json({
      status,
      message
    })
  }
}
const responses = new Res()

export default responses
