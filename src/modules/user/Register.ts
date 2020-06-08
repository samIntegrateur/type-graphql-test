import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entity/User';

@Resolver(User)
export class RegisterResolver {

    @Query(() => String) // name overwrite the one below
    async hello() {
        // fake async in this example
        return "Hello world";
    }

    @FieldResolver()
    async name(@Root() parent: User) {
        return `${parent.firstName} ${parent.lastName}`
    }

    @Mutation(() => User) // the graphql schema type
    async register(
        @Arg('firstName') firstName: string, // inside @Arg is the name in the graphql schema
        @Arg('lastName') lastName: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
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
