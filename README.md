# cs5224-project

## Project Description

Refer to the [project description](https://www.comp.nus.edu.sg/~teoym/cs5224-24/slides/Project-Assignment.pdf) for more details.

## Team Members

1. Pham Ba Thang
2. Kashish Varshney
3. Suresh Kumar Sarad
4. Stefan Artaputra Indriawan

## Project Report

The project report can be found [here](https://docs.google.com/document/d/1cNvm-q52hhZsrRgmd7Oyy5LhZGWR5_TCMU897zQPRHg/edit?usp=sharing).

## Project Structure

- `cs5224-frontend` contains the frontend codebase.

- `lambda.py` contains the AWS Lambda function codebase for generating portfolio content.

- `generate-portfolios` contains the AWS Lambda function codebase for creating and deploying portfolios.

## Setup Instructions

## Backend

1. Create a public S3 bucket and a CloudFront distribution to host the portfolios

2. Update the `serverless.yml` file with the S3 bucket name, region and CloudFront distribution ID

3. Update `lambda.py` with your OpenAI API key

4. Deploy `lambda.py` and `generate-portfolios/index.js` to AWS Lambda with an API Gateway trigger.

### Frontend

1. Rename `.env.example` to `.env` and fill in the required environment variables.

2. Run the following commands:

```sh
cd cs5224-frontend
npm install
npm run dev
```

3. Access the frontend at `http://localhost:5173`
