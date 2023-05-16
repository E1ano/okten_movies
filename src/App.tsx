import React, {useEffect} from 'react';
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import classes from "./App.module.scss";

function App() {

  return (
    <div className={classes.contentWrapper}>
        <Topbar/>
        <Sidebar/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/movies" element={<MoviesPage/>}/>
            <Route path="/categories" element={<CategoriesPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
