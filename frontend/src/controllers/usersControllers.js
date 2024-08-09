const backendPath = process.env.BACKENDPATH || "http://localhost:4000";

console.log(process.env.backendPath);
//--------------------------- Login User --------------------------

const loginUser = async (loginData) => {
  const { email, password } = loginData;
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const res = await fetch(`${backendPath}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error || "Some Error occurred during login");
  }
  // save to localStorage
  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);
  localStorage.setItem("username", data.username);
  return data;
};

//--------------------------- Register User --------------------------

const registerUser = async (registerData) => {
  const { email, username, password, password2 } = registerData;
  if (!email || !username || !password || !password2) {
    throw Error("All fields are required");
  }

  if (password !== password2) {
    throw Error("Passwords do not match");
  }

  const res = await fetch(`${backendPath}/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error || "Some Error occurred during registration");
  }

  // save to localStorage
  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);
  localStorage.setItem("username", data.username);

  return data;
};

export { loginUser, registerUser };
