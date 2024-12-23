'use client';
import React, { useEffect, useState } from 'react'
import Hero from './Hero/Hero'
import Searchbar from './Searchbar/Searchbar'
import Categories from './Categories/Categories'
import Cardlist from './CardList/Cardlist'
import Projectcard from './CardList/Projectcard'
import Prblmcard from './Pblm/Prblmcard'
import Blogcard from './Blogcard/Blogcard'
import Summary from '../Course/Summary/[courseId]/page'
import Footer from './Footer/page'
import { fetchUser } from '../OperatorFunctions/userVerifier';

export default function Index() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  // Fetch user details on mount
  useEffect(() => {
    fetchUser(setUser, setLoadingUser, setErrorUser);
  }, []);
  return (
    <div>
      <Hero user={user}/>
      <Searchbar/>
      <Categories/>
      <Cardlist/>
      <Projectcard/>
      <Prblmcard/>
      <Blogcard/>
      <Footer />
    </div>
  )
}

