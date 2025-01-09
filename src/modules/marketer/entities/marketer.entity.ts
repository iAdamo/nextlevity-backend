import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Admin } from '@entities/admin.entity';
import { Client } from '@entities/client.entity';
import { Role } from 'src/common/enums/role.enum';
import * as bcrypt from 'bcrypt';

@Entity()
export class Marketer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Marketer,
  })
  role!: Role;

  @ManyToOne(() => Admin, (admin) => admin.marketers)
  admin!: Admin | null;

  @OneToMany(() => Client, (client) => client.marketer)
  clients!: Client[];

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
