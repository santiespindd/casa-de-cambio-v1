/* eslint-disable linebreak-style */
export function generarTablaDeConversion(listadoDeConversiones) {
  const $tabla = document.querySelector('#tabla tbody');
  $tabla.innerHTML = '';
  $tabla.className = '';
  const $titulo = document.createElement('tr');
  const $base = document.createElement('th');
  const $valor = document.createElement('th');
  $base.textContent = 'BASES';
  $valor.textContent = 'RATES';
  $titulo.appendChild($base);
  $titulo.appendChild($valor);
  $tabla.appendChild($titulo);

  Object.keys(listadoDeConversiones).sort().forEach((base) => {
    const $fila = document.createElement('tr');
    const $moneda = document.createElement('td');
    const $cambio = document.createElement('td');
    const $br = document.createElement('br');
    $moneda.textContent = base;
    $cambio.textContent = listadoDeConversiones[base];
    $fila.appendChild($moneda);
    $fila.appendChild($cambio);
    $fila.appendChild($br);
    $tabla.appendChild($fila);
  });
}

export function mostrarListadoMonedas(monedas, callbackSeleccionMoneda) {
  const $listado = document.querySelector('#select-base');

  monedas.forEach((base) => {
    const $item = document.createElement('option');
    $item.value = base;
    $item.textContent = base;

    $item.addEventListener('click', () => {
      callbackSeleccionMoneda();
    });
    $listado.appendChild($item);
  });
}

export function obtenerBaseSeleccionada() {
  const $select = document.querySelector('#select-base');
  const $selectedIndex = $select.selectedIndex;
  const $option = $select.options;
  const baseSeleccionada = $option[$selectedIndex].text;
  return baseSeleccionada;
}

export function obtenerFechaSeleccionada() {
  const $fecha = document.querySelector('#fecha').value;
  return $fecha;
}

export function configurarInputFecha(callbackSeleccionFecha) {
  const $fecha = document.querySelector('#fecha');
  // formato YYYY-MM-DD
  const hoy = (new Date()).toISOString().split('T')[0];
  $fecha.setAttribute('max', hoy);
  $fecha.setAttribute('value', hoy);
  $fecha.addEventListener('change', callbackSeleccionFecha);
}
