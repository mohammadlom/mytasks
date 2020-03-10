import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersRepository } from './user.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,

      }
    }),
    TypeOrmModule.forFeature([UsersRepository])
  ],
  providers: [AuthResolver, AuthService],
  exports: [TypeOrmModule]
})
export class AuthModule { }
