const verifyToken = (req, res, next) => {
   const reqHeader = req.headers['authorization']
   if(reqHeader){
      const token = reqHeader.split(' ')[1];
      if(token){
         req.token = token
         next();
      }
      else{
         return res.status(403).send("Không có quyền")
      }
   }else{
      return res.status(403).send("Không có quyền")
   }
}

module.exports = {verifyToken}