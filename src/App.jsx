import { Outlet, Route, Routes } from "react-router";
import Header from "./components/Header";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";



function App() {

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />

    </>
  )
}

export default App
