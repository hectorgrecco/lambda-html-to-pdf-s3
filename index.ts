import { Handler, APIGatewayProxyResult } from 'aws-lambda';
import generatePdf from './utils/generate-pdf'
import uploadToS3 from "./utils/upload-s3";

interface Event {
    html: string
}

export const handler: Handler = async (event: Event): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.html) throw new Error("Missing HTML field.");
        const pdf = await generatePdf(event.html);
        const location = await uploadToS3(pdf);
        return { statusCode: 200, body: JSON.stringify({ location })}
    } catch(error) {
        return { statusCode: 500, body: JSON.stringify({ error })}
    }
};

exports.handler = handler;
