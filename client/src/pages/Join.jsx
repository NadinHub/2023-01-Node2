// import axios from 'axios';
import React, { useState } from 'react'
import FormInput from './components/FormInput';
import "./join.css"

const Join = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });
  // our object in useState - used in the first time rendering
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username should be 3-16 characters and shouldn't include any special character.",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
      // className:"joinInput"
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
      // className:"joinInput"
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      errorMessage: "",
      label: "Birthday",
      // className:"joinInput"
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 characters and include at least 1 letter and 1 number",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^＆*]{8,20}$`,
      required: true,
      // className:"joinInput"
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match.",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
      // className:"joinInput"
    },
    //   {id: 6,
    //   name: "sex",
    //   type: "radio",
    //   placeholder: "Gender",
    //   label: "Male",
    //   checked: true,
    // },
    // {
    //   id: 7,
    //   name: "sex",
    //   type: "radio",
    //   placeholder: "Gender",
    //   errorMessage: "",
    //   label: "Female",
    //   checked: false,
    // }
  ]

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
    <div className="joinwrap">
      <div className="join">
        <form className="joinform" onSubmit={handleSubmit}>
          <h1>Join us</h1>
          {inputs.map((input) => (
            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          ))
          }
          <button className='joinButton'>Send</button>
        </form>
      </div>
    </div>
  )

}

export default Join
