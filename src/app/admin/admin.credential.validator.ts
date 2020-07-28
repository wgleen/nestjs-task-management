import { User } from '../users/user.entity';
import { AuthServiceV1 } from '../auth/v1/auth.service';

export const adminCredentialValidator = {
  inject: [AuthServiceV1],
  useFactory: (authServiceV1: AuthServiceV1) => (
    async (
      email: string,
      password: string
    ): Promise<User> => {
      const user: User | null = await authServiceV1.validateUserCredentials({ email, password })

      if (!user) null

      return user;
    }
  )
}
