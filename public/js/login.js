const loginForm = document.getElementById("loginForm");

const token = localStorage.getItem("token") || "";

const handleLoginCheck = async () => {
  const domain = window.location.origin;
  const url = `${domain}/api-docs`;
  try {
    const { data } = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    // document.body.innerHTML = data;
    window.location.href = "/api-docs";
  } catch (error) {
    console.log(error);
  }
};

// if (token) {
//   handleLoginCheck();
// }

const hanldeSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = loginForm?.elements || {};
  if (email && password) {
    const domain = window.location.origin;
    const url = `${domain}/api/v1/user/login`;
    try {
      const { data } = await axios.post(url, {
        email: email.value,
        password: password?.value,
      });
      localStorage.setItem("token", data.token);
      window.location.href = "/api-docs";
    } catch (error) {
      const { response } = error;
      const msg = response?.data?.message || "Something Went Wrong";
      alert(msg);
    }
  } else alert("Fill Details Properly");
};

loginForm.addEventListener("submit", hanldeSubmit);
