import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './types/user.entity';
import { SignInType } from './types/signin.type';
import { SignUpInput } from './inputs/signup.input';
import { SignInInput } from './inputs/signin.input';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Query(returns => [User], { nullable: true })
    async users() {
        return this.authService.getUsers();
    }

    @Mutation(returns => SignInType, { nullable: true })
    async signup(
        @Args('signUpInput') signUpInput: SignUpInput
    ) {
        return this.authService.signup(signUpInput);
    }

    @Mutation(returns => SignInType, { nullable: true })
    async signin(
        @Args('signInInput') singnInInput: SignInInput
    ) {
        return this.authService.signin(singnInInput);
    }

}
