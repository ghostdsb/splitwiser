import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IExpense } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  ping(): string {
    return this.appService.ping();
  }

  @Post('/expense')
  createNewExpense(@Body() bodyParams: IExpense): JSON {
    return this.appService.createNewExpense(bodyParams);
  }
}
