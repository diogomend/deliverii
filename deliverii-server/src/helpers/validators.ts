import { ObjectID } from 'bson';
import { HttpStatus, HttpException } from '@nestjs/common';

export const validateID = (id) => {
    if (!ObjectID.isValid(id)) {
        throw new HttpException('Invalid fields', HttpStatus.BAD_REQUEST);
    }
}