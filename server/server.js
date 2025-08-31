const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductRouter = require('./routes/admin/product-routes');
const adminOrderRouter = require('./routes/admin/order-routes');
const customerProductRouter = require('./routes/customer/product-routers')
const customerCartRouter = require('./routes/customer/cart-routes')
const customerAddressRouter = require('./routes/customer/address-routes')
const customerOrderRouter = require('./routes/customer/order-routes')
const customerSearchRouter = require('./routes/customer/search-routes')
const customerReviewRouter = require('./routes/customer/review-routes')
const featureRouter = require('./routes/common/feature-routes')


mongoose.connect('mongodb+srv://frezertakele1:Fretakoranization@cluster0.evq7zi5.mongodb.net/')
  .then(() => console.log('mongodb connected'))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST','DELETE','PUT'],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",  
      "Pragma"
    ],
    credentials: true
  })
);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductRouter);
app.use('/api/admin/orders', adminOrderRouter);
app.use('/api/customer/products', customerProductRouter);
app.use('/api/customer/cart', customerCartRouter);
app.use('/api/customer/address', customerAddressRouter);
app.use('/api/customer/order', customerOrderRouter);
app.use('/api/customer/search', customerSearchRouter);
app.use('/api/customer/review', customerReviewRouter);
app.use('/api/common/feature', featureRouter);




app.listen(PORT, () => console.log(`server is now running on port ${PORT}`));
