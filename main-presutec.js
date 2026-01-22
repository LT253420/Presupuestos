/* =======================
   PRESUPUESTO TÉCNICO
======================= */

function redondearTecnico(valor) {
  if (valor <= 400) {
    return Math.floor(valor / 10) * 10;
  }
  return Math.ceil(valor / 1000) * 1000;
  
}

window.calcularPresupuestoTecnico = () => {
  const input = document.getElementById("precioTecnicoInput");
  const resultado = document.getElementById("resultadoTecnico");

  const base = Number(input.value);

  // Reset visual
  resultado.className = "resultado";
  resultado.innerHTML = "";

  if (!base || base <= 0) {
    resultado.classList.add("error");
    resultado.textContent = "⚠️ Ingresá un valor válido";
    resultado.classList.remove("hidden");
    return;
  }

  // +100% +5%
  const conGanancia = base * 2;
  const total = conGanancia * 1.05;

  const final = redondearTecnico(total);

  resultado.classList.add("exito");
  resultado.innerHTML = `$ ${final.toLocaleString("es-AR")}`;
  resultado.classList.remove("hidden");
};
