import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

export default function ProfileForm({profileDetails}) {
  const router = useRouter();
  const {
    email,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    mobileNo,
    setMobile,
    dateOfBirth,
    setDateOfBirth,
    profession,
    setProfession,
    organization, 
    setOrganiation} = profileDetails;

    const handleSubmit = async () => {
      if (password !== confirmPassword) {
          toast.error("Passwords do not match.");
          return;
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                email,
                firstName,
                lastName,
                password,
                mobileNo,
                dateOfBirth,
                profession,
                organization,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            toast.success("Registration successful!");
            router.push("/Index")
        } else {
            toast.error(data.message || "Registration failed.");
        }
      } catch (error) {
          toast.error(`Error in frontend : ${error}`);
      }
    };

  return (
    <div className="flex flex-col border-y-2 rounded-3xl border-gray-100 h-60 w-52 items-center justify-center hero-card backdrop-blur-xl">
      <div><label>
        <span>First Name</span>
        <input type="text" name="FirstName" id="FirstName" 
          placeholder='Enter your first name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label></div>
      <div>
      <label>
        <span>Last Name</span>
        <input type="text" name="LastName" id="LastName" 
          placeholder='Enter your last name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      </div>
     <div>
     <label>
        <span>Password</span>
        <input type="password" name="password" id="password" 
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
     </div>
      <div>
      <label>
        <span>Confirm Password</span>
        <input type="password" name="ConfirmPassword" id="ConfirmPassword" 
          placeholder='Enter your password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      </div>
      <div>
      <label>
        <span>Moile Number</span>
        <input type="tel" name="MobileNumber" id="MobileNumber" 
          placeholder='Enter your mobile number'
          value={mobileNo}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
      </label>
      </div>
      <div>
      <label>
        <span>Date of birth</span>
        <input type="date" name="DOB" id="DOB"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
      </label>
      </div>
      <div>
      <label>
        <span>Profession</span>
        <input type="text" name="profession" id="profession" 
          placeholder='Enter your proffession'
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          required
        />
      </label>
      </div>
      <div>
      <label>
        <span>Organization</span>
        <input type="text" name="organization" id="organization" 
          placeholder='Enter your organization'
          value={organization}
          onChange={(e) => setOrganiation(e.target.value)}
          required
        />
      </label>
      </div>

      <button type="button"
        onClick={handleSubmit}
      >Register</button>
    </div>
  )
}
