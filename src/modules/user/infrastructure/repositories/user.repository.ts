import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { UserRegisterDto } from '../../application/dtos/user.register.dto';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
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

  /**
   * Save user
   * @param _dto - User register dto
   * @returns {Promise<User | null>} - User
   */
  async save(_dto: UserRegisterDto): Promise<User | null> {
    return this.repository.save(_dto);
  }
}
