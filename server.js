const express = require("express");
const bodyParser = require("body-parser")

const app = express();

app.get("/",function(req,res){
// res.send("Hello")
var today = new Date(); // this function will provide current date and time;
var currenDay = today.getDay();
if(currenDay==6 || currenDay==0){   //today.getDay() return the number of day in week suppose for monday it return 1 and for saturday it return 6 and for sunday it rteurn 0
res.write("<h1>Yay it's the weekend</h1>")
}
else{
    res.write("<p>It is not the weekend</p>");
    res.write("<h1>Boo! I have to work</h1>")
    res.send();
}

})

app.listen(3000,()=>{
    console.log("Sever started on port 3000");
})