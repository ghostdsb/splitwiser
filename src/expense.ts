import { IExpense } from './types';

export const finalContribution = (params: IExpense) => {
  const totalAmount = params.cost;
  console.log(totalAmount);
  return params;
};
