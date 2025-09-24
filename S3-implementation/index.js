const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config();

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function SignedUrl(key) {
    const command = new GetObjectCommand({
        Bucket: 'adi-first-1',
        Key: key,
    });
    const URL = await getSignedUrl(s3Client, command);
    return URL;
};

// Wrap in async function to allow await
(async () => {
    console.log("URL is", await SignedUrl('image1.jpg'));
})();