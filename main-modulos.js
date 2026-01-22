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

function buscarModelo() {
  const input = document.getElementById("modeloInput");
  const resultado = document.getElementById("resultado");

  const textoIngresado = normalizarTexto(input.value);

  // Reset visual
  resultado.className = "resultado";
  resultado.innerHTML = "";

  if (!textoIngresado) {
    resultado.classList.add("error");
    resultado.textContent = "⚠️ Ingresá un modelo";
    
    resultado.classList.remove("hidden");
    resultado.style.display = "block";
    return;
  }

  let modeloDetectado = null;

  // PASO 1: detectar el modelo exacto
  for (const item of modulos) {
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
    resultado.textContent = "⚠️ Modelo no encontrado / mal Escrito / SIN STOCK";
    resultado.classList.remove("hidden");
     resultado.style.display = "block";
    return;
    
  }

  // PASO 2: juntar SOLO precios de ese modelo
  const preciosEncontrados = modulos
    .filter(item => item.modelo === modeloDetectado)
    .map(item => item.precio);

  let html = "";

  preciosEncontrados.forEach(precio => {
    const conGanancia = precio * 2.10; // +110%
    const final = redondearPrecio(conGanancia);
    html += `<div>$ ${final.toLocaleString("es-AR")}</div>`;
  });

  if (preciosEncontrados.length > 1) {
    html = `<strong>Rango de precio a confirmar</strong><br>${html}`;
  }

  resultado.classList.add("exito");
  resultado.innerHTML = html;
  resultado.classList.remove("hidden");
  resultado.style.display = "block";
}
