import BADGE_TYPES from '../../constants/badgeTypes';
import PropTypes from 'prop-types';
import './Badge.scss';

const Badge = ({
    label = "",
    count,
    ctrCls = "",
    isRounded = false,
    icon: Icon,
    badgeType = BADGE_TYPES.GREY
}) => {
    return (
        <div 
            className={`badge-container ${ctrCls} ${badgeType} ${isRounded && "rounded-badge"} ${Icon && 'icon-available'}`}
        >
            {Icon && <Icon className='badge-icon' />}
            {count && <span className='count'>{count}</span>}
            {label}
        </div>
    )
}

Badge.propTypes = {
    label: PropTypes.string,
    count: PropTypes.number,
    ctrCls: PropTypes.string,
    isRounded: PropTypes.bool,
    badgeType: PropTypes.oneOf([
        BADGE_TYPES.GREY,
        BADGE_TYPES.BLUE,
        BADGE_TYPES.GREEN,
        BADGE_TYPES.RED,
        BADGE_TYPES.YELLOW
    ])
};

export default Badge;