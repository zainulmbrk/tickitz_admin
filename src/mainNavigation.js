// import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Dashboard } from './Pages'
import AuthLogin from './Pages/Auth'
import AuthRegister from './Pages/AuthRegister'
// import AuthSignup from './Pages/AuthSignup';
// import MovieDetails from './Pages/Movies/components/MovieDetails';
// import PrivateRoute from "./route/PrivateRoute";
import PublicRoute from './route/PublicRoute'

const MainNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <AuthLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PublicRoute>
              <Dashboard />
            </PublicRoute>
          }
        />
        {/* <Route path='/movies' element=
          {<PublicRoute><Movies/></PublicRoute>}/> */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <AuthRegister />
            </PublicRoute>
          }
        ></Route>
        {/* <Route path='/movie-details' element=
          {<PrivateRoute><MovieDetails/></PrivateRoute>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default MainNavigation
