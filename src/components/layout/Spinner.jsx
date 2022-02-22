import React from 'react';

import spinner from './assets/spinner.gif';

function Spinner() {
  return (
    <div class="w-100 mt-20">
      <img
        width={180}
        src={spinner}
        className="text-center mx-auto"
        alt="Loading Spinner"
      />
    </div>
  );
}

export default Spinner;
