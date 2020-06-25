import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { redis } from '../../redis';
import { User } from '../../entity/User';
import { forgotPasswordPrefix } from '../constants/redisPrefixes';
import { ChangePasswordInput } from './changePassword/ChangePasswordInput';
import { MyContext } from '../../types/MyContext';

@Resolver()
export class ChangePasswordResolver {

    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg('data') { token, password }: ChangePasswordInput,
        @Ctx() ctx: MyContext,
    ): Promise<User | null> {
        const userId = await redis.get(forgotPasswordPrefix + token);

        if (!userId) {
            console.log('Invalid token');
            return null;
        }

        const user = await User.findOne(userId);

        if (!user) {
            console.log('Invalid user');
            return null;
        }

        await redis.del(forgotPasswordPrefix + token);

        user.password = await bcrypt.hash(password, 12);

        await user.save();

        // login when it's done
        ctx.req.session!.userId = user.id;

        return user;
    }
}
