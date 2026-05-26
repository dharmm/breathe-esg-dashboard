import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/upload"
          element={<Upload />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App