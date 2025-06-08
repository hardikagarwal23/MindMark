import express from "express";
import admin from "firebase-admin";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let idToken = req.headers.authorization.split(" ")[1]; 
    if (!idToken) {
      return res.status(400).json({ message: "ID token is required" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
 
    const email = decodedToken.email;
    const userPhoto=decodedToken.picture;
      return res.status(200).json({
        message: "User verified",
        user: {
          email,
          userPhoto
        },
      });
    
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
