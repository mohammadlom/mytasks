import { Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Query(returns => [User], { nullable: true })
    async users() {
        return this.authService.getUsers();
    }
}
