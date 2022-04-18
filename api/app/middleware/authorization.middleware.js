import jwt from "jsonwebtoken";
import "dotenv/config";

export default function authorCheck(req, res, next) {
  const { authorization = "" } = req.headers;
  const token = authorization.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access token not found", status: 401 });
  try {
    const decoded = jwt.verify(token, process.env.ACCESSTOKEN_KEY);
    req.username = decoded.username;
    return next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token", status: 403 });
  }
}
