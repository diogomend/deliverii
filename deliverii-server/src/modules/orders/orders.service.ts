import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ValidateCurrentStatus } from '../../helpers/orders';
import { Order } from '../../types/order';
import { CreateRestaurantDTO, UpdateRestaurantDTO, BlacklistUserDTO, CreateRestaurantMealDTO } from '../../dtos/restaurant';
import { MealService } from '../meals/meals.service';
import { CreateOrderDTO, ChangeOrderStatusDTO } from '../../dtos/order';
import { User } from '../../types/user';
import { validateID } from '../../helpers/validators';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private orderModel: Model<Order>,
    @Inject('MealService') private mealService: MealService,
    @Inject('RestaurantsService') private restaurantsService: RestaurantsService
  ) {}

  async create(user: User, createDTO: CreateOrderDTO) {
    const { restaurantID, address, meals } = createDTO;

    if (! await this.restaurantsService.validateRestaurantAccess(restaurantID, user)) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    if (! await this.mealService.validateMealsForSameRestaurant(meals, restaurantID)) {
      throw new HttpException('Invalid products', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const createOrder = {
      customer: user.id,
      meals,
      totalPrice: 0,
      address,
      status: 'Placed',
      historyStatus: [{"status": "Placed"}],
      restaurant: restaurantID
    };
    
    const { _id } = await this.orderModel.create(createOrder);

    let order = await this.orderModel
      .findById(_id)
      .populate('meals.meal');

    const totalPrice = order.meals.reduce((acc, mealObj) => {
        const price = mealObj.meal.price * mealObj.quantity;
        return acc + price;
      }, 0);

    await order.updateOne({ totalPrice });

    order = await this.orderModel
      .findById(_id)
      .populate('meals.meal');
    return order;
  }

  async getAll(user: User) {
    if (user.isManager) {
      const restaurantList = await this.restaurantsService.listRestaurants(user);
      const ids = restaurantList.map(restaurant => restaurant._id);

      return await this.orderModel.find({
        'restaurant': { $in: ids}
      }).sort({created: -1});
    }

    return this.orderModel.find({
      customer: user.id
    }).sort({created: -1})
  }

  async get(user: User, orderID: string): Promise<Order> {
    validateID(orderID);

    const order = await this.orderModel
    .findOne({"_id": orderID})
    .populate('meals.meal')
    .populate('restaurant');

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    await this.validateUserAccessToOrder(user, order);

    return order;
  }

  async changeStatus(user: User, orderID: string, changeStatusDTO: ChangeOrderStatusDTO): Promise<Order> {
    const order = await this.get(user, orderID);
    const { status: oldStatus } = order;
    const { status: newStatus } = changeStatusDTO;
    
    if (!ValidateCurrentStatus(user.isManager, newStatus, oldStatus)) {
      throw new HttpException(`Cant change status to ${newStatus}`, HttpStatus.FORBIDDEN);
    }

    await order.update(changeStatusDTO);
    return await this.get(user, orderID);
  }

  async validateUserAccessToOrder(user: User, order: Order) {
    if (user.isManager) {
      if (! await this.restaurantsService.validateRestaurantAccess(order.restaurant['id'], user)) {
        throw new HttpException('Restaurant not found', HttpStatus.FORBIDDEN);
      }

      return true;
    }

    if (order.customer != user.id) {
      throw new HttpException('Order not found', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}