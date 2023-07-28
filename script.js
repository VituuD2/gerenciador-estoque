let codigoPedido = document.querySelector('#codigoPedido');
let codigoProduto = document.querySelector('#codigoProduto');
let plusBtn = document.querySelector('.plusBtn');
let table = document.querySelector('#table');
let pedidoCountContainer = document.querySelector('#pedidoCountContainer');
let pedidoCount = 1;
let regex = /[a-zA-Z]/;

function exportToXLSX() {
    let headers = ["Pedido", "Produto"];
    let data = [];
  
    let tableRows = document.querySelectorAll('.tableStyle tr');
    for (let i = 0; i < tableRows.length; i++) {
      let rowData = [];
      let cells = tableRows[i].querySelectorAll('td');
      for (let j = 0; j < cells.length; j++) {
        rowData.push(cells[j].textContent);
      }
      data.push(rowData);
    }
  
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");
  
    let today = new Date();
    let fileName = "dados_" + today.toISOString().slice(0, 10) + ".xlsx";
    XLSX.writeFile(workbook, fileName);
  }

codigoPedido.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
        e.preventDefault();
        row = document.createElement('tr');
        countCell = document.createElement('td');
        
        if (codigoPedido.value.length !=5) {
            window.alert('Código de Pedido Incorreto !');
        } else {
            row.appendChild(countCell);
            countCell.classList.add('countCell');
            countCell.textContent = pedidoCount++;

            let cell = document.createElement('td');
            cell.classList.add('cellPedido');
            let codigoPedidoValor = codigoPedido.value;
            if (codigoPedidoValor) {
                cell.textContent = codigoPedidoValor;
                table.appendChild(row);
                row.appendChild(cell);
        }
        codigoProduto.focus();
        }
    }
});

let inputData = document.querySelector('#inputData');

inputData.addEventListener('change', (e)=>{
    const inputValue = e.target.value;
    if (inputValue) {
        const [day, month, year] = inputValue.split('-');

        const formattedData = `${day}-${month}-${year}`;

        inputData.value = formattedData;
    }
})
    


codigoProduto.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();

        let cell2 = document.createElement('td');
        let codigoProdutoValor = codigoProduto.value;

        if (codigoProduto.value.length !=13 || regex.test(codigoProdutoValor) == true) {
            console.log(codigoProduto.value.length);
            window.alert('Código de Produto Incorreto !');
        } else {
            if (codigoProdutoValor) {
                cell2.textContent = codigoProdutoValor;
                row.appendChild(cell2);
            }
        }
        codigoProduto.value = '';
        codigoProduto.focus();
    }
});




plusBtn.addEventListener('click', ()=> {
    codigoPedido.value = '';
    codigoProduto.value = '';
    codigoPedido.focus();

});