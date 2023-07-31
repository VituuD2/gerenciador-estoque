//Importações do HTML
let codigoPedido = document.querySelector('#codigoPedido');
let codigoProduto = document.querySelector('#codigoProduto');
let plusBtn = document.querySelector('#plusBtn');
let table = document.querySelector('#table');
let pedidoCountContainer = document.querySelector('#pedidoCountContainer');
let pedidoCount = 1;
let regex = /[a-zA-Z]/;

//Função para criar a tabela com código do pedido 

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

//Função para adicionar à tabela o código do Produto

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

//Função para adicionar à tabela a data

let inputData = document.querySelector('#inputData');
let dateRow = document.querySelector('.dateRow');

inputData.addEventListener('change', (e)=>{
    if (inputData) {
        let [year, month, day] = inputData.value.split('-');
        let formattedYear = year.slice(-2);
        let formattedData = `${day}-${month}-${formattedYear}`;
        console.log(formattedData);
        dateCell = document.createElement('td');
        dateCell.classList.add('dateCell');

        dateCell.textContent = formattedData;
        row.appendChild(dateCell);
    }

    if (inputData.value != null && codigoPedido.value !=0) {
        inputData.disabled = true;
    }
})

//Botão para limpar os campos e começar um novo pedido

plusBtn.addEventListener('click', ()=> {
    codigoPedido.value = '';
    codigoProduto.value = '';
    inputData.value = '';
    inputData.disabled = false;
    codigoPedido.focus();

});

//Função para Exportar em XLSX

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