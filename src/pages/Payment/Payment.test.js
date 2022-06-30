import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Payment from './Payment';

describe('Payment container tests', () => {
  // Stuck here because of "TypeError: Cannot destructure property 'title' of 'location.state' as it is null." error.
  test('Payment container renders correctly', () => {
    const { container } = render(
      <Router>
        <Payment />
      </Router>,
    );
    const element = container.getElementsByClassName('payment-body');

    expect(element).toHaveLength(1);
  });
});
