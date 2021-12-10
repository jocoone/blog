export default function handler(req, res) {
  res.writeHead(301, {
    Location: req.query.url
  });
  res.end();
}
