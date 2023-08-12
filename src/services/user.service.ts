import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Role } from '../utils/enums'
import User, { type IUser } from '../models/user.model'
import * as dotenv from 'dotenv'
// This should not be stored in .env on a live server

dotenv.config()
const { JWT_PRIVATE_KEY, JWT_EXPIRY_TIME, SALT_ROUND } = process.env
const saltInteger = parseInt(SALT_ROUND??"10", 10)

class UserServices {
  /**
     * Find all users
     * @async
     * @returns Promise
     */
  findUsers = async (): Promise<any | null> => {
    const result = await User.findAndCount()

    if (!result) {
      return null
    }
    result[0].forEach((user: any) => {
      delete user.password
    })
    return result
  }

  /**
     * Find one user
     * @param {number} userId
     * @returns Promise
     */
  findOneUser = async (userId: number): Promise<any | null> => {
    const result = await User.findOneBy({ userId })

    if (result === null) {
      return null
    }
    result.password = '';
    return result
  }

  /**
     * Create a new user
     * @param user
     * @returns Promise
     */
  createUser = async (user: IUser): Promise<any | null> => {
    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, saltInteger)

    const result = await User.insert({
      ...user,
      role: Role.USER,
      password: hashedPassword
    })

    if (!result) {
      return null
    }
    return result
  }

  /**
     * Update a user by Id
     * @param {number} userId
     * @param {IUser} data
     * @returns Promise
     */
  updateUser = async (userId: number, data: IUser): Promise<any | null> => {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, saltInteger)
    }

    const result = await User.update(userId, data)

    if (!result) {
      return null
    }
    // delete result.password
    return result
  }

  /**
     * Delete a user by Id
     * @param {number} userId
     * @returns Promise
     */
  deleteUser = async (userId: number): Promise<unknown | null> => {
    const result = await User.delete({ userId })

    if (!result) {
      return null
    }
    return result
  }

  login = async (username: string, password: string): Promise<unknown | null> => {
    // Find the user by email
    const user = await User.findOneBy({ username })
    if (user == null) {
      return null
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return null
    }

    return await this.generateToken(user)
  }

  generateToken = async (user: User): Promise<string> => {
    // Generate a JWT token
    return jwt.sign({
      userId: user.userId,
      role: user.role
    }, JWT_PRIVATE_KEY??'secret',
    { expiresIn: JWT_EXPIRY_TIME })
  }
}

export default UserServices
