import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import MainNavigation from './mainNavigation'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
// ... normal setup, create store and persistor, import components etc.
// const {store, persistor} = configureStore
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  )
}

export default App

// import logo from './logo.svg';
// import './App.css';
// import { Route, Routes } from 'react-router-dom';
// import {Home, Movies} from './Pages';
// import Auth from './Pages/Auth';
// import MovieDetails from './Pages/Movies/components/MovieDetails';

// const App = () => {
//   return (
//     <Routes>
//       <Route path='/' element={<Home/>}/>
//       <Route path='/movies' element={<Movies/>}/>
//       <Route path='/login' element={<Auth/>}/>
//       <Route path='/movie-details' element={<MovieDetails/>}/>

//     </Routes>
//   )
// }

// export default App;

// import logo from './logo.svg';
// import './App.css';
// import { Route, Routes } from 'react-router-dom';
// import {Home} from './Pages';

// const App = () => {
//   return (
//     <Routes>
//       <Route path='/' element={<Home/>}/>
//     </Routes>
//   )
// }

// export default App;
