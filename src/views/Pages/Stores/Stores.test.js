import React from 'react';
import ReactDOM from 'react-dom';
import Stores from './Stores';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Stores /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
