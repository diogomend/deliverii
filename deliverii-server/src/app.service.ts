import { Injectable } from '@nestjs/common';
/* istanbul ignore file */
@Injectable()
export class AppService {
  getInit() {
    return {api: "Deliverii API", version: 1.0};
  }
}
