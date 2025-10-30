import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Login from "./pages/Login"
import Register from "./pages/Register"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";
import Layout from "./components/Layout";
import Admin from "./pages/Admin";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/" element={
            <Login />
          } />
          <Route path="/register" element={
            <Register />
          } />
          <Route path="/:username/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/:username/deposit" element={
            <Layout>
              <Deposit />
            </Layout>
          } />
          <Route path="/:username/withdraw" element={
            <Layout>
              <Withdraw />
            </Layout>
          } />
          <Route path="/:username/transfer" element={
            <Layout>
              <Transfer />
            </Layout>
          } />
          <Route path="/adminPage" element={
              <Admin />
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
