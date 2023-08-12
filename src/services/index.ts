import PostServices from './post.service'
import UserServices from './user.service'

const PostService = new PostServices()
const UserService = new UserServices()

const Service = {
  PostService,
  UserService
}

export default Service
