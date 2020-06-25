import { ClassType, Field, InputType } from "type-graphql";

// This is a trick to be able to extend multiple Inputs (see usage in RegisterInput)
export const OkMixin = <T extends ClassType>(BaseClass: T) => {
    @InputType()
    class OkInput extends BaseClass {
        @Field()
        ok: boolean;
    }
    return OkInput;
};
