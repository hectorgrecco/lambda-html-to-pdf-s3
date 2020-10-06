import {S3} from "aws-sdk";
import { v4 as uuid } from 'uuid';
const s3 = new S3();

const uploadToS3 = async (pdf): Promise<string> => {
    const params = {
        Key: `${uuid()}.pdf`,
        Body: pdf,
        Bucket: process.env.S3_BUCKET,
        ContentType: `application/pdf`,
        ACL: 'public-read'
    };

    const {Location} = await s3.upload(params).promise();
    return Location
}

export default uploadToS3;
