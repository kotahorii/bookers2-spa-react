import { Auth } from 'components/pages/Auth'
import { Main } from 'components/pages/Main'
import { Route, Routes } from 'react-router'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  )
}

export default App
