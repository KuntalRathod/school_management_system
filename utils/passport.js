import passport from "passport"
import { Strategy as FacebookStrategy } from "passport-facebook"
import dotenv from "dotenv"

dotenv.config()

// Facebook OAuth Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/facebook/callback",
      profileFields: ["id", "emails", "name", "picture.type(large)"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Facebook Access Token:", accessToken)
        console.log("Facebook Profile Data:", profile)

        // Extract user details
        const userData = {
          id: profile.id,
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          email: profile.emails ? profile.emails[0].value : null,
          profileImage: profile.photos ? profile.photos[0].value : null,
          accessToken,
        }

        // Here, you can store the user in your database if needed
        return done(null, userData)
      } catch (error) {
        return done(error, null)
      }
    }
  )
)

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user)
})

// Deserialize user
passport.deserializeUser((user, done) => {
  done(null, user)
})

export default passport
