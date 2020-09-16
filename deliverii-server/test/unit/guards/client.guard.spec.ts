import { ClientGuard } from '../../../src/guards/client.guard';
import { mockDeep, anyString, mock } from 'jest-mock-extended';
import {
    ExecutionContext
  } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

describe('Client Guard', () => {
    it('test should throw error if is manager', () => {        
        const mocked = getMocked(true);
        const clientGuard = new ClientGuard();

        // @ts-ignore
        expect(() => clientGuard.canActivate(mocked)).toThrowError();
    })

    it('test should return true if user', () => {        
        const mocked = getMocked(false);
        const clientGuard = new ClientGuard();

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