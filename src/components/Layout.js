import { Outlet } from "react-router-dom"
import HeaderNav from "./HeaderNav"

const Layout = () => {
  return (
    <div>
        <HeaderNav />
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default Layout