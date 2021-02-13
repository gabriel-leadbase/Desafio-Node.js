import { Entity, PrimaryGeneratedColumn, Column,  BeforeInsert, BeforeUpdate} from 'typeorm'
import * as bcrypt from 'bcrypt'

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
}


export default user;