import { testCnx } from '../../../test-utils/testCnx';
import { Connection } from 'typeorm';
import { gCall } from '../../../test-utils/gCall';
import * as faker from 'faker';
import { User } from '../../../entity/User';

let cnx: Connection;

beforeAll(async () => {
    cnx = await testCnx();
})
afterAll(async () => {
    await cnx.close();
})

const meQuery = `
    {
        me {
            id
            firstName
            lastName
            email
        }
    }
`;

describe('Me', () => {
    it("get user", async () => {

        const user = await User.create({
            email: faker.internet.email(),
            password: faker.internet.password(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
        }).save();

        const response = await gCall({
            source: meQuery,
            userId: user.id,
        });

        // console.log('response', response);

        expect(response).toMatchObject({
            data: {
                me: {
                    id: `${user.id}`,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    email: user.email,
                }
            }
        })

    });

    it("return null if userId is not provided", async () => {
        const response = await gCall({
            source: meQuery,
        });

        expect(response).toMatchObject({
            data: {
                me: null
            }
        })
    });
})
