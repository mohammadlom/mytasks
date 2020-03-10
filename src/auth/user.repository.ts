import { Repository, EntityRepository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from "./types/user.entity";
import { SignUpInput } from "./inputs/signup.input";
import { InternalServerErrorException } from "@nestjs/common";
import { SignInType } from "./types/signin.type";
import { SignInInput } from "./inputs/signin.input";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async signup(authCredentialsDto: SignUpInput): Promise<SignInType> {
        const { email, password, fullName, mobile } = authCredentialsDto;

        const user = new User();
        user.fullName = fullName;
        user.mobile = mobile;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
            return {
                email: user.email,
                message: "You'r registeration was successfull, check your mail box for activation email",
                token: null
            };
        } catch (error) {
            throw new InternalServerErrorException("Something went wrong, try again later");
        }
    }

    async validateUserPassword(authCredential: SignInInput): Promise<string> {
        const { email, password } = authCredential;
        const user = await this.findOne({ email });

        if (user && await user.validatePassword(password)) {
            return user.email;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}