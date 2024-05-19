
import './Button.scss';

const Button = ({
    ctrCls = "",
    icon: Icon,
    onClick = () => {},
    children = ""
}) => {

    return (
        <button 
            className={`custom-button ${ctrCls}`}
            onClick={onClick}
        >
            {Icon && <Icon />}
            {children}
        </button>
    )
}

export default Button;