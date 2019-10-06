/* eslint-disable import/prefer-default-export */

import fetch from "node-fetch";
import Mercury from "@postlight/mercury-parser";

export async function handler(event) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const errorGen = msg => ({ statusCode: 500, body: msg });

  try {
    const { url } = JSON.parse(event.body);

    if (!url) {
      return errorGen("Missing URL");
    }

    const response = await fetch(url);
    const html = await response.text();
    const bookmarkData = await Mercury.parse(url, { html });

    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(bookmarkData)
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
