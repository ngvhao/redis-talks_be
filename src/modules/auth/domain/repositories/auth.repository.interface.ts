import type { User } from 'src/modules/user/domain/entities/user.entity';

export interface IAuthRepository {
  findByEmail(_email: string): Promise<User | null>;
}
