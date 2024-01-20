import { Wallet, providers } from "ethers";
import crypto from "crypto";
import { Config } from "../config/config";

export const encryptMessage = async (message: string) => {
  try {

    //generate random privateKey
    const wallet = Wallet.createRandom();

    if (wallet) {
      const privateKey = wallet.privateKey;
      const _provider = new providers.JsonRpcProvider(Config.JSON_RPC);
      const account = new Wallet(privateKey, _provider).connect(_provider);

      const publicKey = account.address;
      const secretKey = deriveKey(publicKey);

      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
      let encrypted = cipher.update(message, "utf8", "hex");
      encrypted += cipher.final("hex");

      return `${publicKey}:${iv.toString("hex")}:${encrypted}`;
    } 
  } catch (error) {
    console.log("Error occured while encrypting message", error);
  }
};

export const deriveKey = (evmAddress: any) => {
  return crypto
    .createHash("sha256")
    .update(String(evmAddress))
    .digest("base64")
    .substr(0, 32);
};

export const decryptMessage = async (
  encryptedMessage: any,
  evmAddress: string
) => {
  try {
    const secretKey = deriveKey(evmAddress);
    const parts = encryptedMessage.split(":");
    const iv = Buffer.from(parts.shift(), "hex");
    const encryptedText = Buffer.from(parts.join(":"), "hex");
    const decipher: any = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.log("Error occured while trying to decrypt message", error);
  }
};
