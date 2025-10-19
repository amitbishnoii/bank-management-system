import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Login from "./pages/Login"
import Register from "./pages/Register"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Withdraw from "./pages/Withdraw";
import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={
            <Layout>
              <Login />
            </Layout>
          } />
          <Route path="/register" element={
            <Layout>
              <Register />
            </Layout>
          } />
          <Route path="/:username/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
        </Routes>
      </Router>
      <Layout>

      <Deposit />
      </Layout>
    </>
  )
}

export default App
