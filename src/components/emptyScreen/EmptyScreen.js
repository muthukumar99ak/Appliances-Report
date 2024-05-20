import { memo } from 'react';
import PropTypes from 'prop-types';
import { EmptyScreenImage } from '../../assets/images';
import './EmptyScreen.scss';

const EmptyScreen = ({
    message = ""
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

EmptyScreen.propTypes = {
    message: PropTypes.string
};

export default memo(EmptyScreen);