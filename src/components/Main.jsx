import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Home, MovieDetailsPage, SearchResultsPage,
   LoginPage, ProfilePage} from '../pages'

export const Main = () => {
  const { logIn } = useSelector(state => state);
  // package.json
  // "homepage" :"https://furatmalkawi29.github.io/the-movie-database-clone",
// "private": true,
  return (
    <main>
      <Routes>
        <Route exact path={"/"} element={<Home/>}/>
        <Route exact path={"/login"} element={<LoginPage/>}/>
        <Route path={'/profile'} element={<ProfilePage/>}/>
        <Route path={'/:mediaType/:id'} element={<MovieDetailsPage/>}/>
        <Route path={'/search'} element={<SearchResultsPage/>}/>
        {/* TODO: route premission for signin , find a scaleable method*/}
         {/* {logIn?.isLoggedIn?
          <Route path={'/profile'} element={<ProfilePage/>}/>:
          <Route exact path={"/login"} element={<LoginPage/>}/>
        } */}

        {/* <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </main>
  )
}
