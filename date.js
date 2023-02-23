// console.log(module);
// module.exports = getDate;
exports.getDate = function() {
    const today = new Date(); // this function will provide current date and time;
    const options = {
        weekday:"long",
        day:"numeric",
        month:"long"
      }
      
      // var day = today.toLocaleDateString("en-GB",options) // British English uses day-month-year order
      // return day = today.toLocaleDateString("en-US",options) // US English uses month-day-year order
      // OR
      const day = today.toLocaleDateString("en-US",options) // US English uses month-day-year order
      return day;
    }

module.exports.getDay = getDay;

function getDay(){
    const today = new Date(); // this function will provide current date and time;
    const options = {
        weekday:"long",
      }
      
      // var day = today.toLocaleDateString("en-GB",options) // British English uses day-month-year order
      return day = today.toLocaleDateString("en-US",options) // US English uses month-day-year order
}