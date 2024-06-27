import React from 'react';

import { Button } from '@/components/button';

import { TfiClose } from 'react-icons/tfi';

import './auth-modal.css';

export const AuthModalContent = ({
  userForm,
  setShowAuthModal,
  isLogin,
  setIsLogin,
  handleChangeUserData,
  handleCreate,
  handleLogin,
  isLoading,
  errors,
}) => {
  return (
    <div className="auth-modal-container">
      <div className="auth-modal-box">
        <div className="auth-modal-header">
          <h2>Welcome</h2>
          <button
            className="auth-modal-close-icon"
            onClick={() => setShowAuthModal(false)}
          >
            <TfiClose />
          </button>
        </div>
        <div className="auth-modal-body">
          <div className="auth-header">
            <button
              className="auth-header-option"
              onClick={() => setIsLogin(true)}
            >
              <p className={isLogin ? 'auth-header-option-selected' : ''}>
                Login
              </p>
            </button>
            <button
              className="auth-header-option"
              onClick={() => setIsLogin(false)}
            >
              <p className={!isLogin ? 'auth-header-option-selected' : ''}>
                Signin
              </p>
            </button>
          </div>
          <form className="auth-form">
            {!isLogin && (
              <div className="auth-input-container">
                <label htmlFor="name">Name</label>
                <input
                  className="auth-input"
                  type="text"
                  id="name"
                  name="name"
                  value={userForm?.name}
                  onChange={handleChangeUserData}
                />
              </div>
            )}
            <div className="auth-input-container">
              <label htmlFor="email">Email</label>
              <input
                className="auth-input"
                type="email"
                id="email"
                name="email"
                value={userForm?.email}
                onChange={handleChangeUserData}
              />
            </div>
            <div className="auth-input-container">
              <label htmlFor="password">Password</label>
              <input
                className="auth-input"
                type="password"
                id="password"
                name="password"
                value={userForm?.password}
                onChange={handleChangeUserData}
              />
            </div>
            {errors.length > 0 && (
              <div className="auth-form-invalid-text">
                <h4>Oops!</h4>
                <ul className="auth-form-invalid-text">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </form>
          <div className="auth-form-footer">
            {isLogin ? (
              <Button
                disabled={!userForm.email.length || !userForm.password.length}
                variant="primary"
                onClick={handleLogin}
                isLoading={isLoading}
              >
                Login
              </Button>
            ) : (
              <Button
                disabled={
                  !userForm.email.length ||
                  !userForm.name.length ||
                  userForm.password.length < 6
                }
                variant="secondary"
                onClick={handleCreate}
                isLoading={isLoading}
              >
                Create
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
