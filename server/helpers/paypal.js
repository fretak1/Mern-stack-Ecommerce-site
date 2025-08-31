const paypal = require("paypal-rest-sdk");

paypal.configure({
    mode : "sandbox",
    client_id : 'AQeDxhDvGVBZIQQAlyMQ7GH28eltxnpZzMr74bdDUhZAb0flwDoD3rXB5w4WGvrIuOEJMthz4XzzyFfG',
    client_secret : 'ECe32CIDtmVDBL95KpYTKS5OBoshkGEuJB0UgQWj3Ujta8NrWV-VEekGP6BAqQV9QaAnDcZ1yVD4umNM'

})

module.exports = paypal;