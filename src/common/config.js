import 'dotenv/config'

const config = {
    PORT : process.env.PORT || 4000,
    JWT_EXPIRY : process.env.JWT_EXPIRY,
    JWT_SECRET : process.env.JWT_SECRET,
    MONGO_URL : process.env.MONGODB_URL,
    EMAIL_USERNAME : process.env.EMAIL_USERNAME,
    EMAIL_PASSWORD : process.env.EMAIL_PASSWORD,
    STRIPE_KEY : process.env.STRIPE_KEY

}

export default config