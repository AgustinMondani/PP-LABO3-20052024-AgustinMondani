class CryptoBase {
    constructor(id, nombre, simbolo, fechaCreacion, precioActual) {
        this.id = id;
        this.nombre = nombre;
        this.simbolo = simbolo;
        this.fechaCreacion = fechaCreacion;
        this.precioActual = precioActual;
    }
}


class Crypto extends CryptoBase {
    constructor(id, nombre, simbolo, fechaCreacion, precioActual, tipoConsenso, algoritmo) {
        super(id, nombre, simbolo, fechaCreacion, precioActual);
        this.tipoConsenso = tipoConsenso;
        this.algoritmo = algoritmo;
    }
}

// No pude importar y meti todo en el mismo archivo--------------------------------------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', onInit);
    
function onInit(){
    const form = document.getElementById('crypto-form');
    const spinner = document.getElementById('spinner');
    const tableBody = document.querySelector('#crypto-table tbody');
    const eliminarTodosBtn = document.getElementById('eliminar-todos');
    const cancelarEdicionBtn = document.getElementById('cancelar-edicion');

    let editando = false;
    let editId = null;
    
    function mostrarSpinner() {
        spinner.style.display = 'block';
    }

    function ocultarSpinner() {
        spinner.style.display = 'none';
    }

    function obtenerCryptos() {
        return JSON.parse(localStorage.getItem('cryptos')) || [];
    }

    function guardarCryptos(cryptos) {
        localStorage.setItem('cryptos', JSON.stringify(cryptos));
    }

    function agregarCrypto(crypto) {
        const cryptos = obtenerCryptos();
        cryptos.push(crypto);
        guardarCryptos(cryptos);
        renderizarLista();
    }

    function actualizarCrypto(crypto) {
        const cryptos = obtenerCryptos();
        const index = cryptos.findIndex(c => c.id === crypto.id);
        cryptos[index] = crypto;
        guardarCryptos(cryptos);
        renderizarLista();
    }

    function eliminarCrypto(id) {
        const cryptos = obtenerCryptos();
        const filtrados = cryptos.filter(c => c.id !== id);
        guardarCryptos(filtrados);
        renderizarLista();
    }

    function eliminarTodos() {
        if (confirm('¿Seguro que desea eliminar todas las crypto?')) {
            localStorage.removeItem('cryptos');
            renderizarLista();
        }
    }

    function limpiarFormulario() {
        form.reset();
        editando = false;
        editId = null;
    }

    function renderizarLista() {
        mostrarSpinner();
        setTimeout(() => {
            const cryptos = obtenerCryptos();
            tableBody.innerHTML = '';
            cryptos.forEach(crypto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${crypto.nombre}</td>
                    <td>${crypto.simbolo}</td>
                    <td>${crypto.fechaCreacion}</td>
                    <td>${crypto.precioActual}</td>
                    <td>${crypto.tipoConsenso}</td>
                    <td>${crypto.algoritmo}</td>
                    <td>
                        <button onclick="editarCrypto('${crypto.id}')">Editar</button>
                        <button onclick="eliminarCrypto('${crypto.id}')">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
            ocultarSpinner();
        }, 2500);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = editando ? editId : Date.now().toString();
        const nombre = document.getElementById('nombre').value;
        const simbolo = document.getElementById('simbolo').value;
        const fechaCreacion = document.getElementById('fechaCreacion').value;
        const precioActual = document.getElementById('precioActual').value;
        const tipoConsenso = document.getElementById('tipoConsenso').value;
        const algoritmo = document.getElementById('algoritmo').value;

        const crypto = {
            id, 
            nombre, 
            simbolo, 
            fechaCreacion, 
            precioActual, 
            tipoConsenso, 
            algoritmo
        };

        if (editando) {
            actualizarCrypto(crypto);
        } else {
            agregarCrypto(crypto);
        }

        limpiarFormulario();
    });

    eliminarTodosBtn.addEventListener('click', eliminarTodos);
    cancelarEdicionBtn.addEventListener('click', limpiarFormulario);
    
    editId.addEventListener('click', limpiarFormulario);

    renderizarLista();
};

function editarCrypto(id) {
    const cryptos = JSON.parse(localStorage.getItem('cryptos')) || [];
    const crypto = cryptos.find(c => c.id === id);
    cargarFormulario(crypto);
}

function cargarFormulario(crypto) {
    document.getElementById('nombre').value = crypto.nombre;
    document.getElementById('simbolo').value = crypto.simbolo;
    document.getElementById('fechaCreacion').value = crypto.fechaCreacion;
    document.getElementById('precioActual').value = crypto.precioActual;
    document.getElementById('tipoConsenso').value = crypto.tipoConsenso;
    document.getElementById('algoritmo').value = crypto.algoritmo;
    editando = true;
    editId = crypto.id;
}