const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const app = express();
const ejs = require("ejs");
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const ejsTemplate = fs.readFileSync("./asset/template.ejs", "utf-8");

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.post("/generate", async (req, res, next) => {
  const { body } = req;
  const { sendToEmail } = body;
  const html = ejs.render(ejsTemplate, body);

  const objName = `${body.name
    .toLowerCase()
    .replace(" ", "-")}-portfolio-${Math.random().toString(36).substring(7)}`;

  const putObjCmd = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: objName,
    Body: html,
    ContentType: "text/html",
  });

  await s3.send(putObjCmd);

  const url = `https://${process.env.AWS_CLOUDFRONT_DIST}.cloudfront.net/${objName}`;

  return res.status(200).json({
    url,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
