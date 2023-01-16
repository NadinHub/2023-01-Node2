import React from 'react'
import { Link } from "react-router-dom"
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import "./cats.css"
import Header from '../components/header/Header';

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
        <div>
            <Header/>
            <h1>Lama Cats Store</h1>
            <div className="catswrap">
                {/* in Flex layout block__row is a Flex-container, because Flex works only in one demension - horizonte */}
                <div className="block__row">
                    {/* cats here is our state */}
                    {cats.map((cat) => (
                        <div className="block__column" key={cat.id}>
                            <div className="block__item">
                                {/* We use key when we do map */}
                                {cat.cover && <img className='catimg' src={cat.cover} alt="" />}
                                <h2>{cat.cat_name}</h2>
                                <p>{cat.sex}</p>
                                <span>🎂 Birthday : {cat.cat_birthdate}</span>
                                <button className="delete" onClick={() => handleDelete(cat.id)}>Delete</button>
                                <button className="update"><Link to={`/update/${cat.id}`}>Update</Link></button>
                            </div>
                        </div>
                    ))}
                </div>
                <button className='but'><Link to="/add">Add new cat</Link></button>
                {/* Creat Link using react-router-dom */}
            </div>
        </div>
    )
}

// const Cat = (cat) => {
//     <div className="block__item">
//         {cat.cover && <img className='catimg' src={cat.cover} alt="" />}
//         <h2>{cat.cat_name}</h2>
//         <p>{cat.sex}</p>
//         <span>🎂 Birthday : {cat.cat_birthdate}</span>
//         <button className="delete" onClick={() => handleDelete(cat.id)}>Delete</button>
//         <button className="update"><Link to={`/update/${cat.id}`}>Update</Link></button>
//     </div>
// }
export default Cats

//rafce - shortcuts