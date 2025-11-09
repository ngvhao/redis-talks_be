import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { UserRegisterDto } from 'src/modules/user/application/dtos/user.register.dto';
import { RegisterUserUseCase } from 'src/modules/user/application/use-cases/user.register.use-case';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { SuccessResponse } from 'src/shared/utils/response';
import { AuthLoginDto } from '../application/dtos/auth.login.dto';
import { AuthService } from '../application/services/auth.service';
import { LoginUseCase } from '../application/use-cases/auth.login.use-case';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly userRegisterUseCase: RegisterUserUseCase,
  ) {}

  /**
   * Login
   * @param dto - Login dto
   * @param res - Response
   */
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({
    type: AuthLoginDto,
    schema: { example: { email: 'test@test.com', password: 'password' } },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthLoginDto,
  })
  async login(@Body() dto: AuthLoginDto, @Res() res: Response) {
    const response = await this.loginUseCase.execute(dto);
    const { accessToken, refreshToken } = response;
    AuthService.setTokenCookies(res, accessToken, refreshToken);
    return new SuccessResponse({
      message: 'Login successful',
      data: accessToken,
    }).send(res);
  }

  /**
   * Register user
   * @param dto - User register dto
   * @param res - Response
   */
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({
    type: UserRegisterDto,
    schema: { example: { email: 'test@test.com', password: 'password' } },
  })
  @ApiResponse({
    status: 200,
    description: 'User registered successfully',
    type: User,
  })
  @Post('register')
  async register(@Body() dto: UserRegisterDto, @Res() res: Response) {
    const user = await this.userRegisterUseCase.execute(dto);
    return new SuccessResponse({
      message: 'User registered successfully',
      data: user,
    }).send(res);
  }
}
