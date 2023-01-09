import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [cat, setCat] = useState({
        nickname: "",
        desc: "",
        price: null,
        cover: "",
    });

    const navigate = useNavigate();
    const location = useLocation();
    const catId = location.pathname.split("/")[2];
    //console.log(location);
    // let catNickname = "";
    
    // const fetchCatNickname = async () => {
    //     try {
    //         const res = await axios.get("http://localhost:8800/cats") //we made a request to bring us info from front on this http address
    //         // const CatNickname = res.data
    //         // const catId = location.pathname.split("/")[2];
    //         // console.log(catId);
    //         res.data.forEach(cat => {
    //             // console.log(cat.id);
    //             if (cat.id == catId) {
    //                 //console.log(cat.nickname);
    //                 catNickname = cat.nickname;
    //                 return catNickname;
    //             }
    //             return catNickname;
    //         });
    //         //console.log(catNickname);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // fetchCatNickname();
    //console.log(catNickname); // doesn't see - executed after others

    const handleChange = (e) => {
        setCat((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    };

    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:8800/cats/" + catId, cat)
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='form'>
            <h1>Update</h1>
            <input type="text" placeholder='nickname' onChange={handleChange} name='nickname' />
            <input type="text" placeholder='desc' onChange={handleChange} name='desc' />
            <input type="number" placeholder='price' onChange={handleChange} name='price' />
            <input type="text" placeholder='cover' onChange={handleChange} name='cover' />
            <button className="formButton" onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update
