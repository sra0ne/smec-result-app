import axios from "axios";
const ROUTES = {
  external: "student-results/external",
  "honors-minors": "student-results/honors-minors",
};

export default async function handler(req, res) {
  const origin = req.headers.origin;

  const isAllowed =
    !origin ||
    origin === process.env.ALLOWED_ORIGIN ||
    origin === process.env.ALLOWED_ORIGIN1;

  if (isAllowed) {
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
  } else {
    return res.status(403).json({ error: "Not allowed" });
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { route, ...queryParams } = req.query;
  const apiPath = ROUTES[route];

  if (!apiPath) {
    return res.status(404).json({ error: `Unknown route: ${route}` });
  }

  try {
    const response = await axios.get(
      `https://api.campx.in/student-api/${apiPath}`,
      {
        params: queryParams,
        headers: {
          "x-api-version": "2",
          "x-institution-code": "smec",
          "x-tenant-id": "smec",
          Cookie: `campx_tenant=smec; campx_institution=smec; campx_session_key=${process.env.SESSION_KEY}`,
        },
      },
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json(err.response?.data || { error: "Failed" });
  }
}
