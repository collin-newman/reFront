import Map from './components/Map'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PropertyDetails from './components/PropertyDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/details/:id" element={<PropertyDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
