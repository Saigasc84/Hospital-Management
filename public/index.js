var express=require("express");
var mongoose=require("mongoose");
var bp=require("body-parser");

var app=express();
app.use(express.static('public'));
app.get('/',function(req,res){
    res.redirect('test.html');
}).listen(3000);

mongoose.connect('mongodb://localhost:27017/dharshini');
var db=mongoose.connection;

db.on('error',console.log.bind("connection error"));
db.once('open',function(){
    console.log("connection successful");
});

app.use(bp.json());
app.use(bp.urlencoded({extended:true}));

app.post('/signin',function(req,res){
    var uname=req.body.uname;
    var password=req.body.password;
    var d={'user_name':uname,'password':password};
    db.collection('user_accounts').insertOne(d,function(err){
        if(err)
        {throw err;}
        console.log("Record Inserted");
        return res.redirect("text2.html");
    });
});