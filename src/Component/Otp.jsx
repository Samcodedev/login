import React, { useEffect, useState} from 'react'
import './Login.css'
import './Otp.css'
import { FcApproval } from 'react-icons/fc'
import { HiXCircle } from 'react-icons/hi'

const Otp = () => {

    
  // declared a variable to store the otp
  const [otp, setValueOTP] = useState()
	let [message, setMessage] = useState(" ")
	let [notice, setNotice] = useState( )
  let [value, setValue] = useState("")
  let [pup, pupValue] =  useState()

  
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

  function pupClick(){
    pupValue(!pup)
  }

	const handleOTP = async (e) =>{
    
    // pupClick()
    setTimeout(() => {
      pupValue(true)
    }, 3500);

		e.preventDefault();
		let result = await fetch("https://yv-hackathon-backend-mxfqmptpeq-uc.a.run.app/api/v1/validate/validateotp",
		{
			method: "post",
			credentials: "omit",
      // post both the phone number and the otp received by the user
			body: JSON.stringify({ mobile, otp }),
      mode: "cors",
			headers: {
				"content-Type": "application/json",
			}
		}
		);
		result = await result.json();
		console.warn(result);
		console.log(result);

		if(result.success === true){
			setMessage(result.message)
			setNotice(true)
		}else{
			setMessage("Wrong OTP")
			setNotice(false)
		}


	}

  useEffect(() =>{
    call()
  })

  return (
    <div className='login'>
      <div className="sub-login">
        <div className="box" style={{
          filter: pup ? "blur(8px)" : "none"
        }}>
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
              {
                notice ? <FcApproval /> : <HiXCircle />
              }
              <h1>Woo hoo</h1>
              <p>{ message !== " " || null || undefined ? `${message}` : "Something went wrong, check your internet connection." }</p>
              <button onClick={pupClick}>close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Otp