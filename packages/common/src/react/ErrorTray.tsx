import React from 'react';
import classNames from 'classnames';
import { FiThermometer } from 'react-icons/fi';

function ErrorTray() {
  return (
    <div className="just-make-live">
      <button className={classNames('just-make-live-button')} disabled={true}>
        <FiThermometer />!
      </button>
      <div className="just-make-live-panel">{'message'}</div>
    </div>
  );
}

export default ErrorTray;
