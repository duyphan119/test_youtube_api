const { service } = require("../config/configOAuth2Client");
const getById = async (id) => {
   try {
      const channel = await service.channels.list({
         part: ["id", "snippet"],
         id: id
      })
      return {
         status: 200,
         data: channel.data
      }
   } catch (error) {
      return {
         status: 500,
         data: error
      }
   }
}

module.exports = {
   getById
}