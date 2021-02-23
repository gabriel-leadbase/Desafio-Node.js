import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

@Entity('user_permission')
export class UserPermission {
  // Properties
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'user_id' })
  userId!: string;

  @Column({ type: 'varchar', name: 'permission_id' })
  permissionId!: string;

  // Hooks
  @BeforeInsert()
  generateUuid() {
    this.id = uuidv4();
  }
}
