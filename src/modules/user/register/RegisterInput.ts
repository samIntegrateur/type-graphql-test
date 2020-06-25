import { IsEmail, Length } from "class-validator";
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from './isEmailAlreadyExist';
import { PasswordMixin } from '../../shared/PasswordInput';

@InputType()
export class RegisterInput extends PasswordMixin(class {}) {
    @Field()
    @Length(3, 255, { message: 'Le prénom doit comporter entre 3 et 255 caractères'})
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({ message: "l'email est déjà pris" })
    email: string;
}
