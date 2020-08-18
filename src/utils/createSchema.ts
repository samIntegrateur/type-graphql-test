import { buildSchema } from 'type-graphql';

export const createSchema = () => buildSchema({
    resolvers: [__dirname + '/../modules/*/*.ts'], // avoid importing one by one
    authChecker: ({ context: {req} }) => {
        // here we can read the user from context
        // and check his permission in the db against the `roles` argument
        // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

        return !!req.session.userId;
    }
});
