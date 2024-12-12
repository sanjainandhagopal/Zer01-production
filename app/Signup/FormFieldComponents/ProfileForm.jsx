import React from 'react'

export default function ProfileForm({profileDetails}) {
  const {firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    mobileNo,
    setMobile,
    dateOfbirth,
    setDateOfBirth,
    profession,
    setProfession,
    organization, 
    setOrganiation} = profileDetails;
    
  return (
    <div>ProfileForm</div>
  )
}
