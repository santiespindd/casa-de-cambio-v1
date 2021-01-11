


inicializar();

function obtenerCambios(base = 'EUR', fecha = 'latest'){
    const BASE_URL = 'https://api.exchangeratesapi.io';
   return fetch(`${BASE_URL}/${fecha}?base=${base}`)
    .then((respuesta) => respuesta.json())
    .then((respuesta) =>  respuesta.rates);

    
}

function obtenerMonedas() {
    return obtenerCambios().then((respuesta) => Object.keys(respuesta).concat('EUR'));
  }

function mostrarListadoMonedas(monedas){
    const $listado = document.querySelector('#select-base');
 
    monedas.forEach(base => {
        const $item = document.createElement('option');
        $item.value= base;
        $item.textContent= base;

        $item.addEventListener('click' , () => {
            actualizar();
        });
        $listado.appendChild($item);

    });

  
    
}

function obtenerFechaSeleccionada(){
    const $fecha = document.querySelector('#fecha').value;
    return $fecha ;

}
function obtenerBaseSeleccionada(){
    const $select = document.querySelector('#select-base');
    const $selectedIndex = $select.selectedIndex;
    const $option = $select.options; 
    const baseSeleccionada = $option[$selectedIndex].text;
    return baseSeleccionada;
}
function configurarInputFecha() {
    const $fecha = document.querySelector('#fecha');
    // formato YYYY-MM-DD
    const hoy = (new Date()).toISOString().split('T')[0];
    $fecha.setAttribute('max', hoy);
    $fecha.setAttribute('value' , hoy);
    $fecha.addEventListener('change', actualizar);
  }



function  generarTablaDeConversion(listadoDeConversiones){
    const $tabla = document.querySelector('#tabla tbody');
    $tabla.innerHTML= '';
    $tabla.className='';
    const $titulo = document.createElement('tr');
    const $base = document.createElement('th');
    const $valor = document.createElement('th');
    $base.textContent = 'BASES';
    $valor.textContent = 'RATES';
    $titulo.appendChild($base)
     $titulo.appendChild($valor);
    $tabla.appendChild($titulo);

    console.log(listadoDeConversiones);
    Object.keys(listadoDeConversiones).sort().forEach(base => {
      
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
        
    })

      
}


function actualizar(){
  
  
    obtenerCambios(obtenerBaseSeleccionada(), obtenerFechaSeleccionada())
      .then((cambios) => {
        generarTablaDeConversion(cambios);
      });
}
function inicializar() {
    obtenerMonedas().then((monedas) => {
      mostrarListadoMonedas(monedas);
    })

    
    configurarInputFecha();
};

document.querySelector('#boton').onclick = function(){

  
  
    actualizar();

} 




