import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../infrastructure/repositories/auth.repository';
import { AuthLoginDto } from '../dtos/auth.login.dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly authService: AuthService,
  ) {}

  /**
   * Login use case
   * @param dto - Login dto
   * @returns {Promise<{ accessToken: string; refreshToken: string }>} - Login response
   */
  async execute(
    dto: AuthLoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.authRepo.findByEmail(dto.email);
    if (!user) {
      throw new Error('User not found');
    }
    const token = await this.authService.generateToken(
      {
        id: user.id,
        sub: user.email,
        role: user.role,
      },
      'access',
    );
    const refreshToken = await this.authService.generateToken(
      {
        id: user.id,
        sub: user.email,
        role: user.role,
      },
      'refresh',
    );
    return {
      accessToken: token,
      refreshToken: refreshToken,
    };
  }
}
