import { memo } from "react";

const Location = ({ deviceInfo }) => {
    const { theatreName, location } = deviceInfo;
    const { city = "", state = "", country = "" } = location;
    const locationString = [city, state, country].filter(loc => loc).join(", ");

    return (
        <div className="location-container">
            <div className="theatre-name">{theatreName}</div>
            <div className="city">{locationString}</div>
        </div>
    )
}

export default memo(Location);