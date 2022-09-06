import React from "react";
import Navbar from "../../components/Navbar";
// import MoviesList from "./components/MoviesList";
// import FormMovies from "./components/FormMovies";
// import GetMoviesList from "./components/GetMovies";
import DataMovies from "./components/DataMovies";
import AddMovies from "./components/AddMovies";
import Footer from "../../components/Footer"



const Home = () => {
  return (
    <>
      <Navbar />
      {/* <FormMovies/> */}
      {/* <MoviesList/> */}
      {/* <GetMoviesList/> */}
      <AddMovies/>
      <DataMovies/>
      <Footer/>

    </>
  );
};

export default Home;
