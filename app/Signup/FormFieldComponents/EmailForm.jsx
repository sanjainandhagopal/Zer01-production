import React from 'react'

export default function EmailForm({emailDetails}) {
  const {email, setEmail, setVerify} = emailDetails;

  return (
    <div>
      <input type="email" name="email" id="email"
        placeholder='Enter your email'
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button
        type='button'
        onClick={handleGenerateOtp}
      >Generate OTP</button>
    </div>
  )
}
