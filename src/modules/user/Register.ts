import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class RegisterResolver {

    @Query(() => String) // name overwrite the one below
    async hello() {
        // fake async in this example
        return "Hello world";
    }

    @Mutation(() => User) // the graphql schema type
    async register(
        @Arg('data') {
            email,
            firstName,
            lastName,
            password,
        }: RegisterInput
    ): Promise<User> { // what we return from the resolver

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        }).save();

        return user;
    }
}
