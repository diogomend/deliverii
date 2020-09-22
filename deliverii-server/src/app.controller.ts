import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
/* istanbul ignore file */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  init() {
    return this.appService.getInit();
  }
}
