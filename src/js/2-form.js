const STORAGE_KEY = "feedback-form-state";
const formEl = document.querySelector(".feedback-form");

let formData = { email: "", message: "" };

const saved = localStorage.getItem(STORAGE_KEY);

if (saved) {
  try {
    const parsed = JSON.parse(saved);

    formData.email = parsed.email ?? "";
    formData.message = parsed.message ?? "";

    formEl.elements.email.value = formData.email;
    formEl.elements.message.value = formData.message;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveToStorage() {
  const trimmedData = {
    email: formData.email.trim(),
    message: formData.message.trim(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedData));
}

formEl.addEventListener("input", (event) => {
  const { name, value } = event.target;

  if (name !== "email" && name !== "message") return;

  formData[name] = value;

  saveToStorage();
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailTrimmed = formData.email.trim();
  const messageTrimmed = formData.message.trim();

  if (!emailTrimmed || !messageTrimmed) {
    alert("Fill please all fields");
    return;
  }

  console.log({ email: formData.email, message: formData.message });

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
  formEl.reset();
});