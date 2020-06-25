import { Ctx, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../types/MyContext';

@Resolver()
export class LogoutResolver {

    @Mutation(() => Boolean)
    async logout(
        @Ctx() ctx: MyContext
    ): Promise<Boolean> {
        console.log('logout');
        return new Promise(
            (res, rej) => ctx.req.session!.destroy((err) => {
                if (err) {
                    console.log('err', err);
                    return rej(false);
                }

                console.log('session has been destroyed');
                ctx.res.clearCookie('qid');


                console.log('cookie has been destroyed');

                return res(true);
            })
        );
    }
}
