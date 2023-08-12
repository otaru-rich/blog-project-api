import PostControllers from './post.controller'
import UserControllers from './user.controller'

const PostController = new PostControllers()
const UserController = new UserControllers()

const Controllers = {
  PostController,
  UserController
}

export default Controllers
