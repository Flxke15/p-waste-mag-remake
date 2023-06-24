const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const e = require("express");

const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const Cookies = require("universal-cookie");
const cookies = new Cookies();

//app.options('*',cors())

app.use(express.json());
app.use(cors(
    {
    origin:["http://localhost:3000"],
    methods: ["GET","POST","DELETE","PUT"],
    credentials: true
    }
));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));

app.use(session({
    key: "userID",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expries: 60*60*24,
    },

}))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "wastemag_ver2"
})



app.get("/login", (req,res) => {

    if (req.session.user){
        res.send({loggedIn : true, user: req.session.user});
    }else {
        res.send({loggedIn : false});
    }
})

app.post('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE user = ? AND password = ?",
        [username,password],
        (err,result) => {
            if (err) {
                res.send({err:err});
            }

            if (result.length > 0) {
                cookies.set('User',result,{path:'/'});
                res.send(result);
            } else {
                res.send({message: "Wrong username/password combination"});
            }
        }
    );
});


app.get('/showUser',(req,res) =>{
    db.query("SELECT * FROM users", (err,result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.get('/showPoint',(req,res) =>{

    db.query("SELECT * FROM scanpoint", (err,result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.get('/showHistory',(req,res) =>{

    db.query("SELECT * FROM history ORDER BY No DESC", (err,result) => {
        //res.set('Access-Control-Allow-Origin', '*');
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.get('/getLastHistory',(req,res) =>{

    db.query("SELECT * FROM history ORDER BY No DESC LIMIT 1", (err,result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });

});

app.get('/checkRole/:uid',(req,res) =>{

    const uid = req.params.uid;
    db.query("SELECT * FROM uid WHERE UID=?",uid, (err,result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.put('/updateStatusU/:point',(req,res) => {

    const point = req.params.point;
    db.query("UPDATE scanpoint SET Status = ? WHERE Point = ?",["รอการดำเนินการ",point] , (err,result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.put('/updateStatusC/:point',(req,res) => {

    const point = req.params.point;
    db.query("UPDATE scanpoint SET Status = ? WHERE Point = ?",["ดำเนินการเสร็จเรียบร้อยแล้ว",point] , (err,result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.post('/adduser', (req,res) => {

    const surname = req.body.surname;
    const lastname = req.body.lastname;
    const uid = req.body.uid;
    const address = req.body.address;

    db.query("INSERT INTO users (Surname,Lastname,UID,Address,Role) VALUES (?,?,?,?,?)",
        [surname,lastname,uid,address,"U"],
        (err,result) => {
            if (err) {
                console.log(err)
            }else {
                res.send(result)
                // db.query("UPDATE uid SET Role = ? WHERE UID = ?",['U',uid], (err,result) => {
                //     if (err){
                //         console.log(err);
                //     }else {
                //         res.send(result);
                //     }
                // })
            }
        })
})

app.post('/addadmin', (req,res) => {

    const surname = req.body.surname;
    const lastname = req.body.lastname;
    const address = req.body.address;
    const username = req.body.username;
    const password = req.body.password;

    db.query("INSERT INTO users (Surname,Lastname,Address,Role,User,Password) VALUES (?,?,?,?,?,?)",
        [surname,lastname,address,"A",username,password],
        (err,result) => {
            if (err) {
                console.log(err)
            }else {
                res.send(result)
            }
        });
})

app.post('/addcollector', (req,res) => {

    const surname = req.body.surname;
    const lastname = req.body.lastname;
    const uid = req.body.uid;
    const address = req.body.address;

    db.query("INSERT INTO users (Surname,Lastname,UID,Address,Role) VALUES (?,?,?,?,?)",
        [surname,lastname,uid,address,"C"],
        (err,result) => {
            if (err) {
                console.log(err)
            }else {
                res.send(result)
            }
        })
})

app.put('/updateRoleUIDC/:uid',(req,res) => {

    const uid = req.params.uid;
    db.query("UPDATE uid SET Role = ? WHERE UID = ?",["C",uid] , (err,result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.put('/updateRoleUIDU/:uid',(req,res) => {

    const uid = req.params.uid;
    db.query("UPDATE uid SET Role = ? WHERE UID = ?",["U",uid] , (err,result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.post('/addPoint', (req,res) => {

    const point = req.body.point;
    const name = req.body.name;
    const address = req.body.address;
    const link = req.body.link;

    db.query("INSERT INTO scanpoint (Point,Name,Address,Status,Link) VALUES (?,?,?,?,?)",
        [point,name,address,"First Register This Point.",link],
        (err,result) => {
            if (err) {
                console.log(err)
            }else {
                res.send("AddPoint success")
            }
        });
})

app.delete('/deleteUser/:id', (req,res) => {

    const id = req.params.id;
    db.query("DELETE FROM users where ID = ?",id,(err,result) => {
        if (err){
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.delete('/deletePoint/:id', (req,res) => {

    const id = req.params.id;
    db.query("DELETE FROM scanpoint where Point = ?",id,(err,result) => {
        if (err){
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.delete('/deleteUIDFromUser/:uid', (req,res) => {

    const uid = req.params.uid;
    db.query("DELETE FROM uid where UID = ?",uid,(err,result) => {
        if (err){
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.delete('/deleteUID', (req,res) => {

    db.query("DELETE FROM uid ORDER BY ID DESC LIMIT 1",(err,result) => {
        if (err){
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.get('/getUID',(req,res) =>{

    db.query("SELECT UID FROM UID ORDER BY ID DESC LIMIT 1", (err,result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.get('/getAllUID',(req,res) =>{

    db.query("SELECT UID FROM uid", (err,result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.get('/getCountPoint1',(req,res) =>{

    db.query("SELECT COUNT(Point) FROM history WHERE Point = 1", (err,result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
})

app.get('/getCountPoint2',(req,res) =>{

    db.query("SELECT COUNT(Point) FROM history WHERE Point = 2", (err,result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
})

app.get('/getCountPoint3',(req,res) =>{

    db.query("SELECT COUNT(Point) FROM history WHERE Point = 3", (err,result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
})


app.listen('3001',() =>{
    console.log('Server is running on port 3001')
});


