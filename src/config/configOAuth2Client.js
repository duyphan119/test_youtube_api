const { google } = require('googleapis');
require('dotenv').config();

const service = google.youtube({
   version: "v3"
   , auth: process.env.API_KEY
})
const oauth2Client = new google.auth.OAuth2(
   process.env.GOOGLE_CLIENT_ID,
   process.env.GOOGLE_CLIENT_SECRET,
   process.env.GOOGLE_REDIRECT_URL
);

module.exports = { service, oauth2Client }