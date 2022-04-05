const { oauth2Client } = require('../config/configOAuth2Client');
const { google } = require('googleapis');
const scopes = [
   "https://www.googleapis.com/auth/youtube",
   "https://www.googleapis.com/auth/youtube.force-ssl",
   "https://www.googleapis.com/auth/youtube.readonly",
   "https://www.googleapis.com/auth/youtubepartner"
]

const authorizationUrl = oauth2Client.generateAuthUrl({
   access_type: 'offline',
   response_type: "code",
   scope: scopes,
   prompt: "consent",
   include_granted_scopes: true
});

const auth = {
   oauthSuccess: async (req, res) => {
      try {
         const { code } = req.query;
         const { tokens } = await oauth2Client.getToken(code);

         oauth2Client.setCredentials(tokens);

         const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
         });
         const resUser = await oauth2.userinfo.get();
         res.cookie("refresh_token", tokens.refresh_token, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "strict"
         })
         res.send({
            ...resUser.data,
            accessToken: tokens.access_token,
         })
      } catch (error) {
         console.log(error)
         return res.status(500).json(error);
      }
   },
   logout: (req, res) => {
      req.logout();
      res.clearCookie("refreshToken")
      return res.status(200).json("Logout");
   },
   google: (req, res) => {
      res.redirect(authorizationUrl)
   },
   loginFailed: (req, res) => {
      req.logout();
      res.status(200).json();
   }
}
module.exports = auth