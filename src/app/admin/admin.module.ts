import { Module } from '@nestjs/common';
import { AdminCoreModuleFactory, AdminAuthModuleFactory } from 'nestjs-admin';
import { AuthModule } from '../auth/auth.module';
import { adminCredentialValidator } from './admin.credential.validator';

const AdminCoreModule = AdminCoreModuleFactory.createAdminCoreModule({})
const AdminAuthModule = AdminAuthModuleFactory.createAdminAuthModule({
  adminCoreModule: AdminCoreModule,
  credentialValidator: adminCredentialValidator,
  imports: [AuthModule]
})

@Module({
  imports: [
    AdminCoreModule,
    AdminAuthModule
  ],
  exports: [
    AdminCoreModule,
    AdminAuthModule
  ]
})
export class AdminModule {}
