import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne, OneToMany} from 'typeorm'
import user from './user';

@Entity('permissions')
class permission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(type => user, user => user) @JoinColumn()
    user: user; 
}


export default permission;  