export interface IExpense extends JSON {
  description: string;
  cost: number;
  participants: string[];
  paidBy: { userId: string; cost: number }[];
  share: { userId: string; share: number }[];
}
