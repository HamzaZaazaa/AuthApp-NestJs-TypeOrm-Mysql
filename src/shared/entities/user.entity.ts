import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';


@Entity()
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
}