import { simulateLogistic, drawScatter } from "./utils.js";

const inputs = {
  start: document.getElementById("bf-start"),
  end: document.getElementById("bf-end"),
  step: document.getElementById("bf-step"),
  steps: document.getElementById("bf-steps"),
  transient: document.getElementById("bf-transient"),
  x0: document.getElementById("bf-x0"),
  xmin: document.getElementById("bf-xmin"),
  xmax: document.getElementById("bf-xmax"),
  ymin: document.getElementById("bf-ymin"),
  ymax: document.getElementById("bf-ymax"),
};
const runBtn = document.getElementById("bf-run");
const canvas = document.getElementById("bf-canvas");
const note = document.getElementById("bf-note");

let lastPoints = [];

function sweep() {
  const start = parseFloat(inputs.start.value);
  const end = parseFloat(inputs.end.value);
  const step = parseFloat(inputs.step.value);
  const steps = parseInt(inputs.steps.value, 10);
  const transient = parseInt(inputs.transient.value, 10);
  const x0 = parseFloat(inputs.x0.value);

  const points = [];
  for (let r = start; r <= end + 1e-9; r += step) {
    const seq = simulateLogistic({ r, x0, steps });
    const usable = seq.slice(Math.max(0, transient));
    const keep = usable.slice(-40); // échantillon des dernières valeurs
    keep.forEach(val => points.push({ x: r, y: val }));
  }

  lastPoints = points;
  render();
  note.textContent = `${points.length} points calculés – le nuage vertical montre les valeurs finales pour chaque r`;
}

function render() {
  if (!lastPoints.length) return;
  const xmin = parseFloat(inputs.xmin.value);
  const xmax = parseFloat(inputs.xmax.value);
  const ymin = parseFloat(inputs.ymin.value);
  const ymax = parseFloat(inputs.ymax.value);
  const bounds = {
    xMin: Number.isFinite(xmin) ? xmin : undefined,
    xMax: Number.isFinite(xmax) ? xmax : undefined,
    yMin: Number.isFinite(ymin) ? ymin : undefined,
    yMax: Number.isFinite(ymax) ? ymax : undefined,
  };
  drawScatter(canvas, lastPoints, { color: "#58a6ff", radius: 1.2, bounds });
}

runBtn.addEventListener("click", sweep);
sweep();

["xmin", "xmax", "ymin", "ymax"].forEach(key => {
  inputs[key].addEventListener("input", render);
});
sweep();
