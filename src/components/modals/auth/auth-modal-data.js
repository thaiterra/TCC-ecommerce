import React, { useContext, useState } from 'react';
import { createUser, authenticate } from '@/server';

import { validateUserFields } from './utils';
import { AuthModalContent } from './auth-modal-content';
import { UserContext } from '@/components/contexts/user';

export const AuthModalData = ({ setShowAuthModal }) => {
  const { setUser } = useContext(UserContext);

  const [userForm, setUserForm] = useState({
    email: '',
    name: '',
    password: '',
  });

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formInvalid, setFormInvalid] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleCreate = async () => {
    const { email, name, password } = userForm;

    const { isValid } = validateUserFields({ email, name, password });

    if (!isValid) {
      setErrors(['Invalid fields!']);
      setFormInvalid(true);
      setIsLoading(false);
      return;
    }

    setFormInvalid(false);
    setIsLoading(true);

    await createUser({ email, name, password })
      .then(({ message, status, user }) => {
        if (status !== 200) {
          setErrors([message]);
          setIsLoading(false);
          return;
        }

        alert(message);

        setUser(user);
        setShowAuthModal(false);
        setIsLoading(false);

        return;
      })
      .catch((error) => console.log(error));
  };

  const handleLogin = async () => {
    const { email, password } = userForm;

    setIsLoading(true);

    await authenticate({ email, password }).then(({ user, message }) => {
      if (!user) {
        setIsLoading(false);
        setErrors([message]);
        return;
      }

      setUser(user);
      setShowAuthModal(false);
      setIsLoading(false);

      return;
    });
  };

  const handleChangeUserData = (e) => {
    setUserForm((oldForm) => ({
      ...oldForm,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <AuthModalContent
      userForm={userForm}
      setShowAuthModal={setShowAuthModal}
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      handleChangeUserData={handleChangeUserData}
      handleCreate={handleCreate}
      handleLogin={handleLogin}
      formInvalid={formInvalid}
      isLoading={isLoading}
      errors={errors}
    />
  );
};
