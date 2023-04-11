var express=require("express");
var moongose=require("mongoose");
var bp=require("body-parser");
var app=express();

app.use(express.static('public'));
app.get('/',function(req,res){
    res.redirect('abi.html');
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
    var user=req.body.user;
    var d={'user_name':uname,'password':password,'user':user};
    db.collection('deva').insertOne(d,function(err){
        if(err)
        {throw err;}
        console.log("Record Inserted");
        return res.redirect("abi1.html");
    });
});

app.post('/deva',function(req,res){
    var pname=req.body.pname;
    var vtime=req.body.vtime;
    var prb=req.body.prb;
    var d={'patient_namer':pname,'time':vtime,'problem':prb};
    db.collection('project').insertOne(d,function(err){
        if(err)
        {throw err;}
        console.log("Record inserted");
        return res.redirect("dd.html");
    });
});