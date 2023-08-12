import Post, { type IPost } from '../models/post.model'
import UserServices from '../services/user.service'
import { logger } from '../utils/logger'
import { type DeleteResult, type InsertResult, type UpdateResult } from 'typeorm'
const UserService = new UserServices()

class PostServices {
  /**
     * Find all posts
     * @async
     * @returns Promise
     */
  fetchAllPosts = async (): Promise<[Post[], number]> => {
    return await Post.findAndCount()
  }

  /**
     * Find one post
     * @param {number} postId
     * @returns Promise
     */
  findOnePost = async (postId: number): Promise<Post | null> => {
    const result = await Post.findOneBy({ postId })

    if (result === null) {
      logger.error(`cannot find post with id ${postId}`)
      return null
    }
    return result
  }

  /**
     * Create a new post
     * @param {IPost} post
     * @returns Promise
     */
  createPost = async (post: IPost): Promise<InsertResult> => {
    const publisher = await UserService.findOneUser(post.publisherId)

    return await Post.insert({
      title: post.title,
      description: post.description,
      publisher
    })
  }

  /**
     * Update a post by Id
     * @param {number} postId
     * @param {IPost} post
     * @returns Promise
     */
  updatePost = async (postId: number, post: IPost): Promise<UpdateResult> => {
    return await Post.update(postId, post)
  }

  /**
     * Delete a post by Id
     * @param {number} postId
     * @returns Promise
     */
  deletePost = async (postId: number): Promise<DeleteResult> => {
    return await Post.delete({ postId })
  }

  /**
     * Validate a post's Publisher
     * @param {number} publisherId
     * @param {number} postId
     * @returns Promise
     */
  validatePostPublisher = async (publisherId: number, postId: number): Promise<boolean> => {
    const publisher = (await Post.findOneBy({ postId }))?.publisher
    return publisher?.userId === publisherId
  }
}

export default PostServices
