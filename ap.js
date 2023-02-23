const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const date = require(__dirname + "/date.js")

mongoose.set('strictQuery',false)

// console.log(date());

const app = express();

// const items = ["Buy Food","Cook Food","Eat Food"];
// const workItems = []

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB")

const itemsSchema = {
  name:String
}

const Item = mongoose.model("Item",itemsSchema)


app.get("/",function(req,res){
// res.send("Hello")

// var currentDay = today.getDay();
// var day = ""

// if(currenDay==6 || currenDay==0){   //today.getDay() return the number of day in week suppose for monday it return 1 and for saturday it return 6 and for sunday it rteurn 0
//   day="Weekend"
//   // res.write("<h2>Yay It's the weekend</h2>")
// }
// else{
//   day="Weekday"
//   // res.sendFile(__dirname + "/index.html")
// }

// switch(currentDay){
//   case 0:
//     day="Sunday"
//     break;
//   case 1:
//     day="Monday"
//     break;
//   case 2:
//     day="Tuesday"
//     break;
//   case 3:
//     day="Wednesday"
//     break;
//   case 4:
//     day="Thursday"
//     break;
//   case 5:
//     day="Friday"
//     break;
//   case 6:
//     day="Saturday"
//     break;
//     default:
//       console.log("Error: current day is equal to: " + currentDay);

// }

// let day = date();
// day = date.getDay();
const day = date.getDate();

res.render("list",{
  listTitle:day,
  newListItems:items
})

})

app.get("/work",function(req,res){
res.render("list",{
  listTitle:"Work List",
  newListItems:workItems
})
})

app.post("/work",function(req,res){
  let item = req.body.newItem;


})

app.post("/",function(req,res){
  item = req.body.newItem;
  // console.log(req.body)
  if(req.body.list=="Work"){
    workItems.push(item)
    res.redirect("/work")
 }
 else{
   items.push(item)
   res.redirect("/")
 }


})

app.get("/about",function(req,res){
  res.render("about")
})

app.listen(3000,()=>{
    console.log("Sever started on port 3000");
})