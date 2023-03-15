import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { postEntity } from "./post.entity";
import { userEntity } from "./user.entity";



@Entity('comments')
export class commentEntity {


    @PrimaryGeneratedColumn()
    id: number

    @Column()
    comment: string

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)'
    })
    createdAt: Date

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date

    @ManyToOne(() => userEntity, (user) => user.comments, { onDelete: 'CASCADE' })
    user: userEntity

    @ManyToOne(() => postEntity, (post) => post.comments, { onDelete: "CASCADE" })
    post: postEntity
}