// Fonctions communes : intégrateurs et petits tracés canvas.

export function simulateLogistic({ r, x0, steps }) {
  const x = [x0];
  for (let i = 0; i < steps; i++) {
    const xn = x[i];
    x.push(Math.max(0, Math.min(1, r * xn * (1 - xn))));
  }
  return x;
}

export function drawLineChart(canvas, series, { xLabel = "", yLabel = "", colors } = {}) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width = canvas.clientWidth * window.devicePixelRatio;
  const height = canvas.height = canvas.clientHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  ctx.clearRect(0, 0, width, height);
  const margin = 40;
  const plotW = canvas.clientWidth - margin * 1.5;
  const plotH = canvas.clientHeight - margin * 1.5;
  const offsetX = margin;
  const offsetY = margin / 2;

  const maxLen = Math.max(...series.map(s => s.data.length));
  const xMax = maxLen - 1;
  const yMax = Math.max(...series.flatMap(s => s.data));
  const yMin = Math.min(...series.flatMap(s => s.data));
  const range = Math.max(1e-6, yMax - yMin);

  ctx.strokeStyle = "#30363d";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(offsetX, offsetY + plotH);
  ctx.lineTo(offsetX + plotW, offsetY + plotH);
  ctx.moveTo(offsetX, offsetY);
  ctx.lineTo(offsetX, offsetY + plotH);
  ctx.stroke();

  ctx.fillStyle = "#9ba1a6";
  ctx.font = "12px sans-serif";
  ctx.fillText(xLabel, offsetX + plotW / 2 - 10, offsetY + plotH + 28);
  ctx.save();
  ctx.translate(12, offsetY + plotH / 2 + 20);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(yLabel, 0, 0);
  ctx.restore();

  series.forEach((s, idx) => {
    const color = colors?.[idx] || s.color || ["#58a6ff", "#2ea043", "#f2cc60", "#f85149"][idx % 4];
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    s.data.forEach((val, i) => {
      const x = offsetX + (i / Math.max(1, xMax)) * plotW;
      const y = offsetY + plotH - ((val - yMin) / range) * plotH;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
  });
}

export function drawScatter(canvas, points, { color = "#58a6ff", radius = 1.6, bounds } = {}) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width = canvas.clientWidth * window.devicePixelRatio;
  const height = canvas.height = canvas.clientHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  ctx.clearRect(0, 0, width, height);
  const margin = 40;
  const plotW = canvas.clientWidth - margin * 1.5;
  const plotH = canvas.clientHeight - margin * 1.5;
  const offsetX = margin;
  const offsetY = margin / 2;

  const xMax = bounds?.xMax ?? Math.max(...points.map(p => p.x));
  const xMin = bounds?.xMin ?? Math.min(...points.map(p => p.x));
  const yMax = bounds?.yMax ?? Math.max(...points.map(p => p.y));
  const yMin = bounds?.yMin ?? Math.min(...points.map(p => p.y));

  ctx.strokeStyle = "#30363d";
  ctx.beginPath();
  ctx.moveTo(offsetX, offsetY + plotH);
  ctx.lineTo(offsetX + plotW, offsetY + plotH);
  ctx.moveTo(offsetX, offsetY);
  ctx.lineTo(offsetX, offsetY + plotH);
  ctx.stroke();

  ctx.fillStyle = color;
  points.forEach(p => {
    const x = offsetX + ((p.x - xMin) / Math.max(1e-6, xMax - xMin)) * plotW;
    const y = offsetY + plotH - ((p.y - yMin) / Math.max(1e-6, yMax - yMin)) * plotH;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

export function integrateLorenz({ x0 = 1, y0 = 1, z0 = 1, sigma, rho, beta, dt, steps }) {
  const pts = [{ x: x0, y: y0, z: z0 }];
  for (let i = 0; i < steps; i++) {
    const { x, y, z } = pts[i];
    const dx = sigma * (y - x);
    const dy = x * (rho - z) - y;
    const dz = x * y - beta * z;
    pts.push({ x: x + dx * dt, y: y + dy * dt, z: z + dz * dt });
  }
  return pts;
}

export function drawLorenz(canvas, points, { color = "#58a6ff" } = {}) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width = canvas.clientWidth * window.devicePixelRatio;
  const height = canvas.height = canvas.clientHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  ctx.clearRect(0, 0, width, height);
  const margin = 30;
  const plotW = canvas.clientWidth - margin * 2;
  const plotH = canvas.clientHeight - margin * 2;
  const offsetX = margin;
  const offsetY = margin;

  const xVals = points.map(p => p.x);
  const yVals = points.map(p => p.z); // On projette (x,z)
  const xMax = Math.max(...xVals);
  const xMin = Math.min(...xVals);
  const yMax = Math.max(...yVals);
  const yMin = Math.min(...yVals);
  const xRange = Math.max(1e-6, xMax - xMin);
  const yRange = Math.max(1e-6, yMax - yMin);

  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  points.forEach((p, i) => {
    const x = offsetX + ((p.x - xMin) / xRange) * plotW;
    const y = offsetY + plotH - ((p.z - yMin) / yRange) * plotH;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

export function drawLorenz3D(canvas, points, { color = "#58a6ff", angle = 0.8 } = {}) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width = canvas.clientWidth * window.devicePixelRatio;
  const height = canvas.height = canvas.clientHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  ctx.clearRect(0, 0, width, height);

  // Rotation simple autour des axes X et Z pour un rendu 3D projeté.
  const sinA = Math.sin(angle), cosA = Math.cos(angle);
  const sinB = Math.sin(angle * 0.6), cosB = Math.cos(angle * 0.6);

  const rotated = points.map(p => {
    // rotation autour Z
    const xz = p.x * cosA - p.y * sinA;
    const yz = p.x * sinA + p.y * cosA;
    // rotation autour X pour incliner le z
    const yx = yz * cosB - p.z * sinB;
    const zx = yz * sinB + p.z * cosB;
    return { x: xz, y: yx, z: zx };
  });

  const xs = rotated.map(p => p.x);
  const ys = rotated.map(p => p.y);
  const zs = rotated.map(p => p.z);
  const xMin = Math.min(...xs), xMax = Math.max(...xs);
  const yMin = Math.min(...ys), yMax = Math.max(...ys);
  const zMin = Math.min(...zs), zMax = Math.max(...zs);
  const w = canvas.clientWidth * 0.8;
  const h = canvas.clientHeight * 0.8;
  const ox = canvas.clientWidth * 0.1;
  const oy = canvas.clientHeight * 0.1;

  const xRange = Math.max(1e-6, xMax - xMin);
  const yRange = Math.max(1e-6, yMax - yMin);

  ctx.lineWidth = 1.2;
  ctx.beginPath();
  rotated.forEach((p, i) => {
    const x = ox + ((p.x - xMin) / xRange) * w;
    const y = oy + h - ((p.y - yMin) / yRange) * h;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  const grd = ctx.createLinearGradient(0, 0, canvas.clientWidth, canvas.clientHeight);
  grd.addColorStop(0, color);
  grd.addColorStop(1, "#f85149");
  ctx.strokeStyle = grd;
  ctx.stroke();

  // Dessin rapide de repère
  ctx.strokeStyle = "#30363d";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(ox, oy + h);
  ctx.lineTo(ox + w, oy + h);
  ctx.moveTo(ox, oy + h);
  ctx.lineTo(ox, oy);
  ctx.stroke();
}
