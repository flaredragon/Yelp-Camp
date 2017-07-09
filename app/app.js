var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
    Campground  = require("/projects/nodejs-hello-world/models/campground")
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");


/*campground.create({
  name:"Salmon Creek",image:"https://www.nhstateparks.org/uploads/images/Dry-River_Campground_02.jpg"
  ,description:"This is a huge Campground"
},function(err,campground)
                 {
  if(err)
    console.log(err);
  else
    console.log(campground);
  
});*/
                 
                 
                 

app.get("/",function(req,res){
  res.render("landingpage");
  
});
app.get("/campgrounds",function(req,res){
    Campground.find({},function(err,allcampgrounds)
    {if(err)
        console.log(err);
     else
        res.render("campgrounds",{campgrounds:allcampgrounds});
        
        
    })
    
});


app.post("/campgrounds",function(req,res){
  var name=req.body.name;
  var image=req.body.image;
  var description=req.body.description;
  var newcampground={name:name,image:image,description:description};
  Campground.create(newcampground,function(err,newCreate)
  {
      if(err)
        console.log(err);
      else
        res.redirect("/campgrounds");     
  })
  
  //campgrounds.push(newcampground);
  
});

app.get("/campgrounds/new",function(req,res){
  res.render("new");
  
  
});

app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id,function(err,foundcampground){
        if(err)
            console.log(err)
        else
            res.render("show",{campground:foundcampground});
    });
    
});




app.get("*",function(req,res){
  res.send("What are you doing with your life XD")
  
});
  
  
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
