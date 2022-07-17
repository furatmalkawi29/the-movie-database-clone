import React from 'react'
import Home from '../pages/Home'
import MovieDetailsPage from '../pages/MovieDetailsPage'
import SearchResultsPage from '../pages/SearchResultsPage'
import { Route, Routes } from 'react-router-dom';

export default function Main () {
  // package.json
  // "homepage" :"https://furatmalkawi29.github.io/the-movie-database-clone",
// "private": true,
  return (
    <main>
      <Routes>
        <Route exact path={"/"} element={<Home/>}/>
        <Route path={'/movie/:id'} element={<MovieDetailsPage/>}/>
        <Route path={'/tv/:id'} element={<MovieDetailsPage/>}/>
        <Route path={'/search'} element={<SearchResultsPage/>}/>
        {/* <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </main>
  )
}
