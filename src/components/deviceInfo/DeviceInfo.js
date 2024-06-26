import PropTypes from 'prop-types';
import './DeviceInfo.scss';

const DeviceInfo = ({
    infoColumns = [],
    deviceInfo = {}
}) => {

    const renderInfoColumn = (column, index) => {
        const {
            title,
            key,
            onRenderer
        } = column;
        let infoValue = deviceInfo[key];

        // Get infoValue from renderer if its true and function
        if (typeof onRenderer === 'function') {
            infoValue = onRenderer(deviceInfo);
        }

        return (
            <div 
                className="device-info" 
                key={key}
            >
                <h6 className='info-title'>{title}</h6>
                <p className="info-value">{infoValue || "-"}</p>
            </div>
        )
    }

    return (
        <div className="device-info-container">
            {infoColumns.map(renderInfoColumn)}
        </div>
    )
}

DeviceInfo.propTypes = {
    infoColumns: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            key: PropTypes.string,
            onRenderer: PropTypes.func
        })
    ),
    deviceInfo: PropTypes.object
};

export default DeviceInfo;