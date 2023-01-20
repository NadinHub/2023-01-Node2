import React from 'react'
import { Link } from "react-router-dom"
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import "./cats.css"

const Cats = () => {
    const [cats, setCats] = useState([]);
    useEffect(() => {
        const fetchAllCats = async () => {
            try {
                const res = await axios.get("http://localhost:8800/cats") //we made a request to bring us info from front on this http address
                setCats(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCats()
    }, [])

    return (
        <div>
            <h1>Lama Cats Store</h1>
            <div className="catswrap">
                {/* in Flex layout block__row is a Flex-container, because Flex works only in one demension - horizonte */}
                <div className="block__row">
                    {/* cats here is our state */}
                    {cats.map((cat) => (
                        <div className="block__column" key={cat.id}>
                            <Cat1 cat_name={cat.cat_name} sex={cat.sex} cat_birthdate={cat.cat_birthdate} id={cat.id}/>
                        </div>
                    ))}
                </div>
                <button className='but'><Link to="/add">Add new cat</Link></button>
                {/* Creat Link using react-router-dom */}
            </div>
        </div>
    )
}

const Cat1 = (props) => {
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/cats/" + id)//it makes a request to my backend=server
            window.location.reload() //to force the document to be fetced from the web server again. 
            // Without it, when we delete a cat - it deletes in DB, but still in frontend.In future it better to do it using REDUX or some other managment tools
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="block__item">
        {/* {props.cover && <img className='catimg' src={props.cover} alt="" />} */}
        <h2>{props.cat_name}</h2>
        <p>{props.sex}</p>
        <span>🎂 Birthday : {props.cat_birthdate}</span>
        <button className="delete" onClick={() => handleDelete(props.id)}>Delete</button>
        <button className="update"><Link to={`/update/${props.id}`}>Update</Link></button>
        </div>
    )
}
export default Cats

//rafce - shortcuts