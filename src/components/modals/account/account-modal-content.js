import React from 'react';

import './account-modal.css';
import { TfiClose } from 'react-icons/tfi';
import { FaPenAlt } from 'react-icons/fa';
import { Button } from '@/components/button';

export const AccountModalContent = ({
  closeModal,
  userForm,
  handleEdit,
  cancelEdit,
  handleInputChange,
  saveData,
  deleteAccount,
  isLoading,
  isFieldEditing,
  isSaveButtonDisabled,
  onClickEditPassword,
}) => {
  return (
    <div className="account-modal-container">
      <div className="account-modal-box">
        <div className="account-modal-header">
          <h2>Account</h2>
          <button className="account-modal-close-icon" onClick={closeModal}>
            <TfiClose />
          </button>
        </div>
        <div className="account-modal-body">
          <form className="account-form">
            <div className="account-input-box">
              <div className="account-input-container">
                <label htmlFor="name">Name</label>
                <input
                  className="account-input"
                  type="text"
                  id="name"
                  name="name"
                  value={userForm.name.value}
                  onChange={handleInputChange}
                  disabled={!isFieldEditing('name')}
                />
              </div>
              {isFieldEditing('name') ? (
                <Button
                  size="small"
                  variant="tertiary"
                  onClick={cancelEdit('name')}
                >
                  Cancel
                </Button>
              ) : (
                <button
                  className="account-edit-pen"
                  onClick={() => handleEdit('name')}
                >
                  <FaPenAlt />
                </button>
              )}
            </div>
            <div className="account-input-box">
              <div className="account-input-container">
                <label htmlFor="email">Email</label>
                <input
                  className="account-input"
                  type="text"
                  id="email"
                  name="email"
                  value={userForm.email.value}
                  onChange={handleInputChange}
                  disabled={!isFieldEditing('email')}
                />
              </div>
              {isFieldEditing('email') ? (
                <Button
                  size="small"
                  variant="tertiary"
                  onClick={cancelEdit('email')}
                >
                  Cancel
                </Button>
              ) : (
                <button
                  className="account-edit-pen"
                  onClick={() => handleEdit('email')}
                >
                  <FaPenAlt />
                </button>
              )}
            </div>
            <div className="account-input-box">
              <div className="account-input-container">
                <label htmlFor="password">Password</label>
                <input
                  className="account-input"
                  type="text"
                  id="password"
                  name="password"
                  value={userForm.password.value}
                  onChange={handleInputChange}
                  disabled={!isFieldEditing('password')}
                />
              </div>
              {isFieldEditing('password') ? (
                <Button
                  size="small"
                  variant="tertiary"
                  onClick={cancelEdit('password')}
                >
                  Cancel
                </Button>
              ) : (
                <button
                  className="account-edit-pen"
                  onClick={() => {
                    onClickEditPassword();
                    handleEdit('password');
                  }}
                >
                  <FaPenAlt />
                </button>
              )}
            </div>
          </form>
          <Button
            size="small"
            variant="secondary"
            onClick={saveData}
            disabled={isSaveButtonDisabled}
            isLoading={isLoading}
          >
            Save
          </Button>
          <Button
            size="small"
            variant="tertiary"
            onClick={deleteAccount}
            isLoading={isLoading}
          >
            Delete my account
          </Button>
        </div>
      </div>
    </div>
  );
};
