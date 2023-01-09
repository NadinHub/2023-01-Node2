import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [cat, setCat] = useState({
    nickname: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate()
  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8800/cats", cat)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    setCat((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  };
  //console.log(cat);

  return (
    <div className='form'>
      <h1> Add new cat</h1>
      <input type="text" placeholder='nickname' onChange={handleChange} name='nickname' />
      <input type="text" placeholder='desc' onChange={handleChange} name='desc' />
      <input type="number" placeholder='price' onChange={handleChange} name='price' />
      <input type="text" placeholder='cover' onChange={handleChange} name='cover' />
      <button className='formButton' onClick={handleClick}>Send</button>
    </div>
  )
}

export default Add
