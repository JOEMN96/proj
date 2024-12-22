import "./style.css";

const footerDate = <HTMLSpanElement>document.querySelector("footer span");
footerDate.textContent = String(new Date().getFullYear());
