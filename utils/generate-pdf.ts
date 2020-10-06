process.env.PATH = `${process.env.PATH}:${process.env.LAMBDA_TASK_ROOT}`;
import { spawn } from 'child_process';

const generatePdf = (html: string, options?: any): Promise<string> => {
    return new Promise(((resolve, reject) => {
        const bufs = [];
        const proc = spawn("/bin/sh", ["-o", "pipefail", "-c", `lib/wkhtmltopdf ${options.join(" ")} - - | cat`]);

        proc.on("error", error => {
            reject(error);
        }).on("exit", code => {
            if (code) {
                reject(new Error(`wkhtmltopdf process exited with code ${code}`));
            } else {
                resolve(Buffer.concat(bufs));
            }
        });

        proc.stdin.end(html);

        proc.stdout.on("data", data => {
            bufs.push(data);
        }).on("error", error => {
            reject(error);
        });
    }));
};

export default generatePdf;
