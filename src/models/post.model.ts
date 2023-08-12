import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Timestamp,
  UpdateDateColumn,
  CreateDateColumn, ManyToOne, JoinColumn
} from 'typeorm'
import User from './user.model'

@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    comment: 'The id of the Post',
    name: 'post_id'
  })
    postId!: number

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'publisher_id' })
    publisher!: User

  @Column({
    type: 'varchar',
    comment: 'Title of the Post',
    nullable: false
  })
    title!: string

  @Column({
    type: 'text',
    comment: 'Description of the Post',
    nullable: false
  })
    description!: string

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

export interface IPost {
  publisherId: number
  title: string
  description: string
}
export default Post
