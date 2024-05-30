//--------------------------- Login User --------------------------

const loginUser = async (loginData) => {
  const { email, password } = loginData;
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const res = await fetch("http://localhost:4000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.log("Error!!!");
    throw Error(data.error || "Some Error occurred during login");
  }

  console.log(data);
};

export { loginUser };
