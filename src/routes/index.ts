import { type Request, type Response, type Application } from 'express'
import Controllers from '../controllers'
import responses from '../utils/response'
import { authorize } from '../middlewares/auth.middleware'
import { Role } from '../utils/enums'

const { PostController, UserController } = Controllers

class Routes {
  public router = (app: Application): void => {
    /**
     * @swagger
     * /:
     *   get:
     *     summary: Welcome to the API
     *     requestParameters:
     *       required: false
     *     responses:
     *       '200':
     *         message: Welcome
     *       '404':
     *         description: resource not found
     */
    app.get('/', (req: Request, res: Response) => {
      responses.ok(200, 'Welcome', res)
    })

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Fetch a list of all users and count
     *     requestParameters:
     *       required: false
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *          application/json:
     *         schema:
     *          type: object
     *         properties:
     *           count:
     *             type: integer
     *           data:
     *             type: array
     *       '404':
     *         description: Users Not Found
     */
    app.get('/users', UserController.fetchAllUsers)
    /**
     * @swagger
     * /users/:userId:
     *   get:
     *     summary: Find one User given their userId
     * @param req
     * @param res
     * @returns response
     */
    app.get('/users/:userId', UserController.findOneUser)
    /**
     * @swagger
     * /login:
     *   post:
     *     summary: Login a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *               token:
     *                 type: string
     *     responses:
     *       '200':
     *         description: logged in successfully
     *       '401':
     *         description: Invalid Credentials
     */
    app.post('/login', UserController.login)

    /**
     * @swagger
     * /user:
     *   post:
     *     summary: Create a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *               email:
     *                 type: string
     *     responses:
     *       '201':
     *         description: User created successfully
     *         content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                username:
     *                  type: string
     *                userId:
     *                  type: integer
     *                email:
     *                 type: string
     *       '500':
     *         description: An error occurred while creating the user
     */
    app.post('/user', UserController.createUser)
    /**
     * @swagger
     * /user/:userId:
     *   put:
     *     summary: Update an existing user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *               email:
     *                 type: string
     *     responses:
     *       '200':
     *         description: User Info successfully updated
     *         content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                username:
     *                  type: string
     *                userId:
     *                  type: integer
     *                email:
     *                 type: string
     *       '500':
     *         description: An error occurred while registering the user
     */
    app.put('/user/:userId', UserController.updateUser)
    /**
     * @swagger
     * /user/:userId:
     *   delete:
     *     summary: Remove an existing user
     *     requestParameter:
     *       required: true
     *       properties:
     *           userId:
     *             type: integer
     *     responses:
     *       '200':
     *         description: User removed successfully
     *       '500':
     *         description: Error while attempting to remove user
     */
    app.delete('/user/:userId', authorize(Role.ADMIN), UserController.deleteUser)
    /**
     * @swagger
     * /posts:
     *   get:
     *     summary: Find all posts on the platform (bad idea)
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                count:
     *                  type: integer
     *                data:
     *                  type: array
     *       '404':
     *         description: resource not found
     */
    app.get('/posts', PostController.fetchAllPosts)
    /**
     * @swagger
     * /posts/:postId:
     *   get:
     *     summary: Find one post by postId
     *     requestParameter:
     *        required: true
     *        properties:
     *            postId:
     *             type: integer
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  postId:
     *                    type: integer
     *                  title:
     *                    type: string
     *                  description:
     *                   type: string
     *       '404':
     *         description: Post Not Found
     */
    app.get('/posts/:postId', PostController.findOnePost)
    /**
     * @swagger
     * /post:
     *   post:
     *     summary: Create a new post
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               description:
     *                 type: string
     *     responses:
     *       '201':
     *         description: Post created successfully
     *         content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 properties:
     *                    postId:
     *                      type: integer
     *                    title:
     *                      type: string
     *                    description:
     *                      type: string
     *         '500':
     *               description: An error occurred while creating post
     */
    app.post('/post', authorize(Role.USER), PostController.createPost)
    /**
     * @swagger
     * /post/:postId:
     *   put:
     *     summary: Update a post by postId
     *     requestParameter:
     *       required: true
     *       properties:
     *          postId:
     *            type: integer
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *            application/json:
     *            schema:
     *              type: object
     *            properties:
     *                postId:
     *                 type: integer
     *                title:
     *                 type: string
     *                description:
     *                 type: string
     *       '403':
     *          description: Cannot Update this Post
     */
    app.put('/post/:postId', authorize(Role.USER), PostController.updatePost)
    /**
     * @swagger
     * /post/:postId:
     *   delete:
     *     summary: Create a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *               email:
     *                 type: string
     *     responses:
     *       '200':
     *         description: success
     *       '403':
     *         description: Cannot Delete this Post
     */
    app.delete('/post/:postId', authorize(Role.USER), PostController.deletePost)

    // app.all('*', (req: Request, res: Response) => {
    //   responses.ok(404, 'Not Found', res)
    // })
  }
}

export const route = new Routes().router
