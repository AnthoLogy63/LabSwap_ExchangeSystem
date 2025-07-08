import { useEffect } from 'react';

const CustomAlert = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';

  return (
    <div className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-lg shadow-lg text-white ${bgColor}`}>
      {message}
    </div>
  );
};

export default CustomAlert;
