import { Outlet } from "react-router";
import Footer from "./components/ui/footer/footer";
import Header from "./components/ui/header/header";

function Layout()
{
    return(
        <>
            <Header/>
                <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout;