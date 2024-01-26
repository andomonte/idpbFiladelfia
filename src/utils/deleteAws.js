import aws from 'aws-sdk';

// import crypto from 'crypto';

// Load the AWS SDK for Node.js
// Set the region

// Create params for S3.deleteBucket
const bucketParams = {
  Bucket: process.env.AWSBUCKET,
};

// Call S3 to delete the bucket

aws.config.update({
  secretAccessKey: process.env.AWSSECRET_KEY,
  accessKeyId: process.env.AWSACCESS_KEY,
  region: process.env.AWSREGION,
});

const s3 = new aws.S3({
  /* ... */
});
const deletar = s3.deleteBucket(bucketParams, (err) => {
  if (err) {
    console.log('Error', err);
  } else {
    //
  }
});

export default deletar;
