import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class userEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    Name: String

    @Column()
    lastName: String

    @Column()
    birthdate: Date

    @Column({ unique: true })
    email: String

    @Column()
    password: String

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
}