
import { Controller, Post, Body, Get, UseGuards, HttpCode, Put, Param, Delete, HttpStatus, HttpException, Inject } from '@nestjs/common';
import { ApiUnauthorizedResponse, ApiOkResponse, ApiTags, ApiBearerAuth, ApiOperation, ApiNoContentResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ManagerGuard } from '../../guards/manager.guard';
import { User } from '../../helpers/user.decorator';
import { User as UserDocument } from '../../types/user';
import { CreateRestaurantDTO, UpdateRestaurantDTO, BlacklistUserDTO, CreateRestaurantMealDTO } from '../../dtos/restaurant';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from 'src/types/restaurant';
import { Meal } from 'src/types/meal';
import { MealService } from '../meals/meals.service';

@Controller('restaurants')
@ApiTags('Restaurants')
export class RestaurantsController {
    constructor(private restaurantService: RestaurantsService, @Inject('MealService') private mealService: MealService ) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Returns list of Restaurants'})
  @ApiOperation({ summary: 'Fetch a list of restaurants' })
  async findAll(@User() user: UserDocument) {
    return this.restaurantService.listRestaurants(user);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'Invalid fields' })
  @ApiOperation({ summary: 'Create a restaurant from manager account' })
  @ApiCreatedResponse({ description: 'Restaurant added successfully' })
  async createRestaurant(@Body() restaurantDTO: CreateRestaurantDTO, @User() { id }: UserDocument): Promise<Restaurant> {
    return this.restaurantService.createRestaurant(restaurantDTO, id);
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'), ManagerGuard)

  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Fields change OK'})
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiNotFoundResponse({ description: 'Restaurant not found for this manager' })
  @ApiBadRequestResponse({ description: 'Invalid fields' })
  @ApiOperation({ summary: 'Edit restaurant' })
  async editRestaurant(
    @User() user: UserDocument,
    @Param('id') restaurantID: string,
    @Body() restaurantDTO: UpdateRestaurantDTO,
  ): Promise<Restaurant> {
    if (! await this.restaurantService.validateRestaurantAccess(restaurantID, user)) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    return this.restaurantService.update(restaurantID, restaurantDTO);
  }


  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'), ManagerGuard)

  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Restaurant Deleted'})
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiNotFoundResponse({ description: 'Restaurant not found for this manager' })
  @ApiOperation({ summary: 'Delete restaurant' })
  async deleteRestaurant(
    @User() user: UserDocument,
    @Param('id') restaurantID: string
  ) {
    if (! await this.restaurantService.validateRestaurantAccess(restaurantID, user)) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    return this.restaurantService.delete(restaurantID);
  }

  @Post(':id/blacklist')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'), ManagerGuard)

  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Added User to blacklist'})
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiNotFoundResponse({ description: 'Restaurant not found for this manager' })
  @ApiOperation({ summary: 'Add user to blacklist' })
  async blacklistUser (
    @User() user: UserDocument,
    @Param('id') restaurantID: string,
    @Body() blacklistUserDTO: BlacklistUserDTO
  ) {
    if (! await this.restaurantService.validateRestaurantAccess(restaurantID, user)) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    return this.restaurantService.blacklist(restaurantID, blacklistUserDTO);
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))

  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Get Restaurant Information'})
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiNotFoundResponse({ description: 'Restaurant not found' })
  @ApiOperation({ summary: 'Get restaurant' })
  async getRestaurant(
    @User() user: UserDocument,
    @Param('id') restaurantID: string
  ) {
    if (! await this.restaurantService.validateRestaurantAccess(restaurantID, user)) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }
    return await this.restaurantService.get(restaurantID);
  }

  @Post(':id/meals')
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'), ManagerGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Meal Created for restaurant'})
  @ApiForbiddenResponse({ description: 'Manager does not have access to the restaurant'})
  @ApiOperation({ summary: 'Create meal for restaurant' })
  async createMeal(
    @Body() mealDTO: CreateRestaurantMealDTO, 
    @Param('id') restaurantID: string,
    @User() user: UserDocument
  ) {
    if (! await this.restaurantService.validateRestaurantAccess(restaurantID, user)) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    return this.mealService.createMeal(restaurantID, mealDTO);
  }

  @Get(':id/meals')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Retrieves a list of meals'})
  @ApiNotFoundResponse({ description: 'Restaurant not found'})
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiOperation({ summary: 'List all meals for this restaurant' })
  async listMeals(
    @Param('id') restaurantID: string,
    @User() user: UserDocument
  ): Promise<Meal[]> {
    if (! await this.restaurantService.validateRestaurantAccess(restaurantID, user)) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    return this.mealService.getMealsFromRestaurant(restaurantID);
  }

  @Put(':id/meals/:meal')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'), ManagerGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Product updated successfully'})
  @ApiNotFoundResponse({ description: 'Product not found'})
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'Invalid fields' })
  @ApiOperation({ summary: 'Update meal of restaurant' })
  async editMeal(
    @Param('id') restaurantID: string,
    @Param('meal') meal: string,
    @User() user: UserDocument,
    @Body() mealDTO: CreateRestaurantMealDTO, 
  ) {
    if (! await this.restaurantService.validateRestaurantAccess(restaurantID, user)) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    return this.mealService.update(meal, mealDTO);
  }
  
}
