import { ImSpinner } from 'react-icons/im';

import './button.css';

export const Button = ({
  variant = 'primary',
  size = 'medium',
  isLoading,
  children,
  ...props
}) => {
  return (
    <button {...props} className={`button button-${variant} button-${size}`}>
      {isLoading ? <ImSpinner className="button-spinner" /> : children}
    </button>
  );
};
