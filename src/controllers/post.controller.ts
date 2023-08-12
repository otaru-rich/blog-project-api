import { type Request, type Response } from 'express'
import responses from '../utils/response'

import Service from '../services'

const { PostService } = Service

class PostControllers {
  /**
     * Find all posts
     * @param req
     * @param res
     * @returns response
     */
  fetchAllPosts = async (req: Request, res: Response): Promise<Response> => {
    const response = await PostService.fetchAllPosts()
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
     * Find one post
     * @param req
     * @param res
     * @returns response
     */
  findOnePost = async (req: Request, res: Response): Promise<Response> => {
    const { postId } = req.params

    const response = await PostService.findOnePost(parseInt(postId))

    if (response === null) {
      return responses.error(404, 'Post Not Found', res)
    }

    return responses.success(200, 'success', response, res)
  }

  /**
     * Create a new post
     * @param req
     * @param res
     * @returns response
     */
  createPost = async (req: Request, res: Response): Promise<Response> => {
    const { title, description }: {
      userId: string
      title: string
      description: string
    } = req.body

    const { userId } = req.body.verified

    const response = await PostService.createPost({
      publisherId: userId,
      title,
      description
    })

    const postId = response.raw?.insertId

    return responses.success(
      201,
      'Post created successfully',
      { postId, title, description },
      res
    )
  }

  /**
     * Update one post
     * @param req
     * @param res
     * @returns response
     */
  updatePost = async (req: Request, res: Response): Promise<Response> => {
    const { title, description }: {
      title: string
      description: string
    } = req.body

    const { postId } = req.params
    const { userId } = req.body.verified

    const isValidPublisher = await PostService.validatePostPublisher(parseInt(userId), parseInt(postId))
    if (!isValidPublisher) {
      return responses.error(403, 'Cannot Update this Post', res)
    }
    await PostService.updatePost(
      parseInt(postId),
      {
        publisherId: parseInt(userId),
        title,
        description
      })
    return responses.success(
      200,
      'success',
      { postId, title, description },
      res
    )
  }

  /**
     * delete one post
     * @param req
     * @param res
     * @returns response
     */
  deletePost = async (req: Request, res: Response): Promise<Response> => {
    const { postId } = req.params
    const { userId } = req.body.verified
    const isValidPublisher = await PostService.validatePostPublisher(parseInt(userId), parseInt(postId))
    if (!isValidPublisher) {
      return responses.error(403, 'Cannot Delete this Post', res)
    }
    const response = await PostService.deletePost(parseInt(postId))

    return responses.ok(200, 'success', res)
  }
}

export default PostControllers
