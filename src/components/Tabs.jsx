import React, { useState } from 'react';
import Location from './location/Location';
import Transportation from './transportation/Transportation';
import Route from './Route';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('');

  const renderContent = () => {
    switch (activeTab) {
      case 'Locations':
        return <Location />;
      case 'Transportations':
        return <Transportation />;
      case 'Routes':
        return <Route />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => setActiveTab('Locations')}>Locations</button>
        <button onClick={() => setActiveTab('Transportations')}>Transportations</button>
        <button onClick={() => setActiveTab('Routes')}>Routes</button>
      </div>

      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Tabs;
