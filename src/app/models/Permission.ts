import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert
} from 'typeorm';
import { User } from './User';
import { v4 as uuidV4 } from 'uuid';

@Entity('permissions')
export class Permission {
  // Properties
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  name!: string;

  // Hooks
  @BeforeInsert()
  generateUuid() {
    this.id = uuidV4();
  }

  // Relationships
  @ManyToMany(() => User, (user) => user.permissions)
  @JoinTable({
    name: 'user_permission',
    joinColumns: [{ name: 'permission_id' }],
    inverseJoinColumns: [{ name: 'user_id' }]
  })
  users!: User[];
}
