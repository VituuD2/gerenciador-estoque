let codigoPedido = document.querySelector('#codigoPedido');
let codigoProduto = document.querySelector('#codigoProduto');
let plusBtn = document.querySelector('.plusBtn');

// let codigoProdutoHTML = document.querySelectorAll('#codigoProduto');
let table = document.querySelector('#table');


// plusBtn.addEventListener('click', ()=> {
//     let codigoProdutoValor = codigoProduto.value;
// });
let row = document.createElement('tr');



codigoPedido.addEventListener('keydown', (e)=>{
    if (e.key === "Enter" || e.keycode === 13) {
        e.preventDefault();

        let cell = document.createElement('td')
        cell.classList.add('cellPedido');
        let codigoPedidoValor = codigoPedido.value;
        if (codigoPedidoValor) {
            
            cell.textContent = codigoPedidoValor;
            table.appendChild(row);
            row.appendChild(cell);
        }
        codigoProduto.focus();
    }
    
});

codigoProduto.addEventListener('keydown', (e)=>{
    for (let i = 1; i <= codigoProduto.value.length; i++) {
        if (e.key === 'Enter' || e.keycode === 13) {
            e.preventDefault();
            
            let cell2 = document.createElement('td')
    
            let codigoProdutoValor = codigoProduto.value;
            if (codigoProdutoValor) {
                cell2.textContent = codigoProdutoValor;
                row.appendChild(cell2);
            }
            codigoProduto.value = '';
            codigoProduto.focus();
        }
    }
});


