const loginForm = document.getElementById("loginForm");

const token = localStorage.getItem("token") || "";
const allCookies = document.cookie;
const cookies = {};
document.cookie.split(";").forEach((cookie) => {
  const [name, value] = cookie.trim().split("=");
  cookies[name] = decodeURIComponent(value);
});

const hanldeSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = loginForm?.elements || {};
  if (email && password) {
    const domain = window.location.origin;
    const url = `${domain}/api/v1/user/login`;
    try {
      await axios.post(url, {
        email: email.value,
        password: password?.value,
      });
      window.location.href = "/api-docs";
    } catch (error) {
      const { response } = error;
      const msg = response?.data?.message || "Something Went Wrong";
      alert(msg);
    }
  } else alert("Fill Details Properly");
};

loginForm.addEventListener("submit", hanldeSubmit);
