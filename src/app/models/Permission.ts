import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { User } from './User';

@Entity('permissions')
export class Permission {
  // Properties
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  name!: string;

  // Relationships
  @ManyToMany(() => User, (user) => user.permissions)
  @JoinTable({
    name: 'user_permission',
    joinColumns: [{ name: 'permission_id' }],
    inverseJoinColumns: [{ name: 'user_id' }]
  })
  users!: User[];
}
