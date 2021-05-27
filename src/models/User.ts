import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { UserRole } from '../DTO/UserDTO';
import bcrypt from 'bcryptjs';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    nullable: true,
    enum: UserRole,
    default: UserRole.SELLER
  })
  role: UserRole;

  @Column({ default: false })
  isApproved: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  };
}

export default User