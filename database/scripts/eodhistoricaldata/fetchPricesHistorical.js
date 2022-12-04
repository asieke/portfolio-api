const { db, sequelize } = require('../../index.js');
const { fetchPrices, fetchUserData, fetchTradingDates } = require('./wrapper.js');

const main = async () => {
  const dates = await fetchTradingDates();

  for (let i = 0; i < dates.length; i++) {
    let result = await db.Price.findOne({ where: { date: dates[i] } });

    if (result) {
      console.log('...skipping ', dates[i]);
    } else {
      console.log('...inserting', dates[i]);
      const data = await fetchPrices('US', dates[i], false);
      await db.Price.bulkCreate(data);
    }
  }

  db.close();

  // console.log('FETCHING EOD DATA...');

  // let { apiRequests, dailyRateLimit } = await fetchUserData();

  // let date = new Date('2022-01-01');
  // let today = new Date();
  // let data = [];

  // while (date < today) {
  //   //if its a weekday
  //   if (date.getDay() !== 0 && date.getDay() !== 6) {
  //     let dateStr = date.toISOString().slice(0, 10);

  //     let result = await db.Price.findOne({ where: { date: dateStr } });

  //     if (!!result === false) {
  //       const data = await fetchPrices('US', dateStr, false);
  //       await db.Price.bulkCreate(data);
  //       console.log(dateStr, '...created', apiRequests);
  //       apiRequests += 100;
  //     } else {
  //       console.log(dateStr, '...already exists', apiRequests);
  //     }
  //   }

  //   if (apiRequests > dailyRateLimit - 1000) break;

  //   date.setDate(date.getDate() + 1);
  // }

  // // const data = await fetchPrices('US', '2022-11-29');
  // // console.log('...data fetched');
  // // for (let i = 0; i < data.length; i++) {
  // //   await db.Price.upsert(data[i]);
  // // }
  // // console.log('...data inserted');
};

main();
