import type { NextApiHandler } from "next";
import axios from "axios";

const handler: NextApiHandler = (req, res) => {
  if (req.method !== "POST") {
    return res.setHeader("Allow", "POST").status(405).json({});
  }

  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
  const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

  if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
    return res
      .status(500)
      .json({ error: `Nie podano zmiennych środowiskowych` });
  }
  
  const email = req.body.email;
  if (typeof email !== "string") {
    return res.status(400).json({});
  }

  const options = {
    method: "POST",
    url: `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUP_ID}/subscribers`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-MailerLite-ApiKey": process.env.MAILERLITE_API_KEY,
    },
    data: JSON.stringify({
      email,
    }),
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
export default handler;
