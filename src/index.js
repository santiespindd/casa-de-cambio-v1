/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable func-names */
import { obtenerMonedas, obtenerCambios } from './cambios.js';
import * as ui from './ui.js';

async function actualizar() {
  const cambios = await obtenerCambios(ui.obtenerBaseSeleccionada(), ui.obtenerFechaSeleccionada());
  ui.generarTablaDeConversion(cambios);
}

async function inicializar() {
  ui.configurarInputFecha(actualizar);
  ui.mostrarListadoMonedas(await obtenerMonedas(), actualizar);
}

inicializar();

document.querySelector('#boton').onclick = function () {
  actualizar();
};
