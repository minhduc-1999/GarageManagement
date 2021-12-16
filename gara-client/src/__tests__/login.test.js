import React from 'react';
import { cleanup, screen, render, fireEvent } from '@testing-library/react';
import Login from '../components/Login/Login';
import '@testing-library/jest-dom'
import AuthContext from '../contexts/AuthProvider'
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.

describe('Login module', () => {

    afterEach(cleanup);

    test('Should render exact UI', () => {
        render(<AuthContext><Login /></AuthContext>)
        expect(screen.getByText("Tài khoản")).not.toBeNull()
        expect(screen.getByText("Mật khẩu")).not.toBeNull()
        expect(screen.getByText("Đăng nhập")).not.toBeNull()
        expect(screen.getByPlaceholderText("Tên tài khoản")).not.toBeNull()
        expect(screen.getByPlaceholderText('Mật khẩu')).not.toBeNull()
    });

    test("Should show alert when username is not in correct format", () => {
        const { container } = render(<AuthContext><Login /></AuthContext>)
        const inputUsername = screen.getByPlaceholderText("Tên tài khoản")
        const inputPassword = screen.getByPlaceholderText('Mật khẩu')
        const submitButton = screen.getByText("Đăng nhập")
        fireEvent.change(inputUsername, { target: { value: 'user1' } })
        fireEvent.change(inputPassword, { target: { value: 'user1' } })
        fireEvent.click(submitButton)

        const postalAlert = screen.findByRole("alert", {
            name: "Tên tài khoản hoặc mật khẩu không đúng."
        });

        expect(postalAlert).toBeInTheDocument();
    })
})




