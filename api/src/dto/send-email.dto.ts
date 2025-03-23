import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SendEmailDto {
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string
}
