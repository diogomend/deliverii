import { CreateOrderDTO} from '../../../src/dtos/order'

export const MockOrder = (mealID: string, restaurantID: string) : CreateOrderDTO => {
    return {
        "meals": [
          {
            "meal": mealID,
            "quantity": 1
          }
        ],
        "restaurantID": restaurantID,
        "address": {
          "addr1": "string",
          "addr2": "string",
          "city": "string",
          "postCode": "string"
        }
      };
}