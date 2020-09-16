import { mock } from 'jest-mock-extended';
import { User } from 'src/types/user';
import { OrdersController } from '../../../../src/modules/orders/orders.controller';
import { OrdersService } from 'src/modules/orders/orders.service';
import { CreateOrderDTO, ChangeOrderStatusDTO } from 'src/dtos/order';

const createObj:CreateOrderDTO = {
    address: {addr1: 'MOCK', addr2: 'MOCK', city: 'MOCK', postCode: 'MOCK'},
    meals: [{meal: 'MOCK_MEAL', quantity: 2}],
    restaurantID: 'MOCK_ID'
};

const changeObj:ChangeOrderStatusDTO = {
    status: 'MOCK_STATE'
};


describe('Orders Controller', () => {
  let user = mock<User>();
  
  let mocked = mock<OrdersService>();
  it('should call order service on create', async () => {
    // @ts-ignore
    mocked.create = jest.fn(() => 'MOCK_RESPONSE');
    const controller = new OrdersController(mocked);

    expect(await controller.createOrder(createObj, user)).toEqual('MOCK_RESPONSE');
  });

    it('should call order service on get', async () => {
        // @ts-ignore
        mocked.get = jest.fn(() => 'MOCK_RESPONSE');
        const controller = new OrdersController(mocked);

        expect(await controller.get(user, 'MOCK_ID')).toEqual('MOCK_RESPONSE');
    });

    it('should call order service on getOrders', async () => {
        // @ts-ignore
        mocked.getAll = jest.fn(() => 'MOCK_RESPONSE');
        const controller = new OrdersController(mocked);

        expect(await controller.getOrders(user, 'MOCK_ID')).toEqual('MOCK_RESPONSE');
    });

    it('should call order service on updateStatus', async () => {
        // @ts-ignore
        mocked.changeStatus = jest.fn(() => 'MOCK_RESPONSE');
        const controller = new OrdersController(mocked);

        expect(await controller.updateStatus(user, 'MOCK_ID', changeObj)).toEqual('MOCK_RESPONSE');
    });
});