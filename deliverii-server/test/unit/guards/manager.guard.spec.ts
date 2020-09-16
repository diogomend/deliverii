import { ManagerGuard } from '../../../src/guards/manager.guard';
import { mockDeep, anyString, mock } from 'jest-mock-extended';
import {
    ExecutionContext
  } from '@nestjs/common';

describe('Manager Guard', () => {
    it('test should throw error if is user', () => {        
        const mocked = getMocked(false);
        const clientGuard = new ManagerGuard();

        // @ts-ignore
        expect(() => clientGuard.canActivate(mocked)).toThrowError();
    })

    it('test should return true if manager', () => {        
        const mocked = getMocked(true);
        const clientGuard = new ManagerGuard();

        expect(clientGuard.canActivate(mocked)).toBeTruthy();
    })


    function getMocked(isManager: Boolean): ExecutionContext {
        let mocked = mock<ExecutionContext>();
        // @ts-ignore
        mocked.switchToHttp = jest.fn(() => {
            return {
                getRequest: jest.fn(() => {
                    return {user: {isManager: isManager}}
                })
            };
        })

        return mocked;
    }
});