export const formatShortNumber = (num) => {
   try {
      let stringNum = "" + num;
      if (stringNum.length <= 3) {
         return num
      } else if (stringNum.length <= 6) {
         return Math.floor(num / 1000) + "N";
      } else if (stringNum.length <= 9) {
         return Math.floor(num / 1000000) + "Tr";
      } else if (stringNum.length <= 12) {
         return Math.floor(num / 1000000000) + "T";
      }
      return num
   } catch (error) {
      console.log(error)
      return num
   }
}
