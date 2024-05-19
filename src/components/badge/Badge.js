import './Badge.scss';

export const BADGE_TYPES = {
    RED: "red-badge",
    YELLOW: "yellow-badge",
    BLUE: "blue-badge",
    GREEN: "green-badge",
    GREY: "grey-badge"
}

const Badge = ({
    label,
    count,
    ctrCls = "",
    isRounded = false,
    icon: Icon,
    badgeType = BADGE_TYPES.GREY
}) => {
    return (
        <div className={`badge-container ${ctrCls} ${badgeType} ${isRounded && "rounded-badge"} ${Icon && 'icon-available'}`}>
            {Icon && <Icon className='badge-icon' />}
            {count && <span className='count'>{count}</span>}
            {label}
        </div>
    )
}

export default Badge;