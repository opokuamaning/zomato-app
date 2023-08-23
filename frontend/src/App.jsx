import { Route, Routes } from "react-router-dom";
import Home from "./components/Home"
import Search from "./components/Search";
import PageNotFound from "./components/PageNotFound";
import RestaurantDetails from "./components/RestaurantDetails";
const App = ()=>{
    return(
        <>
            <main className="">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/search/:id/:name" element={<Search />}/>
                    <Route path="/restaurant-details/:id" element={<RestaurantDetails />}/>
                    <Route path="*" element={<PageNotFound />}/>
                </Routes>
            </main>
        </>
    )
}
export default App;