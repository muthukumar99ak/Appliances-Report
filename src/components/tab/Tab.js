import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './Tab.scss';

const Tab = ({
    tabs = [],
    ctrCls = "",
    activeTab = 0
}) => {
    const [selectedTab, setSelectedTab] = useState(activeTab);

    const handleTabClick = (index) => {
        setSelectedTab(index);
    };

    const renderTabButtons = () => {
        return (
            <>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabClick(index)}
                        className={index === selectedTab ? 'active' : ''}
                    >
                        {tab.title}
                    </button>
                ))}
            </>
        )
    }

    return (
        <div className={`tab-container ${ctrCls}`}>
            <div className="tab-buttons">
                {renderTabButtons()}
            </div>
            <div className="tab-content">
                {tabs[selectedTab].content}
            </div>
        </div>
    );
};

Tab.propTypes = {
    tabs: PropTypes.array,
    ctrCls: PropTypes.string,
    activeTab: PropTypes.number
};

export default Tab;
