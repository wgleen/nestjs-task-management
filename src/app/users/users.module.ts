import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DefaultAdminModule,
  DefaultAdminSite
} from 'nestjs-admin';
import { UserAdmin } from './user.admin';
import { UserRepository } from './user.repository';
import { UsersServiceV1 } from './v1/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    DefaultAdminModule
  ],
  controllers: [],
  providers: [UsersServiceV1],
  exports: [
    UsersServiceV1,
    TypeOrmModule
  ]
})
export class UsersModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    adminSite.register('User', UserAdmin)
  }
}
