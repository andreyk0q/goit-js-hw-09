const STORAGE_KEY = "feedback-form-state";

const formEl = document.querySelector(".feedback-form");

let formData = {
  email: "",
  message: "",
};

// --- 1) Підставляємо дані зі сховища при завантаженні ---
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);

    formData = {
      email: parsedData.email ?? "",
      message: parsedData.message ?? "",
    };

    formEl.elements.email.value = formData.email;
    formEl.elements.message.value = formData.message;
  } catch (error) {
    // Якщо в LS зламана JSON-строка — очищаємо її, щоб не ламало сторінку
    localStorage.removeItem(STORAGE_KEY);
  }
}

// --- 2) Делегування input: оновлюємо formData і пишемо в localStorage ---
formEl.addEventListener("input", (event) => {
  const { name, value } = event.target;

  if (name !== "email" && name !== "message") return;

  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// --- 3) Сабміт: валідація, лог, очищення ---
formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  formData = { email: "", message: "" };
  formEl.reset();
});