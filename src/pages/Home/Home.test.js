import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

describe('Home.js tests', () => {
  test('The hero is rendered correctly', () => {
    render(
      <Router>
        <Home />
      </Router>,
    );
    const hero = screen.getByTestId('hero');
    expect(hero).toBeTruthy();
  });
});
