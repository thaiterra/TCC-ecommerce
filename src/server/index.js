export const getProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();

  return products;
};

export const createUser = async ({ name, email, password }) => {
  const response = await fetch(`/api/create`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const { message } = await response.json();
    return {
      message,
      status: response.status,
    };
  }

  const user = await response.json().then(({ user }) => {
    localStorage.setItem('authenticated', true);
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  });

  return {
    message: 'User created successfully!',
    status: response.status,
    user,
  };
};

export const authenticate = async ({ email, password }) => {
  const response = await fetch('/api/authenticate', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const { message } = await response.json();
    return {
      message,
      status: response.status,
    };
  }

  const user = await response.json().then(({ user }) => {
    localStorage.setItem('authenticated', true);
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  });

  return {
    status: response.status,
    user,
  };
};

export const updateUserData = async (fieldsToSave) => {
  //TODO set an authorization token
  // const authorizationToken = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('user'));

  //TODO Create a function to fetch
  const response = await fetch('/api/update', {
    method: 'POST',
    body: JSON.stringify({ fields: fieldsToSave }),
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userData.id,
    },
  });

  if (!response.ok) {
    const { message } = await response.json();
    return {
      message,
      status: response.status,
    };
  }

  const { isUpdated, user } = await response.json();

  if (isUpdated) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  return {
    status: response.status,
    isUpdated,
    user,
  };
};

export const deleteUser = async ({ password }) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;

  const response = await fetch('/api/delete', {
    method: 'POST',
    body: JSON.stringify({ id: userId, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { isDeleted } = await response.json();

  return { isDeleted };
};
