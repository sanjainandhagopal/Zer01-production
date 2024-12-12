import React from 'react'

export default function MirrorForm({mirrorDetails}) {
  const {
    email,
    firstName,
    lastName,
    password,
    mobileNo,
    dateOfbirth,
    profession,
    organization} = mirrorDetails;

  return (
    <div>
      <label>Email: {email}</label>
      <label>First Name: {firstName}</label>
      <label>Last Name: {lastName}</label>
      <label>Password: {password}</label>
      <label>Mobile No: {mobileNo}</label>
      <label>DOB: {dateOfbirth}</label>
      <label>Profession: {profession}</label>
      <label>Organization: {organization}</label>
    </div>
  )
}
