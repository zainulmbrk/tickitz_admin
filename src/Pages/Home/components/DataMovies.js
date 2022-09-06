import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GetMovies } from '../../../redux/actions/Movies'
import { DeleteMovies } from '../../../redux/actions/Movies'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './DataMovies.css'

const Loading = () => {
  return <div>Loading .....</div>
}

const DataMovies = () => {
  const { data } = useSelector((state) => state.auth)
  const { deleteData } = useSelector((state) => state.delete)
  const getData = useSelector((state) => state.movies)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetMovies(data))
  }, [data])

  //DELETE
  const handleDelete = (event) => {
    event.preventDefault()
    if (window.confirm('Are You Sure?')) {
      // event.preventDefault()
      dispatch(DeleteMovies(data.token))
    }
  }

  const searchMovies = async () => {
    const getTitle = await fetch('http://localhost:9511/api/v5/movies')
    const value = await getTitle.json()
    const results = value.data
  }
  useEffect(() => {
    searchMovies()
  }, [])

  return (
    <>
      <div className="row-datamovies">
        <div className="header">
          <h3>Data Movies</h3>
          <input
            className="search"
            type="search"
            placeholder="Search Movie Name..."
          ></input>
        </div>
        <div className="card-datamovies">
          <div className="content">
            {getData.results.map((movies, index) => (
              <div className="cover" key={index}>
                <img
                  src={`http://localhost:9511/uploads/${movies.cover}`}
                  alt={movies.title}
                  title={movies.title}
                />
                <div className="text-info">
                  <h5 className="title" alt={movies.title}>
                    {movies.title}
                  </h5>
                  <p className="genre" alt={movies.gen_name}>
                    {movies.gen_name}
                  </p>
                </div>
                <div className="btn-action">
                  <button className="btn-edit">Edit Movies</button>
                  <button
                    className="btn-delete"
                    onClick={(event) => handleDelete(event)}
                  >
                    Delete Movies
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default DataMovies

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GetMovies } from "../../../redux/actions/Movies";
// import {Link, useNavigate, useSearchParams} from "react-router-dom"
// // import { AuthLogout } from "../../redux/actions/Auth";
// import './DataMovies.css'

// const DataMovies = () =>{
//     const {data, error, loading } = useSelector((state) => state.movies);
//     const dispatch = useDispatch();
//     const {isLogin} = useSelector((state) => state.auth); //required

//     const navigate = useNavigate()

//     useEffect(() => {
//       dispatch(GetMovies());
//       console.log(data, "asdfg")
//     }, []); //require ketika get Dta

//     return (<>
//       {/* {isLogin ? (
//         <button className="btn btn-danger" onClick={()=> {
//           dispatch(AuthLogout())
//         }}>Logout</button>
//       ):(
//         <Link to={'/login'} ><button className="btn btn-primary">Login Bre!</button></Link>
//       )} */}

//       <div className="data-movies">
//         {data.results.map((movies) => {
//           return (

//             <div className='card-movie-details'key={movies}>
//                 <img className='cover'
//                 src={`http://localhost:9511/uploads/${movies.cover}`}
//                 alt={movies.title}
//                 title={movies.title}/>
//                 <div className='btn-action'>
//                 <button className='btn-modal-delete'
//                 onClick={()=>handleDelete(movies.movies_id)}>Delete Movies</button>
//                 <button className='btn-modal-edit' onClick={modalEdit}>Edit Movies</button>
//                 </div>
//                             <Modal
//                             isOpen={modalEditIsOpen}
//                             onRequestClose={modalEditClose}>
//                                 <h2>Edit Movies</h2>

//                                 <form onSubmit={(e) => handleUpdateMovie(e)} className='form-edit-data'>
//                                 <div className='movies-id'>
//                                 <label className='form-label'>Movies Id:</label>
//                                 <input className='input-label' type="text" placeholder="write the movie id" onChange={(e) => {
//                                 setFormEditData(prevState => ({ ...prevState, movies_id: e.target.value }))}}></input>
//                                 </div>
//                                 <div className='title'>
//                                 <label className='form-label'>Title: </label>
//                                 <input className='input-label' type="text" placeholder='write the title' onChange={(e) => {
//                                 setFormEditData(prevState => ({ ...prevState, title: e.target.value }))}}></input>
//                                 </div>
//                                 <div className='director'>
//                                 <label className='form-label'>Director: </label>
//                                 <input className='input-label' type="text" placeholder='write the director' onChange={(e) => {
//                                 setFormEditData(prevState => ({ ...prevState, director: e.target.value }))}}></input>
//                                 </div>
//                                 <div className='release-date'>
//                                 <label className='form-label'>Release Date: </label>
//                                 <input type="date" className="input-label" placeholder='write the date' onChange={(e) => {
//                                 setFormEditData(prevState => ({ ...prevState, release_date: e.target.value }))}}/>
//                                 </div>
//                                 <div className='casts'>
//                                 <label className='form-label'>Casts: </label>
//                                 <input className='input-label' type="text" placeholder='write the casts' onChange={(e) => {
//                                 setFormEditData(prevState => ({ ...prevState, casts: e.target.value }))}}></input>
//                                 </div>
//                                 <div className='cover'>
//                                 <label className='form-label'>Cover: </label>
//                                 <input className='input-label' type="text" placeholder='write the cover' onChange={(e) => {
//                                 setFormEditData(prevState => ({ ...prevState, cover: e.target.value }))}}></input>
//                                 </div>
//                                 <div className='genre'>
//                                 <label>Genre: </label>
//                                 <select className='select-genres' value={select} onChange={handleChange}>
//                                     {genres.map(option => (
//                                     <option key={option.value} value={option.value}>
//                                     {option.text}
//                                     </option>
//                                 ))}
//                                 </select>
//                                 </div>
//                                 <div className='description'>
//                                 <label className='form-label'>Synopsis: </label>
//                                 <textarea className='input-area' onChange={(e) => {
//                                 setFormEditData(prevState => ({ ...prevState, description: e.target.value }))}}></textarea>
//                                 </div>
//                                 <div className='btn-confirm'>
//                                     <div className='btn-confirm1'>
//                                     <button className='btn-save' onClick={(e)=> handleUpdateMovie(e)}>save</button>
//                                     </div>
//                                     <div className='btn-confirm2'>
//                                     <button className='btn-cancel' onClick={modalEditClose}>cancel</button>
//                                     </div>
//                                 </div>
//                                 </form>

//                             </Modal>

//             </div>

//           );
//         })}
//       </div>
//     </>);
// }

// export default DataMovies
