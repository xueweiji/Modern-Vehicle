
# PROJECT NAME
Modern Vehicle Sale and Rent Website
---

Name: Xuewei Ji, Zhixin Jiang

Date: December 5th, 2019

Project Topic: A website for people to post vehicles for sale or rent.

https://modern-vehicles.herokuapp.com/

---


### 1. Data Format and Storage

1.userSchema

- `Field 1`: first_name     `Type: String`   
- `Field 2`: last_name      `Type: String`    
- `Field 3`: email          `Type: String`    
- `Field 4`: password       `Type: String`    

 Schema: 
```javascript
{
    first_name: String,
    last_name: String,
    email: String,
    password: String
}
```

2.vehicleOnSaleSchema
- `Field 1`: make           `Type: String`   
- `Field 2`: model          `Type: String`   
- `Field 3`: year           `Type: String`   
- `Field 4`: user_mail      `Type: String`   
- `Field 5`: mileage        `Type: number`   
- `Field 6`: price          `Type: String`    
- `Field 7`: zip            `Type: String`    
- `Field 8`: description    `Type: String`  
- `Field 9`: first_picture  `Type: String`   
- `Field 10`: type          `Type: String`    
- `Field 11`: purpose       `Type: String`  
- `Field 12`: picture       `Type:[String]`    
- `Field 13`: color         `Type: String`  

Schema: 
```javascript
{
    make: String,
    model: String,
    year: String,
    user_mail: String,
    mileage: number,
    price: String,
    zip: String, 
    description: [String],
    first_picture: String,
    type:String,
    picture: [String],
    color:String,
    purpose: String
}
```
3.vehicleMakeSchema

- `Field 1`: make       `Type: String`   
- `Field 2`: model      `Type: String`     

 Schema: 
```javascript
{
    make: String,
    model: String
}
```
### 2. Add New Data

HTML form route: `/api/register`

POST endpoint route: `/api/api/register`

```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: "https://modern-vehicles.herokuapp.com/api/register",
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
   form: {
          first_name:"Camellia",
          last_name:"Ji",
          email:"camellia@terpmail.umd.edu",
          password:"123"
      }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```
POST endpoint route: `/api/api/add_make`

```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: "https://modern-vehicles.herokuapp.com/api/add_make",
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
   form: {
          make:"Mercedes-Benz",
          model:"A-Class,AMG GT,C-Class,CLA,CLS,E-Class,G-Class,GLA,GLC,GLE,GLS,GT Class,Maybach,Metris,S-Class,SL,SLC,Sprinter Vans"
      }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```
POST endpoint route: `/api/api/add_vehicle`
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: "https://modern-vehicles.herokuapp.com/api/add_vehicle",
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
   form: {
        make:"Mercedes-Benz",
            model:"C-Class",
            type:"Regular Car",
            zip:"21044",
            purpose:"For Rent",
            year:"2019",
            mileage:2000,
            color:"white",
            price:"40000",
            picture:"https://images.craigslist.org/00909_5OApP5pngZZ_600x450.jpg,https://images.craigslist.org/00W0W_7bJX8BEEJ40_600x450.jpg,https://images.craigslist.org/00c0c_bmzEeDN82G7_600x450.jpg,https://images.craigslist.org/00X0X_brYsQcCo0Wy_600x450.jpg,https://images.craigslist.org/00505_5OlKBJQc7nz_600x450.jpg,https://images.craigslist.org/00F0F_aHILLeVWBBN_600x450.jpg",
            description:"Our elite team at Mercedes-Benz of Walnut Creek is driven to be #1 in sales and service. Just like our brand, we are dedicated to our customers and committed to being the best or nothing. We have created a culture where our associates are empowered to delight our customers, it is our mission to redefine the dealership experience. Call us to see how we can help you lease this Mercedes-Benz A-Class today!",
            user_email:"camelliaji2017@gmail.com",
            first_picture:"https://images.craigslist.org/00909_5OApP5pngZZ_600x450.jpg"
      }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```
### 3. View Data

GET endpoint route: `/api/getVehicleByUser/:email`, `/api/getVehicleByPurpose/:purpose`, `/api/getVehicleByType/:type`, `/api/getAllVehicles`, `/api/getAllUsers`

For example: 
1. `https://modern-vehicles.herokuapp.com/api/getVehicleByUser/camelliaji2015@gmail.com`
2. `https://modern-vehicles.herokuapp.com/api/getVehicleByPurpose/For Sale`
3. `https://modern-vehicles.herokuapp.com/api/getVehicleByType/Truck`
4. `https://modern-vehicles.herokuapp.com/api/getAllVehicles`
5. `https://modern-vehicles.herokuapp.com/api/getAllUsers`
### 4. Delete Data
DELETE endpoint route: `/api/deleteAccount/:email`, `/api/deletebyVehicleId/:id`

For example:
1. Use Post Man Delete request: https://modern-vehicles.herokuapp.com/api/deleteAccount/camelliaji2015@gmail.com
2. Use Post Man Delete request: https://modern-vehicles.herokuapp.com/api/deletebyVehicleId/5de71e597b3bed0017cd1183
### 5. Search Data
Search Field: 'zip'

### 6. Navigation Pages
User Navigation bar
Login/ Log out/ Register/ About
Navigation Filters
1. Regular Car -> `/main/regular`
2. SUV -> `/main/suv`
3. Truck -> `/main/truck`
4. For Rent -> `/main/rent`
5. For Sale -> `main/sale`

### 7. Socket
After a user adds a vehicle, new vehicle info will be added into the database. In realtime other uses who is on the home page will see new vehicle updated on the home page automatically.
### 8. Forms
1. Register Form
2. Login Form
3. Add new vehicle Form
4. Delete Vehicle Form
5. Send email to seller Form
### 9. npm
1. express-session: use this npm to record current user status for login, log out and required login pages.
2. nodemailer: use this npm to allow users to send emails to the vehicle owner.

### 10. Handlebars
1. about.handlebars: about page for some basic descriptions of this web.
2. add_vehicle.handlebars: a page to submit a new vehicle form.
3. detail.handlebars: vehicle detail info.
4. home.handlebars: home page.
5. login.handlebars: a page to submit the login form.
6. my_vehicle.handlebars: a page for login users to check vehicle lists uploaded by themselves.
7. register: a page to submit the register form.
8. sendEmail.handlebars: a page to submit the form of sending an email.

### 11. API
There are 3 post endpoints in the No.2 title, 5 get endpoints in the No.3 title, and 2 delete endpoints in the No.4 title.
### 12. Modules
1. The user module is used for user routes.
2. The main module is used for most of the routes about vehicle info pages.
3. The api module is used for endpoints API requests.
### 13. Seletion Filed in add_newVehicle page
The Make and model selection fields are from database vehicleMakeSchema. We can only /api/add_make post endpoint to add new Make and model.