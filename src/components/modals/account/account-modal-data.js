import React, { useContext, useState } from 'react';

import { AccountModalContent } from './account-modal-content';

import { UserContext } from '@/components/contexts/user';

import { updateUserData, deleteUser } from '@/server';

export const AccountModalData = ({ setShowAccountModal }) => {
  const { user, setUser } = useContext(UserContext);

  const [userForm, setUserForm] = useState({
    name: {
      value: user.name,
      editing: false,
    },
    email: {
      value: user.email,
      editing: false,
    },
    password: {
      value: '********',
      editing: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => setShowAccountModal(false);

  const saveData = async () => {
    setIsLoading(true);

    const fieldsToSave = Object.keys(userForm)
      .map((field) => {
        if (userForm[field].editing) return { [field]: userForm[field].value };
      })
      //trick to remove falsy values from array, like false, 0, -0, "", null, undefined, and NaN
      .filter(Boolean);

    await updateUserData(fieldsToSave)
      .then(({ isUpdated, user }) => {
        //TODO handle change email error
        //TODO change password test

        if (!isUpdated) {
          setIsLoading(false);
          alert('Error updating user data');
          return;
        }
        setUser(user);
        setUserForm({
          name: {
            value: user.name,
            editing: false,
          },
          email: {
            value: user.email,
            editing: false,
          },
          password: {
            value: '********',
            editing: false,
          },
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        alert('Error updating user data');
      });
  };

  const deleteAccount = async () => {
    alert('You are going to delete your account');

    const sure = confirm('Are you sure?');

    if (!sure) return;

    const password = prompt('Please, spell your password');

    if (!password) return;

    setIsLoading(true);

    await deleteUser({ password })
      .then(({ isDeleted }) => {
        if (!isDeleted) {
          setIsLoading(false);
          alert('Error deleting user');
          return;
        }
        setIsLoading(false);
        localStorage.clear();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        alert('Error deleting user');
      });
  };

  const handleInputChange = (e) => {
    setUserForm((prevState) => ({
      ...prevState,
      [e.target.name]: {
        value: e.target.value,
        editing: true,
      },
    }));
  };

  const handleEdit = (field) => {
    setUserForm((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        editing: true,
      },
    }));
  };

  const cancelEdit = (field) => () => {
    setUserForm((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        editing: false,
      },
    }));
  };

  const isFieldEditing = (field) => userForm[field].editing;

  const isSaveButtonDisabled = Object.keys(userForm).every(
    (field) => !userForm[field].editing
  );

  const onClickEditPassword = () => {
    setUserForm((prevState) => ({
      ...prevState,
      password: {
        value: '',
        editing: true,
      },
    }));
  };

  return (
    <AccountModalContent
      closeModal={closeModal}
      user={user}
      handleEdit={handleEdit}
      cancelEdit={cancelEdit}
      handleInputChange={handleInputChange}
      saveData={saveData}
      isLoading={isLoading}
      userForm={userForm}
      isFieldEditing={isFieldEditing}
      isSaveButtonDisabled={isSaveButtonDisabled}
      onClickEditPassword={onClickEditPassword}
      deleteAccount={deleteAccount}
    />
  );
};
