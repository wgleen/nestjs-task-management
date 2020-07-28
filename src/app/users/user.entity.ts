import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany
} from 'typeorm';
import { Task } from '../tasks/task.entity';
import { UserRoles } from './enums/user-roles.enum';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ default: UserRoles.USER })
  role: string;

  @OneToMany(() => Task, task => task.user, { eager: true })
  tasks: Task[];

  isAdmin(): boolean {
    return this.role === UserRoles.ADMIN
  }
}
