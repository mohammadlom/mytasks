import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from './user.repository';
import { SignUpInput } from './inputs/signup.input';
import { SignInType } from './types/signin.type';
import { SignInInput } from './inputs/signin.input';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository,
        private jwtService: JwtService
    ) { }

    async signup(authCredentials: SignUpInput): Promise<SignInType> {
        return this.usersRepository.signup(authCredentials);
    }

    async signin(authCredentials: SignInInput): Promise<SignInType> {
        const userEmail = await this.usersRepository.validateUserPassword(authCredentials);

        if (!userEmail) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { userEmail };
        const accessToken = await this.jwtService.sign(payload);
        return { token: accessToken, email: userEmail, message: 'You\'re successfully logged in!' };
    }

    async getUsers() {
        return await this.usersRepository.find();
    }
}
