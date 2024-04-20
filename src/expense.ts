import { IExpense, ILedger } from './types';

export const finalContribution = (params: IExpense): ILedger[] => {
  const totalAmount = params.cost;
  console.log(totalAmount);
  /**
   * targetShare = {
   * user1: cost * share1 -> 100 * 0.2 = 20
   * user2: cost * share2 -> 100 * 0.25 = 25
   * user3: cost * share3 -> 100 * 0.15 = 15
   * user4: cost * share4 -> 100 * 0.1 = 10
   * user5: cost * share5 -> 100 * 0.3 = 30
   * }
   * ledger = {
   * user1: paidBy[user1] - targetShare[user1] -> 50 - 20  = 30,
   * user2: paidBy[user2] - targetShare[user2] -> 0  - 25  = -25,
   * user3: paidBy[user3] - targetShare[user3] -> 50 - 15  = 35,
   * user4: paidBy[user4] - targetShare[user4] -> 0  - 10  = -10,
   * user5: paidBy[user5] - targetShare[user5] -> 0  - 30  = -30,
   * }
   * positives = [{user1:30, user3: 35}]
   * negatives = [{user2: 25, user4: 10, user5: 30}]
   */

  //   const targetShare = params.share.map((userShare) => {
  //     return totalAmount * userShare.share;
  //   });

  const targetShare = params.share.reduce((accMap, userShare) => {
    accMap[userShare.userId] = totalAmount * userShare.share;
    return accMap;
  }, {});

  const amountPaid = params.participants.reduce((accMap, user) => {
    accMap[user] = 0;
    return accMap;
  }, {});

  for (let i = 0; i < params.paidBy.length; i++) {
    amountPaid[params.paidBy[i].userId] += params.paidBy[i].cost;
  }

  const contribution = {};
  for (let i = 0; i < params.participants.length; i++) {
    contribution[params.participants[i]] =
      amountPaid[params.participants[i]] - targetShare[params.participants[i]];
  }

  const positives = [];
  const negatives = [];
  for (let i = 0; i < params.participants.length; i++) {
    if (contribution[params.participants[i]] > 0) {
      positives.push({
        user: params.participants[i],
        value: contribution[params.participants[i]],
      });
    } else {
      negatives.push({
        user: params.participants[i],
        value: -contribution[params.participants[i]],
      });
    }
  }
  console.log(positives);
  console.log(negatives);

  const ledger: ILedger[] = [];
  let [i, j] = [0, 0];
  while (i < positives.length && j < negatives.length) {
    if (positives[i].value >= negatives[j].value) {
      positives[i].value = positives[i].value - negatives[j].value;
      ledger.push({
        from: negatives[j].user,
        to: positives[i].user,
        amount: negatives[j].value,
      });
      negatives[j].value = 0;
      j++;
    } else {
      negatives[j].value = negatives[j].value - positives[i].value;
      ledger.push({
        from: negatives[j].user,
        to: positives[i].user,
        amount: negatives[j].value,
      });
      positives[i].value = 0;
      i++;
    }
  }

  console.log('amount paid', amountPaid);
  console.log(targetShare);
  console.log(contribution);
  console.log(ledger);
  return ledger;
};
