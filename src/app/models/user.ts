import { Entity, PrimaryGeneratedColumn, Column,  BeforeInsert, BeforeUpdate, OneToMany, JoinColumn} from 'typeorm'
import * as bcrypt from 'bcrypt'
import permission from './permission';

@Entity('users')
class user {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true})
    cpf: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @BeforeInsert()
    hashPassword()
    {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    @OneToMany(type => permission, permission => permission)
    @JoinColumn()
    permission: permission
}


export default user;