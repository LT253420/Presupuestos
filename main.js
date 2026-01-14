function normalizarTexto(texto) {
  return texto
    .toUpperCase()
    .replace(/\s*\/\s*/g, "/")
    .trim();
}

function buscarModelo() {
  const input = document.getElementById("modeloInput");
  const resultado = document.getElementById("resultado");

  const modeloIngresado = normalizarTexto(input.value);

  resultado.className = "resultado hidden";
  resultado.innerText = "";

  for (const clave in modulos) {
    const modelos = clave
      .toUpperCase()
      .split("/")
      .map(m => m.trim());

    if (modelos.includes(modeloIngresado)) {
      const precioBase = modulos[clave];
      const total = Math.round(precioBase * 1.10);

      resultado.className = "resultado exito";
      resultado.innerText = `💲 Total reparación: $${total}`;
      resultado.classList.remove("hidden");
      return;
    }
  }

  resultado.className = "resultado error";
  resultado.innerText = "⚠️ Modelo no encontrado";
  resultado.classList.remove("hidden");
}
