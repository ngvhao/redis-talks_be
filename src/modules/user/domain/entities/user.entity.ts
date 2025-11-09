import { ApiProperty } from '@nestjs/swagger';
import { EUserRole } from 'src/shared/enums/role.enum';
import { IEntity } from 'src/shared/interfaces/entity.inteface';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends IEntity {
  @ApiProperty({
    description: 'Email',
    example: 'test@test.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'password',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'Is active',
    example: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Is verified',
    example: true,
  })
  @Column({ default: false })
  isVerified: boolean;

  @ApiProperty({
    description: 'Refresh token',
    example: 'refresh-token',
  })
  @Column()
  refreshToken: string;

  @ApiProperty({
    description: 'Role',
    example: EUserRole.USER,
  })
  @Column({ default: EUserRole.USER })
  role: EUserRole;
}
