import Homepage from "./Pages/Homepage/Homepage"
import LoginPage from "./Pages/LoginPage/LoginPage"
import RegisterPage from "./Pages/RegisterPage/RegisterPage"
import Catalogue from "./Pages/Catalogue/Catalogue"
import CurrentProductInfo from "./Pages/CurrentProductInfo/CurrentProductInfo"
import Profile from "./Pages/Profile/profile"
import Cart from "./Pages/Cart/cart"
import AdminPage from "./Pages/AdminPage/adminpage"

import { BrowserRouter, Routes, Route } from "react-router"
import Layout from "./Layout"
import ForbiddenPage from "./Pages/ForbiddenPage/forbiddenpage"
import UnauthPage from "./Pages/UnauthorizedPage/unauthpage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Homepage/>}/>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="catalogue">
              <Route index element={<Catalogue/>}/>
              <Route path=":productID" element={<CurrentProductInfo/>}/>
            </Route>
            <Route path="profile" element={<Profile/>}/>
            <Route path="cart" element={<Cart/>}/>
            <Route path="adminPage" element={<AdminPage/>}/>
            <Route path="403forbidden" element={<ForbiddenPage/>}/>
            <Route path="401unauthorized" element={<UnauthPage/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
