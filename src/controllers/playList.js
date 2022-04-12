const playListService = require("../services/playList");
const playListController = {
  getAll: async (req, res) => {
    const response = await playListService.getAll(
      req.token,
      req.cookies.refresh_token
    );
    const { status, data } = response;
    res.status(status).send(data);
  },
  create: async (req, res) => {
    const response = await playListService.create(
      req.token,
      req.cookies.refresh_token,
      req.body
    );
    const { status, data } = response;
    res.status(status).send(data);
  },
  getById: async (req, res) => {
    const response = await playListService.getById(
      req.token,
      req.cookies.refresh_token,
      req.params.id
    );
    const { status, data } = response;
    res.status(status).send(data);
  },
  update: async (req, res) => {
    const response = await playListService.update(
      req.token,
      req.cookies.refresh_token,
      req.body
    );
    const { status, data } = response;
    res.status(status).send(data);
  },
  _delete: async (req, res) => {
    const response = await playListService._delete(
      req.token,
      req.cookies.refresh_token,
      req.params.id
    );
    const { status, data } = response;
    res.status(status).send(data);
  },
};
module.exports = playListController;
