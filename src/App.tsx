import { Auth } from 'components/pages/Auth'
import { Route, Routes } from 'react-router'
import { Layout } from './components/templates/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </Layout>
  )
}

export default App
