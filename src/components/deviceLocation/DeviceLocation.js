import PropTypes from 'prop-types';
import { getJoinLocationString } from "../../helpers/deviceInfoHelper";

const DeviceLocation = ({
    deviceInfo = {}
}) => {
    const { theatreName } = deviceInfo;
    const locationString = getJoinLocationString(deviceInfo);

    return (
        <div className="location-container">
            <div className="theatre-name">{theatreName}</div>
            <div className="city">{locationString}</div>
        </div>
    )
}

DeviceLocation.propTypes = {
    deviceInfo: PropTypes.object
};

export default DeviceLocation;