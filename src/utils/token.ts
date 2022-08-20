import jwt, { JwtPayload } from "jsonwebtoken";
import { DecodedTokenData, HttpRequest } from "../types";

class TokenService {
  retrieve(request: HttpRequest) {
    const authHeader = request.headers["Authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Please provide a valid authorization header");
    }
    return token;
  }

  verify(token: string): string | DecodedTokenData {
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET_KEY as string
    );

    if (!decodedToken) throw new Error("Invalid authorization token");

    return decodedToken;
  }
}

export default new TokenService();
