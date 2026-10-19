import fs from "node:fs";
import path from "node:path";
import jwt from "jsonwebtoken";
import { log } from "node:console";

function issueJWT(user) {
  const pathToKey = path.join(
    import.meta.dirname,
    "..",
    "..",
    "id_rsa_priv.pem",
  );
  const iat = Date.now();
  const expiresIn = "7d";
  //const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
  const token = jwt.sign({ sub: user.id, iat }, process.env["PRIV_KEY"], {
    algorithm: "RS256",
    expiresIn,
  });
  return { token, iat, expiresIn };
}

export default issueJWT;
