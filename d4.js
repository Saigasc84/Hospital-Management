var express=require("express");
var moongose=require("mongoose");
var bp=require("body-parser");
var app=express();

app.use(express.static('public'));
app.get('/',function(req,res){
    res.redirect('med.html');
}).listen(3000);

moongose.connect('mongodb://localhost:27017/dharshini');
var db=moongose.connection;

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
    db.collection('password').insertOne(d,function(err){
        if(err)
        {throw err;}
        console.log("Record Inserted");
        return res.redirect("med1.html");
    });
});
app.post('/sign',function(req,res){
    var sno=req.body.sno;
    var mname=req.body.mname;
    var dname=req.body.dname;
    var medi=req.body.medi;
    var d={'serial.no':sno,'patient name':mname,'doctor name':dname,'medicine':medi};
    db.collection('sam').insertOne(d,function(err){
        if(err)
        {throw err;}
        console.log("Record Inserted");
        return res.redirect("dd.html");
    });
});