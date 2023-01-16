import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import FormInput from './components/FormInput';
import "./add.css"

const Add = () => {
  const [values, setValues] = useState({
    cat_name: "",
    sex: "male",
    cat_birthdate: "",
  });

  const onChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(e.target.value)
  };

  const navigate = useNavigate()
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/cats", values)
      // console.log(values)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="addwrap">
      <div className="add">
        <form onSubmit={handleSubmit}>
          <h1>Add a new cat</h1>
          {/* <FormInput label="Cat name" type="text" name='cat_name' placeholder="Cat name" onChange={onChange} /> */}
          <label>Cat name<input type="text" placeholder='Cat name' onChange={onChange} name='cat_name' /></label>

          <div className="radioButton">
            <span>Gender</span>
            <label><input type="radio" name='sex' value={'male'}
              defaultChecked
              onChange={onChange} />Male</label>
            <label><input type="radio" name='sex' value={'female'}
              onChange={onChange} />Female</label>
          </div>
          <label>Birthdate<input type="date" name='cat_birthdate' onChange={onChange} /></label>

          {/* <FormInput label="Birthdate" type="date" name='cat_birthdate' onChange={onChange} /> */}
          <button className='formButton'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Add
