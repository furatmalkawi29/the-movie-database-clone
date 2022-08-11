import React from 'react'
import {Home, MovieDetailsPage, SearchResultsPage, LoginPage} from '../pages'
import { Route, Routes } from 'react-router-dom';

export const Main = () => {
  // package.json
  // "homepage" :"https://furatmalkawi29.github.io/the-movie-database-clone",
// "private": true,
  return (
    <main>
      <Routes>
        <Route exact path={"/"} element={<Home/>}/>
        <Route exact path={"/login"} element={<LoginPage/>}/>
        <Route path={'/:mediaType/:id'} element={<MovieDetailsPage/>}/>
        <Route path={'/search'} element={<SearchResultsPage/>}/>
        {/* <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </main>
  )
}
