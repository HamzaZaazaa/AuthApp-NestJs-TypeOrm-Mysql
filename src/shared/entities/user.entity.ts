import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { postEntity } from "./post.entity";
import { commentEntity } from "./comment.entity";
import { userRole } from "../enum/userRole.enum";


@Entity('users')
export class userEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    Name: string

    @Column()
    lastName: string

    @Column()
    birthdate: Date

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    passwordToken: string

    @Column({ nullable: true })
    passwordTokenExpiration: Date

    @Column({ default: false })
    iSActivate: boolean

    @Column('enum', { enum: userRole, default: "USER" })
    role: string


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


    @BeforeInsert()
    async generatePasswordHash(): Promise<any> {
        this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10))
    }

    @OneToMany(() => postEntity, (post) => post.user)
    posts: postEntity[]

    @OneToMany(() => commentEntity, (comment) => comment.user)
    comments: commentEntity[]

}