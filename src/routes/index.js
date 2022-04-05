const authRouter = require('./auth');
const videoRouter = require('./video');
const videoCategoryRouter = require('./videoCategory');
const playListRouter = require('./playList');
const playListItemRouter = require('./playListItem');

const configRoutes = (app) => {
   app.use("/v1/api/auth", authRouter);
   app.use("/v1/api/video", videoRouter);
   app.use("/v1/api/video-category", videoCategoryRouter);
   app.use("/v1/api/playlist", playListRouter);
   app.use("/v1/api/playlistItem", playListItemRouter);
}
module.exports = configRoutes;