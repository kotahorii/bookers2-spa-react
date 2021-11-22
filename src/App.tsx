import { Auth } from 'components/pages/Auth'
import { Main } from 'components/pages/Main'
import { MyPage } from 'components/pages/MyPage'
import { Users } from 'components/pages/Users'
import { PrivateRoute } from 'components/templates/PrivateRoute'
import { PublicRoute } from 'components/templates/PublicRoute'
import { Route, Routes } from 'react-router'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />
      <Route
        path="/main"
        element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
      <Route
        path="/myPage"
        element={
          <PrivateRoute>
            <MyPage />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default App
