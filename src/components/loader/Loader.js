import './Loader.scss';

const Loader = () => {
    return (
        <div className='loader-container'>
            <div className="loader"></div>
            <p className='loading-text'>Loading...</p>
        </div>
    )
}

export default Loader;