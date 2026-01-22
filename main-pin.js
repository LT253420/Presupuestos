/* =======================
   PIN DE CARGA / PLACA
======================= */

// 🔧 Valor base FIJO (editable)
const COSTO_PIN = 16500; // 👈 CAMBIÁS SOLO ESTO CUANDO QUIERAS

function redondearPrecioPin(valor) {
  if (valor <= 400) {
    return Math.floor(valor / 10) * 10;
  }
  return Math.ceil(valor / 1000) * 1000;
}

function calcularPin() {
  const resultado = document.getElementById("resultadoPin");

  resultado.className = "resultado";
  resultado.innerHTML = "";

  // +110%
  const conGanancia = COSTO_PIN * 2.10;
  const final = redondearPrecioPin(conGanancia);

  resultado.classList.add("exito");
  resultado.innerHTML = `$ ${final.toLocaleString("es-AR")}`;
  resultado.classList.remove("hidden");
}
