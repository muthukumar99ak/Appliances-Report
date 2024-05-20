import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ChevronRight } from '../../assets/images';
import './Breadcrumb.scss';

const Breadcrumbs = ({
    paths = []
}) => {

    const renderBreadCrumbItem = (crumb, index) => {
        const {
            path,
            active,
            label
        } = crumb;
        return (
            <li
                className="breadcrumb-item"
                key={index}
            >
                {index > 0 && <ChevronRight />}
                {active ? (
                    <Link to={path} className="breadcrumb-link">
                        {label}
                    </Link>
                ) : (
                    <span className="breadcrumb-text">{label}</span>
                )}
            </li>
        )
    }

    return (
        <div className='breadcrumbs-container'>
            <ul className="breadcrumb">
                {paths.map(renderBreadCrumbItem)}
            </ul>
        </div>
    );
}

Breadcrumbs.propTypes = {
    paths: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string,
            active: PropTypes.bool,
            label: PropTypes.string
        })
    )
};

export default Breadcrumbs;