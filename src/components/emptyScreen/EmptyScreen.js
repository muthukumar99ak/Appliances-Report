import { EmptyScreenImage } from '../../assets';
import './EmptyScreen.scss';

const EmptyScreen = ({
    message
}) => {
    return (
        <div className='empty-screen-container'>
            <div>
                <img src={EmptyScreenImage} alt='Empty' />
            </div>
            <p>{message || "No data found"}</p>
        </div>
    )
}

export default EmptyScreen;