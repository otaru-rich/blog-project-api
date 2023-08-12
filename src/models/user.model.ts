import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Timestamp,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm'

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    comment: 'The id of the user',
    name: 'user_id'
  })
    userId!: number

  @Column({
    type: 'varchar',
    comment: 'Username',
    nullable: false,
    name: 'username'
  })
    username!: string

  @Column({
    type: 'text',
    comment: 'Email address of User',
    nullable: false
  })
    email!: string

  @Column({
    type: 'text',
    comment: 'Encrypted password',
    nullable: false
  })
    password!: string

  @Column({
    type: 'text',
    comment: 'User Role',
    nullable: false
  })
    role!: string

  @CreateDateColumn({
    type: 'timestamp',
    comment: 'Creation data',
    default: Timestamp,
    nullable: false
  })
    created_on!: Date

  @UpdateDateColumn({
    type: 'timestamp',
    comment: 'Time of Update',
    default: Timestamp,
    nullable: false
  })
    updated_on!: Date
}

export interface IUser {
  userId?: number
  username: string
  email: string
  password: string
}
export default User
