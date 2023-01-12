import express from "express"
import mysql from "mysql"
import cors from "cors"
// import { writeFile,readFile } from 'node:fs';

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "2023-01-node2"
})
//Test of writeFile module/method
// writeFile('one.txt', 'work', (err)=>{
//     if (err) console.log('Error')
// })
// ==============
app.use(express.json()) //express server middleware - it allows us to send any json file using a client
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

app.get("/cats", (req, res) => {
    const q = "SELECT * FROM cat"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data) 
    })
})

//Usually all CRUD operations are doing in different folder, but here all together
app.post("/cats", (req, res) => {
    const q = "INSERT INTO cat (`cat_name`,`sex`,`cat_birthdate`) VALUES(?)" //"?" inside VALUES provides security
    const values = [
        req.body.cat_name, //user request inside Body
        req.body.sex,
        req.body.cat_birthdate,
    ]
// we take all values from users. For test can use const values =["nickname from backend", "desc from backend", "cover from backend"]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})
// To implement POST without frontend we will use https://www.postman.com

//Delete cat button here plus onClick={()=> handleDelete(cat.id)} plus function handleDelete in client/Cats.jsx
app.delete("/cats/:id", (req, res)=> {
    const catId = req.params.id;
    //res.send(req.params.id);
    const q = "DELETE FROM cat WHERE id = ?"

    db.query (q, [catId], (err, data)=>{
        if (err) return res.json (err);
        return res.json ("Cat has been deleted successfully.");
    })
})

app.put("/cats/:id", (req, res)=> {
    const catId = req.params.id;
    //res.send(req.params.id);
    const q = "UPDATE cat SET `cat_name`=?, `sex`=?, `cat_birthdate`=? WHERE id = ?"
    const values = [
        req.body.cat_name, //user request inside Body
        req.body.sex,
        req.body.cat_birthdate,
    ]
    db.query (q, [...values, catId], (err, data)=>{
        if (err) return res.json (err);
        return res.json ("Cat has been updated successfully.");
    })
})


app.listen(8800, () => {
    console.log("Connected to backend!")
})