import './ErrorPage.scss';
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="error-page-container">
            <h1 className="oops-text">Oops!</h1>
            <h2 className="error-status">
                {error.status} - {error.statusText}
            </h2>
            <Link to="/" className="custom-button link-to-home">Home</Link>
        </div>
    )
}

export default ErrorPage;