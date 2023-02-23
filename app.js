const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const _ = require("lodash")

mongoose.set('strictQuery',false)

// console.log(date());

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))


// mongoose.connect("mongodb://127.0.0.1:27017/todolistDB")
mongoose.connect("mongodb+srv://Vishwaraj:Vishwaraj482@cluster0.6kpo36t.mongodb.net/todolistDB")

const itemsSchema = {
  name:String
}

const Item = mongoose.model("Item",itemsSchema)

const item1 = new Item({
  name:"Welcome to your todoList!"
})

const item2 = new Item({
  name:"Hit the + button to add a new item."
})

const item3 = new Item({
  name:"<-- Hit this to delete an item."
})

const defaultItems = [item1,item2,item3];

const listSchema = {
  name:String,
  items:[itemsSchema]
}

const List = mongoose.model("List",listSchema)

app.get("/",function(req,res){



  Item.find({},function(err,foundItems){
    if(foundItems.length==0){
      Item.insertMany(defaultItems,function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("Sucessfully added default items to DB.");
        }
      })
      res.redirect("/");
    }
    else{
      res.render("list",{
        listTitle:"Today",
        newListItems:foundItems
      })
    }

     
  })


})

app.get("/:customeListName",function(req,res){
  const customeListName = _.capitalize(req.params.customeListName);

 

  List.findOne({name:customeListName},function(err,foundList){
      if(!err){
        if(!foundList){
          // Creat a new list
          const list = new List({
            name: customeListName,
            items : defaultItems
         
           })
           list.save()
          
           res.redirect("/" + customeListName)
          // console.log("not exits");
        }
        else{
          // Show an existing list
          res.render("list",{listTitle:foundList.name,newListItems:foundList.items})
          // console.log("exits");
        }
      }
  })
  
})

// app.get("/work",function(req,res){
// res.render("list",{
//   listTitle:"Work List",
//   newListItems:workItems
// })
// })

// app.post("/work",function(req,res){
//   let item = req.body.newItem;


// })

app.post("/",function(req,res){
 const itemName = req.body.newItem;
 const listName = req.body.list;

  // console.log(req.body)
  
  const item = new Item({
    name:itemName
  })

  
  if(listName==="Today"){
  item.save();

  res.redirect("/")
}
else{
 List.findOne({name:listName},function(err,foundList){
  foundList.items.push(item);
  foundList.save();
  res.redirect("/" + listName)
 })
}

})

app.post("/delete",function(req,res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName
 
  if(listName==="Today"){
    Item.findByIdAndDelete(checkedItemId,function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log("Sucessfully deleted checked item.");
        res.redirect("/");
      }
    })
  }
  else{
    List.findOneAndUpdate({name:listName},{$pull : {items : {_id : checkedItemId}}},function(err,foundItems){
      if(!err){
        res.redirect("/" + listName)
      }
    })
  }

})

app.get("/about",function(req,res){
  res.render("about")
})

app.listen(3000,()=>{
    console.log("Sever started on port 3000");
})