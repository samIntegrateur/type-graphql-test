import { testCnx } from '../../../test-utils/testCnx';
import { Connection } from 'typeorm';
import { gCall } from '../../../test-utils/gCall';

let cnx: Connection;

beforeAll(async () => {
    cnx = await testCnx();
})
afterAll(async () => {
    await cnx.close();
})

const registerMutation = `
    mutation {
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
        console.log(await gCall({
            source: registerMutation,
            variableValues: {
                data: {
                    email: "samdeb@test.com",
                    password: "111111",
                    firstName: "sam",
                    lastName: "desb",
                }
            }
        }));
    })
})
