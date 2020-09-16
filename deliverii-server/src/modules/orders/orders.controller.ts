
import { Controller, Post, Body, Get, UseGuards, HttpCode, Put, Param, Delete, HttpStatus, HttpException, Inject, Patch } from '@nestjs/common';
import { ApiUnauthorizedResponse, ApiOkResponse, ApiTags, ApiBearerAuth, ApiOperation, ApiNoContentResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { User as UserDocument } from '../../types/user';
import { User } from '../../helpers/user.decorator';
import { CreateOrderDTO, ChangeOrderStatusDTO } from '../../dtos/order';
import { ClientGuard } from 'src/guards/client.guard';
import { Order } from 'src/types/order';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Post()
    @HttpCode(201)
    @UseGuards(AuthGuard('jwt'), ClientGuard)
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiBadRequestResponse({ description: 'Invalid fields' })
    @ApiNotFoundResponse({ description: 'Restaurant does not exist or user is blacklisted' })
    @ApiOperation({ summary: 'Create an order for user' })
    @ApiCreatedResponse({ description: 'Order created successfully' })
    async createOrder(
      @Body() createDTO: CreateOrderDTO,
      @User() user: UserDocument
    ) {
      return await this.ordersService.create(user, createDTO);
    }

    @Get()
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiBadRequestResponse({ description: 'Invalid fields' })
    @ApiOperation({ summary: 'Get orders from user or manager' })
    @ApiOkResponse({ description: 'List of orders from user or manager' })
    async getOrders(
      @User() user: UserDocument
    ): Promise<Order[]> {
      return await this.ordersService.getAll(user);
    }

    @Get(':id')
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiNotFoundResponse({ description: 'Order not found' })
    @ApiForbiddenResponse({ description: 'No access to order' })
    @ApiBadRequestResponse({ description: 'Invalid fields' })
    @ApiOperation({ summary: 'Get order' })
    @ApiOkResponse({ description: 'Get order' })
    async get(
      @User() user: UserDocument,
      @Param('id') orderID: string,
    ) {
      return await this.ordersService.get(user, orderID);
    }
    
    @Patch(':id')
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiBadRequestResponse({ description: 'Invalid fields' })
    @ApiNotFoundResponse({ description: 'Order not found' })
    @ApiForbiddenResponse({ description: 'No access to order' })
    @ApiUnprocessableEntityResponse({ description: 'Unable to change to given status' })
    @ApiOperation({ summary: 'Change order status' })
    @ApiOkResponse({ description: 'Change order status' })
    async updateStatus(
      @User() user: UserDocument,
      @Param('id') orderID: string,
      @Body() changeStatusDTO: ChangeOrderStatusDTO,
    ) {
      return await this.ordersService.changeStatus(user, orderID, changeStatusDTO);
    }
}
