import * as AWS from "@aws-sdk/client-s3";

const client = new AWS.S3({
  region: "us-east-1",
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_S3_SECRET_ACCESS_KEY,
  },
});

export async function uploadFile(key: string, file: File) {
  const response = await client.putObject({
    Bucket: import.meta.env.VITE_AWS_S3_BUCKET_NAME,
    Key: key,
    Body: file,
  });

  return response;
}
