const stripe = require('stripe');

const stripeApi = stripe(
  'sk_test_51JxqnFGTU6zPigc4MWDOBfqhLDkZ18XFskxbLNp5wDgbS0IAagW7WtM8B9G9LGZma723GyaR4MA4pEoyfbqe2ogU004YAuxml4'
);

module.exports = stripeApi;
