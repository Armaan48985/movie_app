import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="flex items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-xl font-semibold text-gray-200">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
