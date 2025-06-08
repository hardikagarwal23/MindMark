import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoute from './routes/upload.js';
import autoPostRoute from './routes/autoPost.js';
import verifyRoute from './routes/verify.js';
import profileRoute from './routes/profile.js';
import connectDB from './config/mongoDB.js';
import newPostsRoute from './routes/newPosts.js';
import getPaginatedPosts from './routes/postController.js';
import admin from "firebase-admin";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({ origin: true }));
app.use(express.json()); 

 
admin.initializeApp({
  credential: admin.credential.cert({
  "type": process.env.TYPE,
  "project_id": process.env.PROJECT_ID, 
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.CLIENT_EMAIL, 
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
  "universe_domain": process.env.UNIVERSE_DOMAIN
}
)});

const startServer = async () => {
  try {
    await connectDB();

    app.get('/', (req, res) => {
      res.send({
        activeStatus: true,
        error: false,
      })
    })


    app.use("/api/upload", uploadRoute);
    app.use("/api/autoPost", autoPostRoute);
    app.use('/api/new-posts', newPostsRoute);
    app.use('/api/verify-user', verifyRoute);
    app.use('/api/profile-data', profileRoute);
    app.use("/api/all-posts",getPaginatedPosts);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();



