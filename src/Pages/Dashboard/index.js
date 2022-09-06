import axios from 'axios'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { DeleteMovies } from '../../redux/actions/Movies'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const Loading = () => {
  return <div>Loading...</div>
}

export const Dashboard = () => {
  const [refetch, setRefetch] = useState('')
  //get movies
  const [query, setQuery] = useState('')
  const [dataMovie, setDataMovie] = useState({ data: {} })
  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:9511/api/v5/movies/?title=${query}`,
    })
      .then((res) => {
        setDataMovie(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [query])

  //post movies
  const { data } = useSelector((state) => state.auth)
  const [formAddData, setFormAddData] = useState({})
  const [formEditData, setFormEditData] = useState('')
  const formData = new FormData()

  //   var release_date = new Date(formAddData.release_date);
  //   var date = curr.toISOString().substr(0,10);

  formData.append('cover', formAddData.cover || formEditData.cover)
  formData.append('title', formAddData.title || formEditData.title)
  formData.append('genre', formAddData.genre || formEditData.genre)
  formData.append(
    'release_date',
    formAddData.release_date || formEditData.release_date,
  )
  formData.append('hours', formAddData.hours || formEditData.hours)
  formData.append('minutes', formAddData.minutes || formEditData.minutes)
  formData.append('director', formAddData.director || formEditData.director)
  formData.append(
    'description',
    formAddData.description || formEditData.description,
  )
  formData.append('casts', formAddData.casts || formEditData.casts)

  const handleAddNewMovies = async (event) => {
    event.preventDefault()
    try {
      const results = await axios({
        method: 'POST',
        url: `http://localhost:9511/api/v5/movies`,
        data: formData,
        headers: {
          authorization: data.token,
        },
      })
      if (results) {
        alert('Add New Movies Succes')
        setRefetch(!refetch)
      }
    } catch (error) {
      alert(error)
    }
  }

  //delete movies
  const { datas = data } = useSelector((state) => state.auth)
  const handleDelete = async (movies_id) => {
    try {
      const result = await axios({
        method: 'DELETE',
        url: `http://localhost:9511/api/v5/movies/${movies_id}`,
        headers: {
          authorization: datas.token,
        },
      })
      if (window.confirm('Are You Sure') == true) {
        if (result) {
          alert('Delete Movies Success')
        }
      }
    } catch (error) {
      alert(error)
    }
  }

  //edit movies

  const handleEditMovie = (previousData) => {
    setFormEditData({
      ...previousData,
      release_date: moment(previousData.release_date).format('dd mm yyyy'),
    })
  }

  const handleUpdateMovie = async (movies_id) => {
    // event.preventDefault()
    try {
      const results = await axios({
        method: 'PATCH',
        url: `http://localhost:9511/api/v5/movies/${movies_id}`,
        data: formData,
        headers: {
          authorization: data.token,
        },
      })
      if (results) {
        alert('Update Movies Succes')
        setRefetch(!refetch)
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <div className="col">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="type here"
                aria-label="Search"
                aria-describedby="basic-addon1"
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="col d-flex align-items-center justify-content-end">
            <button
              type="button"
              className="btn btn-success bi bi-plus rounded"
              data-bs-toggle="modal"
              data-bs-target="#addMovie"
            >
              Add Movie
            </button>
          </div>
        </div>
        {/* Modal Add Movies */}
        <div
          className="modal fade"
          id="addMovie"
          tabDashboard="-1"
          aria-labelledby="addMovie"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addMovie">
                  Add New Movie
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form
                className="d-flex flex-column"
                onSubmit={handleAddNewMovies}
                encType="multipart/form-data"
              >
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="movieTitle" className="form-label">
                      Title
                    </label>
                    <input
                      type={'title'}
                      className="form-control"
                      id="movieTitle"
                      placeholder="type here"
                      onChange={(event) =>
                        setFormAddData((prevData) => ({
                          ...prevData,
                          title: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieGenre" className="form-label">
                      Genre
                    </label>
                    <input
                      type={'genre'}
                      className="form-control"
                      id="movieGenre"
                      placeholder="type here"
                      onChange={(event) =>
                        setFormAddData((prevData) => ({
                          ...prevData,
                          genre: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieRelease" className="form-label">
                      Release Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="movieRelease"
                      placeholder="type here"
                      onChange={(event) =>
                        setFormAddData((prevData) => ({
                          ...prevData,
                          release_date: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieHours" className="form-label">
                      Hours
                    </label>
                    <input
                      type={'hours'}
                      className="form-control"
                      id="movieHours"
                      placeholder="type here"
                      onChange={(event) =>
                        setFormAddData((prevData) => ({
                          ...prevData,
                          hours: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieMinutes" className="form-label">
                      Minutes
                    </label>
                    <input
                      type={'minutes'}
                      className="form-control"
                      id="movieMinutes"
                      placeholder="type here"
                      onChange={(event) =>
                        setFormAddData((prevData) => ({
                          ...prevData,
                          minutes: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieDirector" className="form-label">
                      Director
                    </label>
                    <input
                      type={'director'}
                      className="form-control"
                      id="movieDirector"
                      placeholder="type here"
                      onChange={(event) =>
                        setFormAddData((prevData) => ({
                          ...prevData,
                          director: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieCasts" className="form-label">
                      Casts
                    </label>
                    <input
                      type={'casts'}
                      className="form-control"
                      id="movieCasts"
                      placeholder="type here"
                      onChange={(event) =>
                        setFormAddData((prevData) => ({
                          ...prevData,
                          casts: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      type={'description'}
                      className="form-control"
                      id="movieDescription"
                      placeholder="type here"
                      onChange={(event) =>
                        setFormAddData((prevData) => ({
                          ...prevData,
                          description: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieCover" className="form-label">
                      Cover
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="movieCover"
                      placeholder="type here"
                      onChange={(event) =>
                        setFormAddData((prevData) => ({
                          ...prevData,
                          cover: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="reset"
                    value="Reset"
                    className="btn btn-secondary rounded"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary rounded"
                    onClick={(event) => handleAddNewMovies(event)}
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* end Modal */}

        {/* Modal Edit Movies */}
        <div
          className="modal fade"
          id="editMovie"
          tabDashboard="-1"
          aria-labelledby="editMovie"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editMovie">
                  Edit Movie
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form
                className="d-flex flex-column"
                onSubmit={handleUpdateMovie}
                encType="multipart/form-data"
              >
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="movieTitle" className="form-label">
                      Title
                    </label>
                    <input
                      type={'title'}
                      className="form-control"
                      id="movieTitle"
                      placeholder="type here"
                      value={formEditData.title}
                      onChange={(event) =>
                        setFormEditData((prevData) => ({
                          ...prevData,
                          title: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieGenre" className="form-label">
                      Genre
                    </label>
                    <input
                      type={'genre'}
                      className="form-control"
                      id="movieGenre"
                      placeholder="type here"
                      value={formEditData.genre}
                      onChange={(event) =>
                        setFormEditData((prevData) => ({
                          ...prevData,
                          genre: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieRelease" className="form-label">
                      Release Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="movieRelease"
                      placeholder="type here"
                      onChange={(event) =>
                        setFormEditData((prevData) => ({
                          ...prevData,
                          release_date: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieHours" className="form-label">
                      Hours
                    </label>
                    <input
                      type={'hours'}
                      className="form-control"
                      id="movieHours"
                      placeholder="type here"
                      value={formEditData.hours}
                      onChange={(event) =>
                        setFormEditData((prevData) => ({
                          ...prevData,
                          hours: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieMinutes" className="form-label">
                      Minutes
                    </label>
                    <input
                      type={'minutes'}
                      className="form-control"
                      id="movieMinutes"
                      placeholder="type here"
                      value={formEditData.minutes}
                      onChange={(event) =>
                        setFormEditData((prevData) => ({
                          ...prevData,
                          minutes: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieDirector" className="form-label">
                      Director
                    </label>
                    <input
                      type={'director'}
                      className="form-control"
                      id="movieDirector"
                      placeholder="type here"
                      value={formEditData.director}
                      onChange={(event) =>
                        setFormEditData((prevData) => ({
                          ...prevData,
                          director: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieCasts" className="form-label">
                      Casts
                    </label>
                    <input
                      type={'casts'}
                      className="form-control"
                      id="movieCasts"
                      placeholder="type here"
                      value={formEditData.casts}
                      onChange={(event) =>
                        setFormEditData((prevData) => ({
                          ...prevData,
                          casts: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      type={'description'}
                      className="form-control"
                      id="movieDescription"
                      placeholder={formEditData.description}
                      onChange={(event) =>
                        setFormEditData((prevData) => ({
                          ...prevData,
                          description: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="movieCover" className="form-label">
                      Cover
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="movieCover"
                      placeholder="type here"
                      onChange={(event) =>
                        setFormEditData((prevData) => ({
                          ...prevData,
                          cover: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="reset"
                    value="Reset"
                    className="btn btn-secondary rounded"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary rounded"
                    onClick={(event) => handleUpdateMovie(event)}
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* end Modal */}
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Category Name</th>
              <th scope="col">Release Date</th>
              <th scope="col">Genre</th>
              <th scope="col">Director</th>
              <th scope="col">Casts</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {!dataMovie?.results ? (
            <Loading />
          ) : (
            dataMovie?.results?.map((item, index) => {
              return (
                <>
                  <tbody>
                    <tr>
                      <td scope="row" key={index}>
                        {item.movies_id}
                      </td>
                      <td>{item.title}</td>
                      <td>{moment(item.release_date).format('DD-MM-YYYY')}</td>
                      <td>{item.genre}</td>
                      <td>{item.director}</td>
                      <td>{item.casts}</td>
                      <td className="d-flex justify-content-evenly align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-primary bi bi-pencil rounded text-center"
                          title="edit movie"
                          data-bs-toggle="modal"
                          data-bs-target="#editMovie"
                          onClick={() => handleEditMovie(item)}
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-danger bi bi-trash rounded text-center"
                          title="delete movie"
                          value={item.movies_id}
                          onClick={(event) => handleDelete(event.target.value)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </>
              )
            })
          )}
        </table>
        <br />
        <br />
      </div>
      <Footer />
    </>
  )
}
