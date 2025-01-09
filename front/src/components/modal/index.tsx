import React, { CSSProperties, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  mini?: boolean;
  contentStyle?: CSSProperties;
  wrapperClassName?: string;
}

const PortalModal: React.FC<PortalModalProps> = ({isOpen, onClose, children, mini = false, contentStyle, wrapperClassName}) => {
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-40 backdrop-blur-sm z-50 transition-opacity duration-300 ${wrapperClassName} ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={onClose}
    >
      {isOpen && (
        <div
          style={{
            transform: `translate(-50%, -50%) scale(${isOpen ? 1 : 0.9})`,
            opacity: isOpen ? 1 : 0,
            ...contentStyle,
          }}
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 ${
            mini ? 'h-1/2 overflow-auto' : 'w-11/12 md:w-3/4 lg:w-1/2'
          }`}
        >
          {children}
        </div>
      )}
    </div>,
    document.body
  );
};

export default PortalModal;
