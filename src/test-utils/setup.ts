import { testCnx } from './testCnx';

// at the beginning of the test, we drop the database with (true arg)
testCnx(true).then(() => process.exit());
