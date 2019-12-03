var request = require("request");
var options = {
    url: "http://localhost:3000/add_property",
    method: 'POST',
    headers:{
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        type:"Single Family",
        purpose:"For Rent",
        area:"5000",
        bedroom:"5",
        bathroom:"5",
        price:"5000",
        picture:"https://eastchurchfrederick.com/wp-content/uploads/2018/07/Eastchurch-Columbia-ElevationSunset2-web.jpg,http://www.wheredoyoudwell.com/wp-content/uploads/2018/02/A-1.jpg,https://i.pinimg.com/originals/de/1e/2e/de1e2e6c46d547cc5b0068f339ffe06a.jpg\n",
        description:"This is very good"

    }
};

request.post(options, function(error, response, body) {
    console.info('response:' + JSON.stringify(response));
    console.info('body: ' + body );
});