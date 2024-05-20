
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({
    ctrCls = "",
    icon: Icon,
    children = "",
    disabled = false,
    onClick = () => undefined
}) => {

    return (
        <button
            disabled={disabled}
            className={`custom-button ${ctrCls}`}
            onClick={onClick}
        >
            {Icon && <Icon />}
            {children}
        </button>
    )
}

Button.propTypes = {
    ctrCls: PropTypes.string,
    children: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default Button;