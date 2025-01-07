import "./style.css";

const footerDate = <HTMLSpanElement>document.querySelector("footer span");
let year: number = new Date().getFullYear() | 2025;
if (footerDate) {
  footerDate.textContent = String(year);
}
