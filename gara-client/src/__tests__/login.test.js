import React from 'react';
import { cleanup, screen, render } from '@testing-library/react';
import Login from '../components/Login/Login';
import '@testing-library/jest-dom'
import AuthContext from '../contexts/AuthProvider'
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

test('Check UI login screen', () => {
    render(<AuthContext><Login /></AuthContext>);

    expect(screen.getByText('Tài khoản').textContent).toMatch('Tài khoản')
    expect(screen.getByText("Mật khẩu").textContent).toMatch('Mật khẩu')
});