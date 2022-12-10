import React from 'react'
import { Route, Routes } from 'react-router-dom';
import {Home, MovieDetailsPage, SearchResultsPage,
   LoginPage, ProfilePage} from '../pages'

export const Main = () => {
  return (
    <main>
      <Routes>
        <Route exact path={"/"} element={<Home/>}/>
        <Route exact path={"/login"} element={<LoginPage/>}/>
        <Route path={'/profile'} element={<ProfilePage/>}/>
        <Route path={'/:mediaType/:id'} element={<MovieDetailsPage/>}/>
        <Route path={'/search'} element={<SearchResultsPage/>}/>
      </Routes>
    </main>
  )
}
