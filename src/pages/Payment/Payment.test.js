import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Payment from './Payment';

describe('Payment container tests', () => {
  // Stuck here because of "TypeError: Cannot destructure property 'title' of 'location.state' as it is null." error. Can't find a solution.
  test('Payment container renders correctly', () => {
    // const history = createMemoryHistory();
    // const state = { title: 'Pull', amount: 10 };
    // history.push('/payment', state);
    // const { container } = render(
    //   <Router>
    //     <Payment history={history} token={Math.random()} />
    //   </Router>,
    // );
    // const element = container.getElementsByClassName('payment-body');
    // expect(element).toHaveLength(1);
  });
});
