import express, { Request, Response } from "express";
import { decryptMessage, encryptMessage } from "../helpers/helpers";
const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.status(200).send({
    status: "success",
    msg: "Encryption and Verification Initialized",
  });
});

router.post("/encrypt", async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    const messageEncrypt = await encryptMessage(message);

    if (messageEncrypt) {
      const parts = messageEncrypt.split(":");
      // first part is the EVM address and the rest is the hashed message
      const evmAddress = parts[0];
      const encryptedMessage = parts.slice(1).join(":");
      res.json({ evmAddress, encryptedMessage });
    } else {
      // Handle the case where message encryption failed
      res.status(500).json({ error: "Failed to encrypt message" });
    }
  } catch (error) {
    console.log("unable to send message to encrypt", error);
  }
});

router.post("/decrypt", async (req: Request, res: Response) => {
  try {
    const { encryptedMessage, evmAddress } = req.body;
    const decryptedMessage = await decryptMessage(encryptedMessage, evmAddress);
    res.json({ decryptedMessage });
  } catch (error) {
    res.status(500).send("Error verifying message");
  }
});

export default router;

module.exports = router;
