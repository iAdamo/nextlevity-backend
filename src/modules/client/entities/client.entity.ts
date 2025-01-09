import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Marketer } from '@entities/marketer.entity';
import { Role } from 'src/common/enums/role.enum';
import * as bcrypt from 'bcrypt';

interface ClientConstructor {
  name: string;
  email: string;
  phone: string;
  password: string;
  marketer: Marketer | null;
}

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: '' })
  phone!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Client,
  })
  role!: Role;

  @ManyToOne(() => Marketer, (marketer) => marketer.clients)
  marketer!: Marketer | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
