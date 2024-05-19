import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';
import { ChevronRight } from '../../assets';

const Breadcrumbs = ({ paths }) => {

    const renderBreadCrumbItem = (crumb, index) => {
        const { path, active, label  } = crumb;
        return (
            <li className="breadcrumb-item" key={index}>
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

export default Breadcrumbs;