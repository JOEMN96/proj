import { IndexedDB } from "../utlils/db";

const db = new IndexedDB("base", 1, "requests");

const tasksWrapper = document.querySelector(".tasks-list") as HTMLDivElement;

document.addEventListener("DOMContentLoaded", async () => {
  const requests = await db.getAllItems();
  console.log(requests);

  let template = ``;
  requests.forEach((request: any) => {
    template += `
    
          <div class="column is-12-mobile is-6-tablet is-4-desktop">
                            <div class="card" style="height: 100%;">
                                <div class="card-content">
                                    <p class="title mb-2">
                                        ${request.title}
                                    </p>
                                    <p class="subtitle">2 Hours Ago | Created by <a href="#">user 1</a></p>
                                </div>
                                <footer class="card-footer">
                                    <p class="card-footer-item">
                                        <span>
                                            More
                                            <a href=""></a>
                                        </span>
                                    </p>
                                    <p class="card-footer-item">
                                        <span> Work <a href="#"></a> </span>
                                    </p>
                                </footer>
                            </div>
                        </div>
    `;
  });
  tasksWrapper.innerHTML = "";
  tasksWrapper.innerHTML = template;
});
