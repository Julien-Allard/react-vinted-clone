import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

describe('Login page tests', () => {
  test('Both inputs should be displayed', () => {
    render(
      <Router>
        <Login />
      </Router>,
    );
    const user = screen.getByPlaceholderText(/adresse mail/i);
    const password = screen.getByPlaceholderText(/mot de passe/i);

    expect(user).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test('Button should be rendered', () => {
    const { container } = render(
      <Router>
        <Login />
      </Router>,
    );
    const button = container.getElementsByClassName('to-signup-text');

    expect(button).toHaveLength(1);
  });

  test('Both form inputs should be empty', () => {
    render(
      <Router>
        <Login />
      </Router>,
    );
    const user = screen.getByPlaceholderText(/adresse mail/i);
    const password = screen.getByPlaceholderText(/mot de passe/i);

    expect(user.value).toBe('');
    expect(password.value).toBe('');
  });

  test('Both inputs should change when typing', () => {
    render(
      <Router>
        <Login />
      </Router>,
    );
    const user = screen.getByPlaceholderText(/adresse mail/i);
    const password = screen.getByPlaceholderText(/mot de passe/i);
    const testMail = 'toto@mail.com';
    const testPass = 'azerty';
    fireEvent.change(user, { target: { value: testMail } });
    fireEvent.change(password, { target: { value: testPass } });

    expect(user.value).toBe(testMail);
    expect(password.value).toBe(testPass);
  });
});
