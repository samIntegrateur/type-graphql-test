import { Arg, Mutation, Resolver } from 'type-graphql';
import { sendEmail } from '../utils/sendEmail';
import { v4 } from 'uuid';
import { redis } from '../../redis';
import { User } from '../../entity/User';
import { forgotPasswordPrefix } from '../constants/redisPrefixes';

@Resolver()
export class ForgotPasswordResolver {

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
    ): Promise<boolean> {
        const user = await User.findOne({ where: { email }});

        if (!user) {
            console.log('user does not exists');
            return true;
        }

        const token = v4();

        // we could use jwt but redis allows us to handle expiration automatically
        await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24); // 1 day expiration

        await sendEmail(email, `http://localhost:3000/user/change-password/${token}`);

        console.log('forget password email sent');

        return true;
    }
}
