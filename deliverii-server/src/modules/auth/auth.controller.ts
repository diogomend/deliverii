import { AuthService } from './auth.service';
import { Controller, Post, Body, Get, UseGuards, HttpCode } from '@nestjs/common';
import { ApiUnauthorizedResponse, ApiUnprocessableEntityResponse, ApiOkResponse, ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../shared/user/user.service';
import { AuthRegisterDTO, AuthLoginDTO } from '../../dtos/auth';
import { User } from '../../helpers/user.decorator';
import { User as UserDocument } from '../../types/user';
import { getPayloadFromUser } from '../../helpers/auth';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Returns User and token information'})
  @ApiUnauthorizedResponse({ description: 'Fields missing' })
  @ApiUnprocessableEntityResponse({ description: 'Invalid credentials'})
  @ApiOperation({ summary: 'Customer or Manager Login' })

  async login(@Body() userDTO: AuthLoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload = getPayloadFromUser(user);
    const token = await this.authService.signPayload(payload);

    return { user, token };
  }

  @Post('register')
  @HttpCode(201)
  @ApiCreatedResponse({description: 'User created successfully'})
  @ApiUnauthorizedResponse({ description: 'Fields missing' })
  @ApiUnprocessableEntityResponse({ description: 'Invalid credentials'})
  @ApiOperation({ summary: 'Customer or Manager register' })

  async register(@Body() userDTO: AuthRegisterDTO) {
    await this.userService.create(userDTO);
  }

  @Get('/ping')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({description: 'Returns user object'})
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiOperation({ summary: 'Retrieving user info' })

  async ping(@User() user: UserDocument): Promise<UserDocument> {
    return user;
  }
}
