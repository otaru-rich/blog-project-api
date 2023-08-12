import { type Request, type Response, type Application } from 'express'
import Controllers from '../controllers'
import responses from '../utils/response'
import { authorize } from '../middlewares/auth.middleware'
import { Role } from '../utils/enums'

const { PostController, UserController } = Controllers

class Routes {
  /**
     * @param app
     */
  public router = (app: Application): void => {
    app.get('/', (req: Request, res: Response) => {
      responses.ok(200, 'Welcome', res)
    })

    app.get('/users', UserController.findUsers)
    app.get('/users/:userId', UserController.findOneUser)
    app.post('/login', UserController.login)
    app.post('/user', UserController.createUser)
    app.put('/user/:userId', UserController.updateUser)
    app.delete('/user/:userId', authorize(Role.ADMIN), UserController.deleteUser)

    app.get('/posts', PostController.findPosts)
    app.get('/posts/:postId', PostController.findOnePost)
    app.post('/post', authorize(Role.USER), PostController.createPost)
    app.put('/post/:postId', authorize(Role.USER), PostController.updatePost)
    app.delete('/post/:postId', authorize(Role.USER), PostController.deletePost)

    app.all('*', (req: Request, res: Response) => {
      responses.ok(404, 'Not Found', res)
    })
  }
}

export const route = new Routes().router
