process.env.PATH = `${process.env.PATH}:${process.env.LAMBDA_TASK_ROOT}`;

import { APIGatewayProxyHandler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

import { generatePdf } from './utils/wkhtmltopdf'
const s3 = new S3();

export const handler: APIGatewayProxyHandler = async (event, ctx, callback) => {
    try {
        if (!event.html) throw new Error("Missing HTML field.");
        const pdf = await generatePdf(event.html);
        const key = uuidv4();
        const params = {
            Key: `${key}.pdf`,
            Body: pdf,
            Bucket: process.env.S3_BUCKET,
            ContentType: `application/pdf`,
            ACL: 'public-read'
        };

        const { Location } = await s3.upload(params).promise();
        callback(null, {
            location: Location
        });
    } catch(error) {
        callback( {statusCode: 500, error } );
    }
};

exports.handler = handler;
