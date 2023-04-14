import React, { useEffect, useState} from 'react'
import './Login.css'
import './Otp.css'
import { FcApproval } from 'react-icons/fc'
import { HiXCircle } from 'react-icons/hi'

const Otp = () => {

    
  // declared a variable to store the otp
  const [otp, setValueOTP] = useState()
	let [message, setMessage] = useState("")
	let [notice, setNotice] = useState()
  let [value, setValue] = useState("")
  let [pup, pupValue] =  useState(true)

  
  // get the phone number stored in the local storage
  const mobile = localStorage.getItem("number")
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

	const handleOTP = async (e) =>{
		e.preventDefault();
		let result = await fetch("http:localhost:5000/api/v1/validate/validateotp",
		{
			method: "post",
			credencials: "include",
      // post both the phone number and the otp received by the user
			body: JSON.stringify({ mobile, otp }),
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
		}else{
			setMessage("Wrong OTP")
			setNotice(false)
		}
    setInterval(() => {
      pupValue(!value)
    }, 2000);

    call()
	}

  function pupClick(){
    pupValue(!pup)
  }

  return (
    <div className='login'>
      <div className="sub-login">
        <div className="box">
            <img src="" alt="" />
            <h1>Age Verification</h1>
            <p>Please enter the OTP sent to {mobile}</p>
            <form action="" onSubmit={handleOTP}>
                <label style={{
                  color: value
                }}>{notice? message : message}</label>
                <input style={{
                  border: `1.5px solid ${value}`
                }} type="number" name="number" placeholder='Enter OTP'  onChange={(e) => setValueOTP(e.target.value)}  />
                {/* <span>Didn't receive the OTP? Resend OTP</span> */}
                <input type="submit" value="NEXT" />
            </form>
            <span>Didn't receive the OTP? Resend OTP</span>
        </div>

        <div className="pup" style={{
          display: pup ? "flex" : "none"
        }}>
          <div className="pup-up-box">
              {/* <FcApproval /> */}
              <HiXCircle />
              <h1>Woo hoo</h1>
              <p>Hello, we've successfully verified Obanla Samuel's age, he/she is 18+</p>
              <button onClick={pupClick}>close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Otp
