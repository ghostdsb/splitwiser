import { Injectable } from '@nestjs/common';
import { finalContribution } from './expense';
import { IExpense } from './types';

@Injectable()
export class AppService {
  ping(): string {
    return 'pong';
  }

  createNewExpense(bodyParams: IExpense): JSON {
    const ret = finalContribution(bodyParams);
    return ret;
  }
}
