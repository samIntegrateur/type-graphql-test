import { graphql, GraphQLSchema } from "graphql";
import { createSchema } from '../utils/createSchema';
import { Maybe } from 'type-graphql';

interface Options {
    source: string; // the query string
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
}

let schema: GraphQLSchema;

export const gCall = async ({
    source,
    variableValues
}: Options) => {

    if (!schema) {
        schema = await createSchema();
    }
    return graphql({
        schema,
        source,
        variableValues,
    })
}
