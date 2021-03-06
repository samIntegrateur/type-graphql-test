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

const registerMutation = `
    mutation Register($data: RegisterInput!) {
      register(
        data: $data
      ) {
        id
        firstName
        lastName
        email
        name
      }
    }
`;

describe('Register', () => {
    it("create user", async () => {

        const user = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
        };

        const response = await gCall({
            source: registerMutation,
            variableValues: {
                data: user
            }
        });

        // console.log('response', response);

        expect(response).toMatchObject({
            data: {
                register: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                }
            }
        })

        const dbUser = await User.findOne({ where: {email: user.email}});
        expect(dbUser).toBeDefined();
        expect(dbUser!.confirmed).toBeFalsy();
        expect(dbUser!.firstName).toBe(user.firstName);
    })
})
