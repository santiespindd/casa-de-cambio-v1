/* eslint-disable linebreak-style */
export function obtenerCambios(base = 'EUR', fecha = 'latest') {
  const BASE_URL = 'https://api.exchangeratesapi.io';
  return fetch(`${BASE_URL}/${fecha}?base=${base}`)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => respuesta.rates);
}

export async function obtenerMonedas() {
  const respuesta = await obtenerCambios();
  return Object.keys(respuesta).concat('EUR');
}
