let codigoPedido = document.querySelector('#codigoPedido');
let codigoProduto = document.querySelectorAll('#codigoProduto');
let plusBtn = document.querySelector('.plusBtn');

let codigoProdutoHTML = document.querySelector('#codigoProduto');
let table = document.querySelector('#table');


// plusBtn.addEventListener('click', ()=> {
//     let codigoProdutoValor = codigoProduto.value;
// });

let row = document.createElement('tr');
let cell = document.createElement('td');

codigoPedido.addEventListener('keydown', (e)=>{
    if (e.key === "Enter" || e.keycode === 13) {
        e.preventDefault();

        let codigoPedidoValor = codigoPedido.value;
        if (codigoPedidoValor) {
            
            cell.textContent = codigoPedidoValor;
            table.appendChild(row);
            row.appendChild(cell);
        }
        codigoProdutoHTML.focus();
    }
    
});

codigoProduto.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter' || e.keycode === 13) {
        e.preventDefault();

        let
    }
});


