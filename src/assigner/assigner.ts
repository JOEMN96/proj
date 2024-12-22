import formatDateFromTimestamp from "../utlils/date";
import { IndexedDB } from "../utlils/db";

const db = new IndexedDB("base", 1, "requests");
const requestsWrapper = document.querySelector(".requests") as HTMLDivElement;

document.addEventListener("DOMContentLoaded", async () => {
  loadRequests();

  async function loadRequests() {
    requestsWrapper.innerHTML = "";

    const requests = await db.getAllItems();

    let template = ``;

    if (!requests.length) {
      template = `<h1>No requests available</h1>`;
      requestsWrapper.innerHTML = template;
      return;
    }

    requests.forEach((request: any) => {
      template += `
                <div class="card" >
                      <div class="card-content">
                          <p class="title mb-2">
                              ${request.title}
                          </p>
                          <p class="subtitle">${formatDateFromTimestamp(request.time)}</p>
                          <p class="subtitle"> AssignedTo: ${request.assignee ? request.assignee : "none"}</p>
                      </div>
                      <footer class="card-footer">
                          <p class="card-footer-item">
                              <a class="js-modal-trigger" data-id="${
                                request.id
                              }" data-target="moreDetailsModal" href="#">Add more details</a>
                          </p>
                          <p class="card-footer-item">
                              <a class="js-modal-trigger"  data-id="${
                                request.id
                              }" data-target="assigneesModal"  href="#">Assign to assignee</a>
                          </p>
                          <div class="card-footer-item">
                              <div class="select">
                                  <select>
                                      <option>More</option>
                                      <option>Rate</option>
                                      <option>Share</option>
                                      <option>Close</option>
                                  </select>
                              </div>
                          </div>
                      </footer>
                  </div>
              `;
    });

    requestsWrapper.innerHTML = template;

    loadModalLogic();
  }

  async function editMoreDetails(el: Element) {
    let id = el.getAttribute("data-id");
    let editMoreDetailsContent = document.querySelector("#moreDetailsModal .content-area") as HTMLDivElement;

    if (id) {
      loadSolutions(parseInt(id));
      let item = await db.getItem(parseInt(id));
      const template = ` <h1> ${item.title} </h1> 
                          <p> ${item.description} </p>
                          <div class="points"> </div>
                        `;

      editMoreDetailsContent.innerHTML = template;

      let pointsForm = document.querySelector("#assignee-form") as HTMLFormElement;

      pointsForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(pointsForm);
        const solution = formData.get("solution");

        await db.updateItem(parseInt(id), { ...item, solutions: [...item.solutions, solution] });
        pointsForm.reset();

        await loadSolutions(parseInt(id));
      });
    }
  }

  async function assignAssignee(el: Element) {
    console.log(el);
    let menu = document.querySelector("#assigneesModal .menu");
    menu?.addEventListener("click", async (e) => {
      e.preventDefault();
      let id = el.getAttribute("data-id");
      let assignee = e.target as HTMLElement;
      if (id && assignee) {
        let item = await db.getItem(parseInt(id));
        await db.updateItem(parseInt(id), { ...item, assignee: assignee.textContent, status: "assigned" });
        loadRequests();
        (document.querySelector(".modal-close.is-large") as HTMLButtonElement).click();
      }
    });
  }

  async function loadSolutions(id: number) {
    let items = await db.getItem(id);

    const keyPointsWrapper = document.querySelector(".key-points ul") as HTMLUListElement;
    let template = ``;
    items.solutions.forEach((item: any) => {
      template += `
          <li class="key-point mb-1">
              ${item}
          </li>
      `;
    });
    keyPointsWrapper.innerHTML = "";
    keyPointsWrapper.innerHTML = template;
  }

  function loadModalLogic() {
    async function openModal($el: Element | null, $trigger: Element) {
      if ($el) {
        $el.classList.add("is-active");
      }

      if ($el && $el.id === "moreDetailsModal") {
        await editMoreDetails($trigger);
      } else {
        await assignAssignee($trigger);
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

    (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger: Element) => {
      const modal = ($trigger as HTMLElement).dataset.target;

      if (modal) {
        const $target = document.getElementById(modal);
        $trigger.addEventListener("click", () => {
          openModal($target, $trigger);
        });
      }
    });

    (
      document.querySelectorAll(".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button") || []
    ).forEach(($close) => {
      const $target = $close.closest(".modal");

      $close.addEventListener("click", () => {
        closeModal($target);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeAllModals();
      }
    });
  }
});
