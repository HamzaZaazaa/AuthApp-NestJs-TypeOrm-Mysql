import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { commentEntity } from "./comment.entity";
import { userEntity } from "./user.entity";


@Entity('poster')
export class postEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    poster: string

    @Column()
    posterTitle: string

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

    @ManyToOne(() => userEntity, (user) => user.posts, { onDelete: 'CASCADE' })
    user: userEntity

    @OneToMany(() => commentEntity, (comment) => comment.post)
    comments: commentEntity[]
}