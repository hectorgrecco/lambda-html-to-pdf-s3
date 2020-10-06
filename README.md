# HTMLtoPDF-S3

Lambda function that converts HTML code to PDF documents and upload it to AWS S3. Original project by [Zeplin](https://github.com/zeplin/zeplin-html-to-pdf).

## How to use   
Input event to this function has the following structure: 
```
{
    "html": "<!DOCTYPE html><html><head><title>HTML doc</title></head><body>Content<body></html>"
}
```


## Output
It yields a response in the following format: 
```
{
  "data": "JVBERi0xLjQKMSAwIG9iago8PAovVGl0bGUgKP7..."
}
```
`data` is base64 encoding of the converted PDF file. 


## Test in local environment
The function can be tested locally using [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference.html). You can change contents of `events/example-event.json` or you can create a new file which you will give sam as an event parameter.

```
sam local invoke "HtmlToPdf" -e events/example-event.json
````

## Deploying to AWS
There are two ways in which these functions can be deployed to AWS.

1 - Check our `npm run deploy:dev` and `npm run deploy:prod` commands in `package.json` and change it according to your needs. Do not forget to add environment variables (you can find it under `template.yml`) to your lambda function in aws lambda edit page or running [lamba update-function-configuration command](https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-configuration.html).

2 - Check out `template.yml` file and edit according to your needs then use `sam deploy`.

