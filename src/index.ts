import { IncomingHttpHeaders } from "http";
import https from "https";

interface Retrieved {
  statusCode: number;
  body: string;
}

export async function getGoogle(data = "") {
  return new Promise<Retrieved>((resolve, reject) => {
    // Inspired from https://gist.github.com/ktheory/df3440b01d4b9d3197180d5254d7fb65
    const req = https.request(
      {
        hostname: "www.google.com",
        port: 443,
        path: "/",
        method: "GET",
      },
      (res) => {
        const chunks: unknown[] = [];

        res.on("data", (chunk) => chunks.push(chunk));
        res.on("error", reject);
        res.on("end", () => {
          const body = chunks.join("");
          const { statusCode } = res;
          if (statusCode === 200) {
            resolve({ statusCode, body });
          } else
            reject(
              new Error(`Request failed. status: ${statusCode}, body: ${body}`)
            );
        });
      }
    );

    req.on("error", reject);
    req.write(data, "binary");
    req.end();
  });
}
