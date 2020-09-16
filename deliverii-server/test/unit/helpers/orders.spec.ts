import { ValidateCurrentStatus } from '../../../src/helpers/orders';

describe('Orders Helper', () => {

    test.each`
        isManager   | newStatus      | oldStatus        | expected
        ${true}     | ${'Canceled'}  | ${'Placed'}      | ${false}
        ${false}    | ${'Canceled'}  | ${'Placed'}      | ${true}
        ${true}     | ${'Processing'}| ${'Canceled'}    | ${true}
        ${false}    | ${'Processing'}| ${'Canceled'}    | ${false}
        ${true}     | ${'In Route'}  | ${'Processing'}  | ${true}
        ${false}    | ${'In Route'}  | ${'Processing'}  | ${false}
        ${true}     | ${'Delivered'} | ${'In Route'}    | ${true}
        ${false}    | ${'Delivered'} | ${'In Route'}    | ${false}
        ${true}     | ${'Received'}  | ${'Delivered'}   | ${false}
        ${false}    | ${'Received'}  | ${'Delivered'}   | ${true}
        ${false}    | ${'Canceled'}  | ${'Received'}    | ${false}
        `('test of correct state changes allowed', ({isManager, newStatus, oldStatus, expected}) => {
            expect(ValidateCurrentStatus(isManager, newStatus, oldStatus)).toEqual(expected)
          });
});