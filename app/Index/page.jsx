'use client';
import React, { useEffect, useState } from 'react'
import Hero from './Hero/Hero'
import Categories from './Categories/Categories'
import Cardlist from './CardList/Cardlist'
import Projectcard from './CardList/Projectcard'
import Prblmcard from './Pblm/Prblmcard'
import Blogcard from './Blogcard/Blogcard'
import Footer from './Footer/page'
import { fetchUser } from '../OperatorFunctions/userVerifier';
import { fetchCourses } from '../OperatorFunctions/courseProvider';

export default function Index() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  const [category, setCategory] = useState("")

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorCourses, setErrorCourses] = useState(null);

  // Fetch user details on mount
  useEffect(() => {
    fetchUser(setUser, setLoadingUser, setErrorUser);
  }, []);

  // Fetch all courses on mount
  useEffect(() => {
    fetchCourses(setCourses, setLoadingCourses, setErrorCourses);
  }, []);

  return (
    <div>
      <Hero user={user}/>
      <Categories setCategory={setCategory} />
      <Cardlist courses={courses} category={category}/>
      <Projectcard/>
      <Prblmcard/>
      <Blogcard/>
      <Footer />
    </div>
  )
}

