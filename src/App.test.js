import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

describe('Testing App Component', () => {
  let appWrapper;

  beforeEach(() => {
    appWrapper = shallow(<App />)
  })

  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  test('Renders App Component', () => {
    expect(appWrapper.length).toEqual(1)
  })
})

