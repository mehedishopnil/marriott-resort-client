import PropTypes from 'prop-types';

const HostingSidebar = ({ setActivePage }) => {
    const navigationOptions = [
      'Reservations',
      'Earnings',
      'Insights',
      'Guidebooks',
      'Create a new list',
    ];
  
    return (
      <div className="bg-gray-800 text-white p-4">
        {navigationOptions.map((option, index) => (
          <div key={index} onClick={() => setActivePage(option)} className="cursor-pointer p-2 hover:bg-gray-700">
            {option}
          </div>
        ))}
      </div>
    );
  };

  HostingSidebar.propTypes = {
    setActivePage: PropTypes.func.isRequired,
  };

export default HostingSidebar;