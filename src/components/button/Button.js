
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({
    ctrCls = "",
    icon: Icon,
    children = "",
    disabled = false,
    showBadge = false,
    badgeCount,
    onClick = () => undefined
}) => {

    const renderBadge = () => {
        if (showBadge && badgeCount > 0) {
            return (
                <span className='button-badge-container'>
                    {badgeCount}
                </span>
            )
        }
    }

    return (
        <button
            disabled={disabled}
            className={`custom-button ${ctrCls}`}
            onClick={onClick}
        >
            {renderBadge()}
            {Icon && <Icon />}
            {children}
        </button>
    )
}

Button.propTypes = {
    ctrCls: PropTypes.string,
    children: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    showBadge: PropTypes.bool,
    badgeCount: PropTypes.number
};

export default Button;