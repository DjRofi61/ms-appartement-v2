import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import Exemple from './pages/exemple'
import Layout from './Layout'
import axios from 'axios'
import ProfilePage from './pages/ProfilePage'
import PlacesFormPage from './pages/PlacesFormPage'
import PlacePage from './pages/PlacePage'

axios.defaults.baseURL="http://localhost:4000"

function App() {

  return (
   
    <Routes>
       <Route path="/" element={<Layout />} >
       <Route index element={<IndexPage />} />
       <Route path='/account' element={<ProfilePage />} />
       <Route path="/account/places" element={<IndexPage />} />
       <Route path='/account/:subpage/:action' element={<PlacesFormPage />}/>
       <Route path='/places/:id' element={<PlacePage />}/>
      
     </Route>
    </Routes>

     
  
  )
}

export default App
