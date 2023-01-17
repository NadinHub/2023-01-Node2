import express from "express"
import * as mysql from "mysql"
import cors from "cors"
import moment from "moment"
import config from './config/index.js'
// import { writeFile,readFile } from 'node:fs';

const app = express()

const db = mysql.createConnection(config.mysql);
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
    const q = "SELECT * FROM catdb"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        else {
            formatDate(data);
            return res.json(data)}
    })
})
const formatDate = (cat) => {
    // console.log(cat[0].cat_birthdate);
    cat.forEach(element => {
        const catdate = new Date(element.cat_birthdate);
        const momentDate = moment(catdate).format('LL');
        element.cat_birthdate = momentDate;
    });
}

//Usually all CRUD operations are doing in different folder, but here all together
app.post("/cats", (req, res) => {
    // console.log(`I am from backend` + req.body);//I can see it in terminal
    const q = "INSERT INTO catdb (`cat_name`,`sex`,`cat_birthdate`) VALUES(?)" //"?" inside VALUES provides security
    const values = [
        req.body.cat_name, //user request inside Body
        req.body.sex,
        req.body.cat_birthdate,
    ]
    // const values = ["cat name from", "male", "2022-01-01"]
    // we take all values from users. For test can use const values =["nickname from backend", "desc from backend", "cover from backend"]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})
// To implement POST without frontend we will use https://www.postman.com

//Delete cat button here plus onClick={()=> handleDelete(cat.id)} plus function handleDelete in client/Cats.jsx
app.delete("/cats/:id", (req, res) => {
    const catId = req.params.id;
    //res.send(req.params.id);
    const q = "DELETE FROM catdb WHERE id = ?"

    db.query(q, [catId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Cat has been deleted successfully.");
    })
})

app.put("/cats/:id", (req, res) => {
    const catId = req.params.id;
    //res.send(req.params.id);
    const q = "UPDATE catdb SET `cat_name`=?, `sex`=?, `cat_birthdate`=? WHERE id = ?"
    const values = [
        req.body.cat_name, //user request inside Body
        req.body.sex,
        req.body.cat_birthdate,
    ]
    db.query(q, [...values, catId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Cat has been updated successfully.");
    })
})


app.listen(8800, () => {
    console.log("Connected to backend!")
})