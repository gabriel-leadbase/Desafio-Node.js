import {
  Entity,
  Column,
  BeforeInsert,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
import Hash from '../services/Hash';

@Entity('users')
export class User {
  // Properties
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  name!: string;

  @Column('varchar')
  cpf!: string;

  @Column('varchar')
  password!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date;

  // Hooks
  @BeforeInsert()
  generateUuid() {
    this.id = uuidv4();
  }

  @BeforeInsert()
  createDates() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  updateDates() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  async generateHash() {
    this.password = await Hash.generate(this.password);
  }
}
