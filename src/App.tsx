import { Auth } from 'components/pages/Auth'
import { Main } from 'components/pages/Main'
import { Users } from 'components/pages/Users'
import { Route, Routes } from 'react-router'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/main" element={<Main />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  )
}

export default App
