const accessModal = document.getElementById("accessModal");
const modalMessage = document.getElementById("modalMessage");
const closeModal = document.getElementById("closeModal");
const loginRedirectBtn = document.getElementById("loginRedirectBtn");

if (accessModal && closeModal && loginRedirectBtn) {
  closeModal.addEventListener("click", () => {
    accessModal.classList.add("hidden");
  });

  loginRedirectBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}

export function handleRestrictedAction(message) {
  if (!accessModal || !modalMessage) return;

  modalMessage.textContent = message;
  accessModal.classList.remove("hidden");
}
