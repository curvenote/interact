import React from 'react';

function RequireJsWarning() {
  const show = window.requirejs === undefined;

  return (
    <div>
      {show && (
        <div style={{ backgroundColor: 'red', color: 'black', padding: '5px 0' }}>
          Warning <em>require.js</em> is not available on the page. ipywidgets based outputs will
          not function.
        </div>
      )}
    </div>
  );
}

export default RequireJsWarning;
