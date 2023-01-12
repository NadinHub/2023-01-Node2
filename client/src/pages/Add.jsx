// import axios from 'axios';
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import FormInput from './components/FormInput';
import "./add.css"

const Add = () => {
  const [values, setValues] = useState({
    cat_name: "",
    sex: "",
    cat_birthdate: "",
  });

  const inputs = [
    {
      id: 1,
      name: "catname",
      type: "text",
      placeholder: "Cat name",
      label: "Cat name"
    },
    {
      id: 2,
      name: "sex",
      type: "radio",
      placeholder: "Gender",
      label: "Male",
      value: 'male',
      checked: "checked"
    },
    {
      id: 3,
      name: "sex",
      type: "radio",
      placeholder: "Gender",
      label: "Female",
      value: 'female',
    },
    {
      id: 4,
      name: "cat_birthdate",
      type: "date",
      placeholder: "Birthdate",
      label: "Birthdate"
    }
  ]
  // const navigate = useNavigate()
  const handleSubmit = e => {
    e.preventDefault();
    // try {
    // await axios.post("http://localhost:8800/cats", cat)
    // navigate("/")
    // } catch (error) {
    // console.log(error)
  }
  // }
  const onChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  };

  return (
    <div className="addwrap">
      <div className="add">
        <form onSubmit={handleSubmit}>
          <h1>Add a new cat</h1>
          {inputs.map((input) => (
            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          ))
          }
          <button className='formButton'>Send</button>
        </form>
      </div>
    </div>
  )
  // return (
  //   <div className="formwrap">
  //     <div className='form'>
  //       <h1> Add new cat</h1>
  //       <input type="text" placeholder='Cat name' onChange={handleChange} name='cat_name' />
  //       <label><input type="radio" onChange={handleChange} name='sex' value={'male'} defaultChecked />Male</label>
  //       <label><input type="radio" onChange={handleChange} name='sex' value={'female'} />Female</label>
  //       <label>Birthdate<input type="date" onChange={handleChange} name='cat_birthdate' /></label>
  //       <button className='formButton' onClick={handleClick}>Send</button>
  //     </div>
  //   </div>
  // )
}

export default Add
