# Upload API 
Backend service to upload

# View App
    * Backend Hosted API https://plan-wjzs.onrender.com/api/v1
    # Postman Collection https://documenter.getpostman.com/view/3130485/2sA3kYhzPf

# Technologies Used
   * Back-end: NestJS, Posgresql/Prisma, JWT Token
   * Paystack for payment, Cloudinary for file upload

# Features
   * A user can upload files
   * A user can subscribe to a plan

# EndPoints
  * POST API DOCUMENTATION LINK: /api/v1/auth/signup

# Queries
  * Sign up to take a token
  * Add the token to the header to access the endpoint
  * Call the GET /plan to see the list of plan
  * Call the GET /subscription/pay-link/:planId to generate a payment link
  * Open the payment link in the browser to make the payment
  * Check the GET /subscription to view your active subscription
  * Go to POST /upload to send an upload
  * Call the GET /upload to see the list of file you uploaded
  * Call the GET /upload/:uploadId to see a single
  * Call the Delete /upload/:uploadId tto delate a upload


# To Install
  * Download or clone the repo
  * open terminal inside root directory of cloned folder
  * type npm install to install all dependencies
  * type npx prisma migrate dev to run database migration 
  * create a .env file and add env in the example.env file
  * type npm run start:dev to run in development mode
  * type npm run build and npm run start:prod for production 


# FAQs
* Contact spectrumsun@hotmail.com

# LICENSE
* [MIT](./LICENSE) © [Sunday Taiwo]

Copyright (c) 2024 Sunday Taiwo