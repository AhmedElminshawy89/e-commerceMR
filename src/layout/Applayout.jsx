import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import TopBar from "../components/TopBar"

const AppLayout = () => {
  return (
    <>
      <TopBar />
      <Header />
      <Outlet/>
      <Footer />
      </>
  )
}

export default AppLayout
