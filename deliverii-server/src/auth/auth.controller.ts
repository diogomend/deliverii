import { AuthService } from './auth.service';
import { Controller, Post, Body, Get, UseGuards, HttpCode } from '@nestjs/common';
import { ApiUnauthorizedResponse, ApiNoContentResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../shared/user/user.service';
import { AuthRegisterDTO, AuthLoginDTO } from './../dtos/auth';
import { User } from './../helpers/user.decorator';
import { User as UserDocument } from '../types/user';
import { sanitizeUser, signJWT, getPayloadFromUser } from '../helpers/auth';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiUnauthorizedResponse({ description: 'Fields missing' })
  @ApiUnprocessableEntityResponse({ description: 'Invalid credentials'})
  async login(@Body() userDTO: AuthLoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload = getPayloadFromUser(user);
    const token = await this.authService.signPayload(payload);

    return { user, token };
  }

  @Post('register')
  @HttpCode(201)
  @ApiUnauthorizedResponse({ description: 'Fields missing' })
  @ApiUnprocessableEntityResponse({ description: 'Invalid credentials'})
  async register(@Body() userDTO: AuthRegisterDTO) {
    await this.userService.create(userDTO);
  }

  @Get('/ping')
  @UseGuards(AuthGuard('jwt'))
  async listMine(@User() user: UserDocument): Promise<any> {
    return { user };
  }
}


/**
 * import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDTO, AuthLoginDTO } from '../dtos/auth'
import { ApiUnauthorizedResponse, ApiNoContentResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { sanitizeUser, signJWT } from '../helpers/auth';
import { User } from '../helpers/user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('ping')
    @UseGuards(AuthGuard('jwt'))
    async userInfo(@User() user: any) {
        return { user: user };
    }



    @Post('login')
    @HttpCode(200)
    @ApiUnauthorizedResponse({ description: 'Fields missing' })
    @ApiUnprocessableEntityResponse({ description: 'Invalid credentials'})
    async login(@Body() loginDTO: AuthLoginDTO) {
        const user = sanitizeUser(await this.authService.login(loginDTO));
        const token = await signJWT(user);

        return { user, token };
    }

    @Post('register')
    @HttpCode(204)
    @ApiNoContentResponse({ description: 'User registered correctly'})
    @ApiUnauthorizedResponse({ description: 'Fields missing' })
    @ApiUnprocessableEntityResponse({ description: 'Email already exists'})
    @UsePipes(new ValidationPipe({ transform: true }))

    async register(@Body() registerDTO: AuthRegisterDTO) {
        await this.authService.register(registerDTO);
    }
}

 */