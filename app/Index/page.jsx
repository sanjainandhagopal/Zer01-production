
'use client';
import React, { useEffect, useState } from 'react'
import Hero from './Hero/Hero'
import Categories from './Categories/Categories'
import Cardlist from './CardList/Cardlist'
import Prblmcard from './Pblm/Prblmcard'
import Blogcard from './Blogcard/Blogcard'
import { fetchUser } from '../OperatorFunctions/userVerifier';
import { fetchCourses } from '../OperatorFunctions/courseProvider';
import Footer from '../Footer/page';
import { Slab } from 'react-loading-indicators';

export default function Index() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState("");

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

  if (loading) {
    return (
        <div className="flex w-full h-screen items-center justify-center bg-black">
            <div style={{ transform: 'rotate(180deg)' }}>
                <Slab color="#0e1c8e" size="large" text="" textColor="" />
            </div>
        </div>
    );
  }

  return (
    <div className='bg-black'>
      <Hero user={user} setLoading={setLoading}/>
      <div>
      <div className="w-full text-center my-5 text-2xl">
        <h2>Explore our courses here</h2>
      </div>
      <Categories setCategory={setCategory} />
      <Cardlist courses={courses} category={category} setLoading={setLoading}/>
      </div>
      {/* <Projectcard/> */}
      <div>
      <div className="w-full text-center my-5 text-2xl">
        <h2>Show your problem solving skill here</h2>
      </div>
      <Prblmcard setLoading={setLoading}/>
      </div>
      <div>
      <div className="w-full text-center my-5 text-2xl">
        <h2>Explore Daily updates here</h2>
      </div>
      <Blogcard setLoading={setLoading}/>
      </div>
      <Footer />
    </div>
  )
}

