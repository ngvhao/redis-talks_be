import { User } from '../entities/user.entity';
import { UserRegisterDto } from '../../application/dtos/user.register.dto';

export interface IUserRepository {
  findByEmail(_email: string): Promise<User | null>;
  save(_dto: UserRegisterDto): Promise<User | null>;
}
