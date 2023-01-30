import { searchFor } from "../../lib/search";

export default async function handler(req, res) {
  if (!req.query.q) {
    res.json({});
    return;
  }

  const result = await searchFor(req.query.q);

  res.json(result);
}

