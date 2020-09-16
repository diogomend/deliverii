import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/* istanbul ignore file */
export class AuthRegisterDTO {
    @IsNotEmpty()
    @ApiProperty({type: String})
    name: string;

    @IsNotEmpty()
    @ApiProperty({type: String})
    password: string;

    @IsEmail()
    @ApiProperty({type: String})
    email: string;

    @ApiProperty({type: Boolean, description: 'if user is manager'})
    isManager: boolean;
}

export class AuthLoginDTO {
    @IsEmail()
    @ApiProperty({type: String})
    email: string;

    @IsNotEmpty()
    @ApiProperty({type: String})
    password: string;

}