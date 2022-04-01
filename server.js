const axios = require('axios');
const moment = require('moment');

var chartData = [];
var dataData = [];

var getData = new Promise((resolve, reject) => {
    axios.get("https://wowtokenprices.com/history_prices_1_day.json")
        .then(response => {
            // access parsed JSON response data using response.data field
            data = response.data.us;
            //console.log(data)
            data.map((item, index) => {
                let dateTime = new Date(item.time * 1000);
                let itemDate = moment(dateTime).format('YYYY-MM-DD');
                let itemTime = moment(dateTime).format('HH:mm:ss');
                let itemPrice = item.price;
                dataData.push({
                    index,
                    itemDate,
                    itemTime,
                    itemPrice
                });
            });

            resolve(response)
        })
        .catch(error => {
            if (error.response) {
                //get HTTP error code
                console.log(error.reponse.status);
            } else {
                console.log(error.message);
            }
        });
});

var sortData = async () => {
    for (let i = 0; i < dataData.length; i++) {
        try {
            if (dataData[i].itemDate === dataData[i - 1].itemDate) {
                time = dataData[i].itemTime < dataData[i - 1].itemTime ? chartData.push(dataData[i]) : chartData.push(dataData[i - 1]);
                chartData.push({
                    date: dataData[i].itemDate,
                    time: dataData[i].itemTime,
                    price: dataData[i].itemPrice

                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    console.log(chartData);
};

var runProgram = async () => {
    await getData;
    sortData();
};

runProgram();