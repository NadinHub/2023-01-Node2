import React from 'react'
import {Link} from "react-router-dom"
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'

const Cats = () => {
    const [cats, setCats] = useState([]);
    useEffect(() => {
        const fetchAllCats = async () => {
            try {
                const res = await axios.get("http://localhost:8800/cats") //we made a request to bring us info from front on this http address
                setCats(res.data);
                //console.log(res);
            } catch (error) {
                console.log(error);

            }
        }
        fetchAllCats()
    }, [])

    const handleDelete = async(id)=>{
        try {
            await axios.delete ("http://localhost:8800/cats/"+id)//it makes a request to my backend=server
            window.location.reload() //to force the document to be fetced from the web server again. 
            // Without it, when we delete a cat - it deletes in DB, but still in frontend.In future it better to do it using REDUX or some other managment tools
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1>Lama Cats Store</h1>
            <div className="cats">
                {cats.map((cat)=>(
                    <div className="cat" key={cat.id}> 
                    {/* We use key when we do map */}
                      {cat.cover && <img src={cat.cover} alt="" />} 
                      <h2>{cat.nickname}</h2>
                      <p>{cat.desc}</p>
                      <span>{cat.price}</span>
                      <button className="delete" onClick={()=> handleDelete(cat.id)}>Delete</button>
                      <button className="update"><Link to={`/update/${cat.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button className='but'><Link to="/add">Add new cat</Link></button>
            {/* Creat Link using react-router-dom */}
        </div>
    )
}

export default Cats

//rafce - shortcuts