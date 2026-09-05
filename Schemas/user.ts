import * as zod from "zod";

export const UserRegisterSchema = zod.object({
    email: zod.email("Received invalid email adress.").nonoptional(),
    password: zod.string("Password lenght must be greather than 8.").min(8).nonoptional(),
    name: zod.string("Received invalid name.").nonoptional()
});

export const UserLoginSchema = zod.object({
    email: zod.email("Received invalid email adress.").nonoptional(),
    password: zod.string("Password lenght must be greather than 8.").min(8).nonoptional()
});