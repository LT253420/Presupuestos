/* =======================
   UTILIDADES
======================= */

// Redondeo personalizado
function redondearPrecio(valor) {
  if (valor < 100) {
    return Math.floor(valor / 10) * 10;
  }
  return Math.ceil(valor / 1000) * 1000;
}

// Normaliza texto para comparar
function normalizarTexto(texto) {
  return texto
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();
}

/* =======================
   LÓGICA PRINCIPAL
======================= */

function buscarBateria() {
  const input = document.getElementById("modeloBateriaInput");
  const resultado = document.getElementById("resultadoBateria");

  const textoIngresado = normalizarTexto(input.value);

  resultado.className = "resultado";
  resultado.innerHTML = "";

  if (!textoIngresado) {
    resultado.classList.add("error");
    resultado.textContent = "⚠️ Ingresá un modelo";
    resultado.classList.remove("hidden");
    return;
  }

  let modeloDetectado = null;

  for (const item of baterias) {
    const variantes = normalizarTexto(item.modelo)
      .split("/")
      .map(v => v.trim());

    if (variantes.some(v => textoIngresado.includes(v))) {
      modeloDetectado = item.modelo;
      break;
    }
  }

  if (!modeloDetectado) {
    resultado.classList.add("error");
    resultado.textContent = "⚠️ Modelo no encontrado / SIN STOCK";
    resultado.classList.remove("hidden");
    return;
  }

  const precios = baterias
    .filter(item => item.modelo === modeloDetectado)
    .map(item => item.precio);

  let html = "";

  precios.forEach(precio => {
    const final = redondearPrecio(precio * 2.1);
    html += `<div>$ ${final.toLocaleString("es-AR")}</div>`;
  });

  resultado.classList.add("exito");
  resultado.innerHTML = html;
  resultado.classList.remove("hidden");
}
