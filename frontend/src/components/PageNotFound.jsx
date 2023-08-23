import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <>
            <section className="row mt-5">
                <div className="d-flex flex-column">
                    <h1 className="text-center">The page is not available</h1>
                    <p className="text-center fw-bold h1 text-bg-danger">Error 404 Page can not be found</p>
                    <p className="text-center">
                        CLICK <Link to="/" className="text-primary">HERE</Link> to get to Home Page
                    </p>
                </div>
            </section>
        </>
    )
}
export default PageNotFound;