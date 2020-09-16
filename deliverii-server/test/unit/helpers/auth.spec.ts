import { getPayloadFromUser, sanitizeUser, signJWT, validatePassword } from '../../../src/helpers/auth';
import { mock } from 'jest-mock-extended';
import { sign } from 'jsonwebtoken';
import { User } from '../../../src/types/user';
import * as bcrypt from 'bcrypt';

jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('Auth Helper', () => {
    it('test should sanitize user', () => {        
        const sanitize = sanitizeUser({password: true});
        expect(sanitize.password).toBeUndefined();
    })

    it('test should return payload from user', () => {        
        const payload = getPayloadFromUser({isManager: true, email: 'MOCK_EMAIL', _id: 'MOCK_ID'});
        const expectedObject = {isManager: true, email: 'MOCK_EMAIL', id: 'MOCK_ID'}
        expect(payload).toEqual(expectedObject);
    })

    it('test should call sign JWT', () => {
        const user = mock<User>();
        signJWT(user);
        expect(sign).toHaveBeenCalled();
    })

    it('test should call bcrypt to validate password', async () => {
        const compare = jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
            return 'MOCK_RESULT'
        });

        const actual = await validatePassword('MOCK', 'MOCK');
        expect(compare).toHaveBeenCalled();
        expect(actual).toEqual('MOCK_RESULT');
    })
});