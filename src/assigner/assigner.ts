document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el: Element | null) {
    if ($el) {
      $el.classList.add("is-active");
    }
  }

  function closeModal($el: Element | null) {
    if ($el) {
      $el.classList.remove("is-active");
    }
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal: Element) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger: Element) => {
    const modal = ($trigger as HTMLElement).dataset.target;

    if (modal) {
      const $target = document.getElementById(modal);
      $trigger.addEventListener("click", () => {
        openModal($target);
      });
    }
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button") || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
});
