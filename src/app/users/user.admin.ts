import { AdminEntity } from 'nestjs-admin';
import { User } from './user.entity';

export class UserAdmin extends AdminEntity {
  entity = User;
  listDisplay = ['id', 'email', 'username'];
  searchFields = ['email', 'username'];
}
