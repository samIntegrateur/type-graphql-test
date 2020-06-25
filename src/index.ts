import  { ApolloServer} from 'apollo-server-express';
import Express  from 'express';
import { buildSchema } from 'type-graphql';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from './redis';
import cors from 'cors';

const main = async () => {

    await createConnection();

    const schema = await buildSchema({
        resolvers: [__dirname + '/modules/**/*.ts'], // avoid importing one by one
        authChecker: ({ context: {req} }) => {
            // here we can read the user from context
            // and check his permission in the db against the `roles` argument
            // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

           return !!req.session.userId;
        }
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({req, res}) => ({req, res}), // access to express request in our resolvers
    });

    const app = Express();

    const RedisStore = connectRedis(session);

    app.use(cors({
        credentials: true,
        origin: 'http://localhost:3000'
    }))

    app.use(
        session({
            store: new RedisStore({
                client: redis
            }),
            name: "qid",
            secret: "secretShouldNotBeHardCoded",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
            },
        })
    );


    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server started on http://localhost:4000/graphql');
    });
};

main();
