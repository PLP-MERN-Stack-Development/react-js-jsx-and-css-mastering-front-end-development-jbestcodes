import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component for displaying content in a boxed layout
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.variant - Card style variant
 * @returns {JSX.Element} - Card component
 */
const Card = ({ 
  title, 
  children, 
  className = '', 
  variant = 'default',
  ...rest 
}) => {
  // Base classes with DevJourney theme
  const baseClasses = 'rounded-lg shadow-md transition-all duration-200 hover:shadow-lg';
  
  // Variant classes with maroon/green theme
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    primary: 'bg-red-50 dark:bg-red-900/20 border-2 border-red-900/20 dark:border-red-700',
    success: 'bg-green-50 dark:bg-green-900/20 border-2 border-green-800/20 dark:border-green-700',
    gradient: 'bg-gradient-to-br from-red-900 to-green-800 text-white',
  };
  
  // Combine all classes
  const cardClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className}`;
  
  return (
    <div className={cardClasses} {...rest}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'gradient']),
};

export default Card;