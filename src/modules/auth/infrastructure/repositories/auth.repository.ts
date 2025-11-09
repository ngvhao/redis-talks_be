import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { Repository } from 'typeorm';
import type { IAuthRepository } from '../../domain/repositories/auth.repository.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  /**
   * Find by email
   * @param _email - Email
   * @returns {Promise<User | null>} - User
   */
  async findByEmail(_email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email: _email } });
  }
}
