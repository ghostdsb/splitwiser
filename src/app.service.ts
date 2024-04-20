import { Injectable } from '@nestjs/common';
import { finalContribution } from './expense';

@Injectable()
export class AppService {
  
  ping(): string {
    return 'pong';
  }
  
  createNewExpense(bodyParams): JSON{
    const ret = finalContribution(bodyParams)
    return ret
  }
}
