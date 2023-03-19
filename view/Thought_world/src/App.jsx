import Navbar from './components/navbar'
import { AllRoutes } from './components/AllRoutes'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()


  return (
   <>
      {location.pathname == "/login" || location.pathname == '/register'  ? "" : <Navbar />}
      <AllRoutes />
   </>
  )
}

export default App
