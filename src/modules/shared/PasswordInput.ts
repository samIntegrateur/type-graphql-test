import { Length } from "class-validator";
import { ClassType, Field, InputType } from 'type-graphql';

// This is a trick to be able to extend multiple Inputs (see usage in RegisterInput)
export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {

    @InputType({ isAbstract: true}) // needed to avoid error
    class PasswordInput extends BaseClass {

        @Field()
        @Length(6, 15)
        password: string;
    }
    return PasswordInput;
}
