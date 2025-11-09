import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import type { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserRegisterDto } from '../dtos/user.register.dto';
import { UserRegisteredEvent } from '../events/user.register.event';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  /**
   * Register user use case
   * @param dto - User register dto
   * @returns {Promise<User>} - User
   */
  async execute(dto: UserRegisterDto): Promise<User> {
    const user = await this.userRepo.findByEmail(dto.email);
    if (user) {
      throw new Error('User already exists');
    }
    const userCreated = await this.userRepo.save(dto);
    this.eventBus.publish(new UserRegisteredEvent(userCreated.email));
    return userCreated;
  }
}
