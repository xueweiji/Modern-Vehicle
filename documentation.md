
# PROJECT NAME
Property Sale and Rent Info
---

Name: Xuewei Ji

Date: October 25th,2019

Project Topic: A website for people to post property for sale and rent.

URL: http://localhost:3000/

---


### 1. Data Format and Storage

Data point fields:

- `Field 1`:type           `Type: String`   `Post via API/form` 
- `Field 2`:purpose        `Type: String`   `Post via API/form` 
- `Field 3`:zip            `Type: String`   `Post via API/form` 
- `Field 4`:area           `Type: String`   `Post via API/form` 
- `Field 5`:bedroom        `Type: String`   `Post via API/form` 
- `Field 6`:bathroom       `Type: String`   `Post via API/form` 
- `Field 7`:price          `Type: String`   `Post via API/form` 
- `Field 8`:picture        `Type: [String]` `Post via API/form` 
- `Field 9`:description    `Type: String`   `Post via API/form` 
- `Field 10`:first_picture `Type: String`   `first value of picture array` 
- `Field 11`:id           ` Type: number`   `auto increase while adding new object` 

Schema: 
```javascript
{
    type: String,
    purpose: String,
    zip: String,
    area: String,
    bedroom: String,
    bathroom: String,
    price: String, 
    picture: [String],
    description: String,
    first_picture:String,
    id: Number
}
```


### 2. Add New Data

HTML form route: `/user/register`,`/add_vehicle`

POST endpoint route: `/api/register`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: "http://localhost:3000/api/add_property",
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
   form: {
          type:"Single Family",
          purpose:"For Rent",
          area:"5000",
          bedroom:"5",
          bathroom:"5",
          zip: 20950,
          price:"5000",
          picture:"https://www.adventuresincre.com/wp-content/uploads/2018/09/architecture-clouds-daylight-259588-e1537911534698-495x400.jpg,https://www.rockhavenga.com/wp-content/uploads/2018/12/Winter-Sale-Heights-Grant-Park.jpg,http://www.wheredoyoudwell.com/wp-content/uploads/2018/02/A-1.jpg,https://catalinadesign.com/wp-content/uploads/2016/05/Single-Family-Master-Bedroom-Design-Trends.jpg",
          description:"Completely renovated Gem in the heart of Columbia. This house has it ALL - New Paint through out the house, Modern upgraded kitchen with Quartz countertops and New Stainless steel appliances, New recess lights throughout the house. New Hardwood floor throughout the house, new laminate floor in the basement. New Carpet in all bedrooms. New HVAC, hot water, furnace, and windows. This house is truly a MOVE-IN Ready house. Show and bring all Offers."
      }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/get_all_property_data`

### 4. Search Data

Search Field: 'zip'

### 5. Navigation Pages

Navigation Filters
1. Townhose -> `/townhouse`
2. Single Family -> `/singlefamily`
3. Appartment -> `/appartment`
4. For Rent -> `/rent`
5. For Sale -> `/sale`

npm: express-session;nodemailer