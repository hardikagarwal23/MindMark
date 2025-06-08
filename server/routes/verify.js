import express from "express";
import admin from "firebase-admin";
import Users from "../schema/user.js";

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
 
    if (!email) {
      return res.status(400).json({ message: "Email not found in token" });
    }

    let user = await Users.findOne({ email });

    if (!user) {
      user = await Users.create({ email });
      console.log("New user created:", email);
      return res.status(200).json({
        message: "New user created",
         user: {
          email: user.email,
          userPhoto:userPhoto
        },
      });
    } else {
      console.log("User exists:", email);
      return res.status(200).json({
        message: "User verified",
        user: {
          email: user.email,
          userPhoto:userPhoto
        },
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
