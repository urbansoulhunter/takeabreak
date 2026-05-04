import React from 'react';

const VisualEffects: React.FC = () => {
  return (
    <>
      <div className="scanlines fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}></div>
      <div className="grain fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}></div>
    </>
  );
};

export default VisualEffects;
