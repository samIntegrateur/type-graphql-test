import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { redis } from '../../redis';
import { confirmUserPrefix } from '../constants/redisPrefixes';

@Resolver()
export class ConfirmUserResolver {

    @Mutation(() => Boolean)
    async confirmUser(
        @Arg('token') token: string,
    ): Promise<boolean> {

        const userId = await redis.get(token);

        if (!userId) {
            return false;
        }

        await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
        await redis.del(confirmUserPrefix + token);

        console.log('Email has been confirmed');

        return true;
    }
}
