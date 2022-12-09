require('dotenv').config();
const axios = require('axios');
const KEY = process.env.EOD;

//write an async main function
const main = async () => {
  const URL = `https://eodhistoricaldata.com/api/fundamentals/COIN?api_token=${KEY}&fmt=json`;
  const res = await axios.get(URL);

  const { Balance_Sheet, Income_Statement, Cash_Flow } = res.data.Financials;

  //iterate through Balance_Sheet.quarterly object and console log the date, totalAssets, and totalLiabilities

  console.log(`Balance Sheet`);
  console.log(`date\ttotalAssets\ttotalLiab\tcash\tcashAndEquivalents\tnetDebt`);
  for (let key in Balance_Sheet.quarterly) {
    //console.log(Balance_Sheet.quarterly[key]);

    const { date, totalAssets, totalLiab, cash, cashAndEquivalents, netDebt } =
      Balance_Sheet.quarterly[key];

    if (!totalAssets) continue;
    //console.log all of these variables separated by tabs
    console.log(`${date}\t${totalAssets}\t${totalLiab}\t${cash}\t${netDebt}`);
  }

  //iterate through Income_Statement.quarterly object and console log the entire object
  console.log(`Income Statement`);
  console.log(
    `date\ttotalRevenue\ttotalOperatingExpenses\tnetIncome\toperatingIncome\tgrossProfit\tebitda`
  );
  for (let key in Income_Statement.quarterly) {
    //console.log(Income_Statement.quarterly[key]);

    const {
      date,
      totalRevenue,
      totalOperatingExpenses,
      netIncome,
      operatingIncome,
      grossProfit,
      ebitda,
    } = Income_Statement.quarterly[key];

    console.log(
      `${date}\t${totalRevenue}\t${totalOperatingExpenses}\t${netIncome}\t${operatingIncome}\t${grossProfit}\t${ebitda}`
    );
  }

  //iterate through Cash_Flow.quarterly object and console log the netIncome, Free cash flow, Net change in cash
  console.log(`Cash Flow`);
  console.log(`date\tnetIncome\tfreeCashFlow\tchangeInCash`);
  for (let key in Cash_Flow.quarterly) {
    const { date, netIncome, freeCashFlow, changeInCash } = Cash_Flow.quarterly[key];

    console.log(`${date}\t${netIncome}\t${freeCashFlow}\t${changeInCash}`);
  }
};

main();
