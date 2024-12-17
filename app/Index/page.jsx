import React from 'react'
import Hero from './Hero/Hero'
import Searchbar from './Searchbar/Searchbar'
import Categories from './Categories/Categories'
import Cardlist from './CardList/Cardlist'
import Projectcard from './CardList/Projectcard'
import Prblmcard from './Pblm/Prblmcard'
import Blogcard from './Blogcard/Blogcard'
import Summary from '../Course/Summary/[courseId]/page'

export default function Index() {
  return (
    <div>
      <Hero/>
      <Searchbar/>
      <Categories/>
      <Cardlist/>
      <Projectcard/>
      <Prblmcard/>
      <Blogcard/>
      <Summary/>
          </div>
  )
}

