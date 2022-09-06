import axios from 'axios'
// import moment from 'moment'
import React, { useEffect, useState } from 'react'
// import Modal from 'react-modal';
// import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { PostMovies } from '../../../redux/actions/Movies'
import { Link, useNavigate } from 'react-router-dom'
import './AddMovies.css'

const AddMovies = () => {
  // const userLogin = JSON.parse(localStorage.getItem('userLogin')) ?? {}
  const { data } = useSelector((state) => state.post)
  const [formAddData, setFormAddData] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(PostMovies(data))
  }, [data])

  // const {error, loading } = useSelector((state) => state.post);
  // useEffect(()=> {

  // if(isLogin == false) {
  //   navigate('/login', {replace: true})
  // }},[isLogin])
  const formData = new FormData()
  const [genres, setGenres] = useState([])
  const getGenres = async () => {
    const result = [{ text: 'Choose Genre', value: 0 }]
    const data_genre = await fetch('http://localhost:9511/api/v5/genres')
    const value = await data_genre.json()
    value.data.map((item) => {
      result.push({
        text: item.gen_name,
        value: item.genre_id,
      })
    })
    setGenres(result)
  }
  useEffect(() => {
    getGenres()
  }, [])

  const options = [{ value: '', text: '--Choose an option--' }]

  const [select, setSelect] = useState(options[0].value)

  const handleChange = (event) => {
    setSelect(event.target.value)
    setFormAddData((prevData) => ({
      ...prevData,
      genre_id: event.target.value,
    }))
  }
  formData.append('cover', formAddData.cover)
  formData.append('title', formAddData.title)
  formData.append('release_date', formAddData.release_date)
  formData.append('duration', formAddData.duration)
  formData.append('director', formAddData.director)
  formData.append('description', formAddData.description)
  formData.append('casts', formAddData.casts)
  formData.append('genre_id', formAddData.genre_id)

  const [refetch, setRefetch] = useState(false)
  const handleAddNewMovies = (event) => {
    event.preventDefault()
    dispatch(PostMovies(formData, data.token))
    alert('Successfully Added')
    setRefetch(!refetch)
  }

  useEffect(() => {}, [])

  // const [selectedImage, setSelectedImage] = useState()
  // const handleImageChange = event =>{
  //     setSelectedImage(event.target.files[0])
  //     setFormAddData(prevData => ({ ...prevData, cover: event.target.files[0] }))
  // }

  return (
    <>
      <div className="row-container-form">
        <div className="title-form">
          <h3>Form Movie</h3>
        </div>
        <div className="card-movie-form">
          <form
            onSubmit={(event) => handleAddNewMovies(event)}
            className="form-movies"
            encType="multipart/form-data"
          >
            <div className="top">
              <div className="card-top1">
                <input
                  type="file"
                  onChange={(event) =>
                    setFormAddData((prevData) => ({
                      ...prevData,
                      cover: event.target.files[0],
                    }))
                  }
                ></input>
                {/*                             
                            {selectedImage && (
                                <div style={styles.preview}>
                                <img
                                src={selectedImage}
                                style={styles.image}
                                alt="title"/>
                                </div>
                            )} */}
              </div>
              <div className="card-top2">
                <label className="label-title">Name</label>
                <input
                  type="text"
                  placeholder="write the tilte"
                  onChange={(event) =>
                    setFormAddData((prevData) => ({
                      ...prevData,
                      title: event.target.value,
                    }))
                  }
                />
                <label className="label-director">Director</label>
                <input
                  type="text"
                  placeholder="write the director"
                  onChange={(event) =>
                    setFormAddData((prevData) => ({
                      ...prevData,
                      director: event.target.value,
                    }))
                  }
                />
                <label className="label-release-date">Release Date</label>
                <input
                  type="date"
                  onChange={(event) =>
                    setFormAddData((prevData) => ({
                      ...prevData,
                      release_date: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="card-top3">
                <label className="genre">Genre</label>
                <select
                  className="select-genres"
                  value={select}
                  onChange={handleChange}
                >
                  {genres.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
                <label className="label-casts">Casts</label>
                <input
                  type="text"
                  onChange={(event) =>
                    setFormAddData((prevData) => ({
                      ...prevData,
                      casts: event.target.value,
                    }))
                  }
                />
                <label className="label-casts">Duration</label>
                <input
                  type="text"
                  onChange={(event) =>
                    setFormAddData((prevData) => ({
                      ...prevData,
                      duration: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="bottom">
              <label className="label-casts">Synopsis</label>
              <input
                type="text"
                onChange={(event) =>
                  setFormAddData((prevData) => ({
                    ...prevData,
                    description: event.target.value,
                  }))
                }
              />
            </div>
            <div className="btn-confirm">
              <div className="btn-confirm1">
                <button type="submit" className="btn-save">
                  Submit
                </button>
              </div>
              <div className="btn-confirm2">
                <button className="btn-cancel" type="reset" value="Reset">
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddMovies
