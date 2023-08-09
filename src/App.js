import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <section>
        <Header />
        <div className="container">
          <Outlet />
          <ToastContainer />
        </div>
        <Footer />
    </section>
  )
}

export default App
