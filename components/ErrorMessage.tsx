
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="bg-red-900/50 border border-red-700 text-red-300 px-6 py-4 rounded-lg shadow-lg max-w-md text-center">
    <h3 className="font-bold text-lg mb-2">An Error Occurred</h3>
    <p className="text-sm">{message}</p>
  </div>
);

export default ErrorMessage;
