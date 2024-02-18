const dotenv=require('dotenv');
dotenv.config();
module.exports={
    PORT:process.env.PORT,
    JWT_SECRET:process.env.JWT_SECRET,
    MONGO_URI:process.env.MONGO_URI,
    EMAIL_HOST:process.env.EMAIL_HOST,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASSWORD:process.env.EMAIL_PASSWORD,
    CLOUDINARY_URL:process.env.CLOUDINARY_URL,
    OTP_URL:process.env.OTP_URL,
    X_RAPIDAPI_KEY:process.env.X_RAPIDAPI_KEY,
    X_RAPIDAPI_HOST:process.env.X_RAPIDAPI_HOST
}