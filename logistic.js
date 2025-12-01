import { simulateLogistic, drawLineChart } from "./utils.js";

const inputs = {
  r: document.getElementById("lg-r"),
  x0: document.getElementById("lg-x0"),
  steps: document.getElementById("lg-steps"),
};
const runBtn = document.getElementById("lg-run");
const chart = document.getElementById("lg-chart");
const tableBody = document.getElementById("lg-table-body");
const summary = document.getElementById("lg-summary");

function readParams() {
  return {
    r: parseFloat(inputs.r.value),
    x0: parseFloat(inputs.x0.value),
    steps: parseInt(inputs.steps.value, 10),
  };
}

function updateTable(seq) {
  tableBody.innerHTML = "";
  const maxRows = 40;
  seq.forEach((val, i) => {
    if (i > maxRows) return;
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${i}</td><td>${val.toFixed(5)}</td>`;
    tableBody.appendChild(tr);
  });
  if (seq.length > maxRows + 1) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="2" style="text-align:center;color:#9ba1a6;">… ${seq.length - maxRows - 1} lignes masquées</td>`;
    tableBody.appendChild(tr);
  }
}

function run() {
  const params = readParams();
  const seq = simulateLogistic(params);
  drawLineChart(chart, [{ label: "x_n", data: seq }], { xLabel: "itérations n", yLabel: "x" });
  updateTable(seq);
  summary.textContent = `Après ${seq.length - 1} pas : x = ${seq[seq.length - 1].toFixed(5)}`;
}

function bindSteppers() {
  document.querySelectorAll("[data-step-target]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.stepTarget;
      const delta = parseFloat(btn.dataset.delta || "0.01");
      const input = inputs[id];
      input.value = (parseFloat(input.value) + delta).toFixed(3);
      run();
    });
  });
}

runBtn.addEventListener("click", run);
bindSteppers();
run();
