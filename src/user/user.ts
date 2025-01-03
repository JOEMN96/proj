import formatDateFromTimestamp from "../utlils/date";
import { IndexedDB } from "../utlils/db";

let taskForm = document.querySelector("form") as HTMLFormElement;

let prevReqText = document.querySelector(".prevReq") as HTMLHeadingElement;
let taskList = document.querySelector(".taskList") as HTMLDivElement;

window.onload = function () {
  reloadTaskList();
};

const db = new IndexedDB("base", 1, "requests");

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);
  const title = formData.get("title");
  const description = formData.get("desc");
  const priority = formData.get("priority");
  await db.addItem({ title, description, priority, status: "Pending", time: new Date().getTime(), solutions: [] });
  taskForm.reset();
  reloadTaskList();
});

async function reloadTaskList() {
  let res = await db.getAllItems();

  if (res.length) {
    prevReqText.innerHTML = `Pending Requests`;
  } else {
    prevReqText.innerHTML = `No pending Requests available`;
    return;
  }

  taskList.innerHTML = "";

  let taskItem: string = "";

  res.forEach((task: any) => {
    taskItem += `
         <div class="card">
                            <div class="card-content mb-2 p-5">
                                
                                <div class="req-listCard">
                                    <h2>${task.title}</h2>
                                    <h3>Assignee: ${
                                      task.assignee ? task.assignee : "<span class='tag is-light'>Yet to be Assgined </span>"
                                    }</h3>
                                    <div class="tags">
                                        <p>Status: <span class="tag ${task.status === "Pending" ? "is-danger" : "is-success"} ">${
      task.status
    }</span></p>
                                        <p>Priority: <span class="tag is-warning">${task.priority}</span></p>
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                                                fill="#0F0F0F" />
                                            <path
                                                d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                                                fill="#0F0F0F" />
                                        </svg>
                                        
                                        <p>${formatDateFromTimestamp(task.time)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
    `;
  });
  taskList.innerHTML = taskItem;
}
