import React, {useEffect, useState} from 'react'
import './Login.css'
import { Navigate } from 'react-router-dom';

const Login = () => {

    const [mobile, setValuemobile] = useState("");
	let [message, setMessage] = useState("")
	let [notice, setNotice] = useState()
	let [value, setValue] = useState("")
	// store the phone number in the local storage to be reuse anytime
	localStorage.setItem("number", mobile)


	function call(){
	  if(notice === true){
		setValue("green")
		console.log(value)
	  }else if(notice === false){
		setValue("red")
	  }else{
		setValue("rgb(167, 3, 71)")
	  }
	}
  
	useEffect(() =>{
	  call()
	})

	const handleLogin = async (e) =>{
		e.preventDefault();
		let result = await fetch("http://localhost:5000/api/v1/validate/createuser",
		{
			method: "post",
			credencials: "include",
			body: JSON.stringify({ mobile }),
			headers: {
				"content-Type": "application/json",
			}
		}
		);
		result = await result.json();
		console.warn(result);
		console.log(result);

		if(result.success){
			setMessage(result.message)
			setNotice(true)
			setInterval(() => {
				Navigate('/otp')
			}, 1000);
		}else{
			setMessage("Please Enter a correct phone number")
			setNotice(false)
		}

		call()
	}

  return (
    <div className='login'>
      <div className="sub-login">
        <div className="box">
            <img src="" alt="" />
            <h1>Age Verification</h1>
            <p>To know if your customer is 18+ or not, Enter their phone number, this will only take a moment.</p>
            <form action="" onSubmit={handleLogin}>
                <label htmlFor="">Phone number</label>
                <input style={{
					border: notice ? `1.5px solid ${value}`  : `1.5px solid ${value}`
				}} type="number" name="number" placeholder='Enter your phone number'  onChange={(e) => setValuemobile(e.target.value)} />
                <small>{notice? message : message}</small>
				<input type="submit" value="NEXT" />
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
