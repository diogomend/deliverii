import { validateID } from '../../../src/helpers/validators';

describe('Validators Helper', () => {

    it('should throw error if invalid id', async () => {
        expect(() => validateID('123123')).toThrowError();
    });

    it('should return true if valid id', async () => {
        expect(() => validateID('5f5c94097be4f30b84f1a41c')).not.toThrowError();
    });
});