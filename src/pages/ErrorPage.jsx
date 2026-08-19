import { Header } from "../component/Header";
import './ErrorPage.css'
export function ErrorPage(){
    return(
        <>
         <title>404 Page Not Found</title>
         <Header />
         <div className="pageerror">Page not Found</div>
        </>
    )
}