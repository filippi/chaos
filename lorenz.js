import { integrateLorenz, drawLorenz3D, drawLineChart } from "./utils.js";

const inputs = {
  sigma: document.getElementById("lz-sigma"),
  rho: document.getElementById("lz-rho"),
  beta: document.getElementById("lz-beta"),
  dt: document.getElementById("lz-dt"),
  steps: document.getElementById("lz-steps"),
  x0: document.getElementById("lz-x0"),
  y0: document.getElementById("lz-y0"),
  z0: document.getElementById("lz-z0"),
};

const canvas3D = document.getElementById("lorenz-canvas");
const canvasX = document.getElementById("lorenz-x");
const canvasY = document.getElementById("lorenz-y");
const canvasZ = document.getElementById("lorenz-z");
const runBtn = document.getElementById("lz-run");
const note = document.getElementById("lz-note");

function read(name) { return parseFloat(inputs[name].value); }

function runLorenz() {
  const params = {
    sigma: read("sigma"),
    rho: read("rho"),
    beta: read("beta"),
    dt: read("dt"),
    steps: parseInt(inputs.steps.value, 10),
    x0: read("x0"),
    y0: read("y0"),
    z0: read("z0"),
  };
  const pts = integrateLorenz(params);
  drawLorenz3D(canvas3D, pts, { color: "#58a6ff" });
  drawLineChart(canvasX, [{ label: "x (vitesse)", data: pts.map(p => p.x), color: "#58a6ff" }], { xLabel: "itérations", yLabel: "x (vitesse)" });
  drawLineChart(canvasY, [{ label: "y (chauffage)", data: pts.map(p => p.y), color: "#f85149" }], { xLabel: "itérations", yLabel: "y (chauffage)" });
  drawLineChart(canvasZ, [{ label: "z (pertes)", data: pts.map(p => p.z), color: "#2ea043" }], { xLabel: "itérations", yLabel: "z (pertes)" });
  const last = pts[pts.length - 1];
  note.textContent = `Intégration sur ${pts.length} pas – dernière position: (${last.x.toFixed(2)}, ${last.y.toFixed(2)}, ${last.z.toFixed(2)})`;
}

function bindSteppers() {
  document.querySelectorAll("[data-step-target]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.stepTarget;
      const delta = parseFloat(btn.dataset.delta || "0.1");
      const input = inputs[id];
      const next = parseFloat(input.value) + delta;
      input.value = next.toFixed(3);
      runLorenz();
    });
  });
}

function bindInputs() {
  Object.values(inputs).forEach(inp => {
    inp.addEventListener("input", runLorenz);
  });
}

runBtn.addEventListener("click", runLorenz);
bindSteppers();
bindInputs();
runLorenz();
