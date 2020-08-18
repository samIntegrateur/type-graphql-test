import { createConnection } from 'typeorm';

export const testCnx = (drop: boolean = false) => {
    return createConnection({
        name: "default",
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "6t9uCX5H",
        database: "typegraphql-example-test",
        synchronize: drop,
        dropSchema: drop,
        entities: [__dirname + "/../entity/**/*.*"]
    });
};
