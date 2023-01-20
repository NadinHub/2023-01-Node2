import express from "express"
import cors from "cors"
import moment from "moment"
import Cats from "./db/index.js"
import { db } from './db/index.js'
import fileUpload from 'express-fileUpload'
// import path from 'path';
// import { fileURLToPath } from "url"
// const fileUpload = require('express-fileUpload');
// import { writeFile,readFile } from 'node:fs';

const app = express();

// const db = mysql.createConnection(config.mysql); //moved to db/index.js
//Test of writeFile module/method
// writeFile('one.txt', 'work', (err)=>{
//     if (err) console.log('Error')
// })
// ==============
app.use(express.json()); //express server middleware - it allows us to send any json file using a client
app.use(cors()); //for backend API

app.use(fileUpload({
    createParentPath: true,
}))

app.get("/", (req, res, next) => {
    res.json("hello this is the backend")
});

app.get("/cats", async (req, res) => {
    try {
        let data = await Cats.all();
        formatDate(data);
        res.json(data);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    // const q = "SELECT * FROM catdb"
    // db.query(q, (err, data) => {
    //     if (err) return res.json(err)
    //     else {
    //         formatDate(data);
    //         return res.json(data)
    //     }
    // });
});
//From a long data which come from JSON to a good format date.
const formatDate = (cats) => {
    cats.forEach(element => {
        const catdate = new Date(element.cat_birthdate);
        const momentDate = moment(catdate).format('LL');
        element.cat_birthdate = momentDate;
    });
};
// To implement POST without frontend we will use https://www.postman.com
//Usually all CRUD operations are doing in different folder, but here all together
app.post("/cats", (req, res) => {
    // console.log(`I am from backend` + req.body);//I can see it in terminal
    const q = "INSERT INTO catdb (`cat_name`,`sex`,`cat_birthdate`, `breed`) VALUES(?)" //"?" inside VALUES provides security
    const values = [
        req.body.cat_name, //user request inside Body
        req.body.sex,
        req.body.cat_birthdate,
        req.body.breed,
    ]
    
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
});

app.post('/upload', (req, res) => {
    if (!req.files) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;
    console.log(file.name)

    if (!file) return res.json({ error: 'Incorrect input name' });

    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname(__filename);

    // const newFileName = encodeURI(file.name.replace(/ /g, "_"));//replace spaces, because with spaces couldn't show on frontend
    const newFileName = encodeURI(Date.now() + '-' + file.name.replace(/ /g, "_"));//replace spaces, because with spaces couldn't show on frontend
    // console.log("newFileName: " + newFileName); //on terminal: 1674234497811-IMG_5767.png
    // console.log(  __dirname + "/client/public/uploads/" + newFileName); //on terminal: 1674234497811-IMG_5767.png
    // console.log( "./client/public/uploads/" + newFileName); //on terminal: 1674234497811-IMG_5767.png

    file.mv(`../client/public/uploads/${newFileName}`, err => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        console.log('File was uploaded');

        res.json({
            // fileName: file.name,
            fileName: `${newFileName}`,
            filePath: `/uploads/${newFileName}`,
        });
    });
});

//Delete cat button here plus onClick={()=> handleDelete(cat.id)} plus function handleDelete in client/Cats.jsx
app.delete("/cats/:id", (req, res) => {
    const catId = req.params.id;
    //res.send(req.params.id);
    const q = "DELETE FROM catdb WHERE id = ?"

    db.query(q, [catId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Cat has been deleted successfully.");
    })
});

app.put("/cats/:id", (req, res) => {
    const catId = req.params.id;
    //res.send(req.params.id);
    const q = "UPDATE catdb SET `cat_name`=?, `sex`=?, `cat_birthdate`=? WHERE id = ?"
    const values = [
        req.body.cat_name, //user request inside Body
        req.body.sex,
        req.body.cat_birthdate,
        req.body.breed,
    ]
    db.query(q, [...values, catId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Cat has been updated successfully.");
    })
});


app.listen(8800, () => {
    console.log("Connected to backend!")
});