//Importações do HTML
let codigoPedido = document.querySelector('#codigoPedido');
let codigoProduto = document.querySelector('#codigoProduto');
let plusBtn = document.querySelector('#plusBtn');
let table = document.querySelector('#table');
let pedidoCountContainer = document.querySelector('#pedidoCountContainer');
let pedidoCount = 1;
let regex = /[a-zA-Z]/;
let row;

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
                
                //Botão para remover o pedido
                let removeCell = document.createElement('td');
                let removeButton = document.createElement('button');
                removeButton.classList.add('removeButton');
                removeButton.textContent = "✖";
                removeButton.addEventListener('click', () => {
                    let parentRow = removeButton.closest('tr');
                    parentRow.remove();
                    updatePedidoCount();
                    codigoPedido.value ='';
                    codigoPedido.focus();
                });
                removeCell.appendChild(removeButton);
                row.appendChild(removeCell);
                updatePedidoCount();
        }
        codigoProduto.focus();
        }
    }
});

//Função para atualizar a contagem de pedidos

function updatePedidoCount() {
    let rows = document.querySelectorAll('.tableStyle tr');

    rows.forEach((row, index) => {
        let countCell = row.querySelector('.countCell');
        if (countCell) {
            countCell.textContent = index +1;
        }
    });

    pedidoCount = rows.length +1; // -1 para descontar o cabeçalho da tabela
}


//Função para adicionar à tabela o código do Produto

codigoProduto.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();

        let cell2 = document.createElement('td');
        let codigoProdutoValor = codigoProduto.value;

        if (codigoProduto.value.length !=13 || regex.test(codigoProdutoValor) == true) {
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

//Função para adicionar data à tabela

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
        let removeCell = document.createElement('td');
    }

    if (inputData.value != null && codigoPedido.value !=0) {
        inputData.disabled = true;
    }
})

//Função para pegar o input:radio checked e mostrar o valor na tabela
let varejoRadio = document.querySelector('#varejoRadio');
let atacadoRadio =  document.querySelector('#atacadoRadio');
let radioButtons = document.querySelectorAll('input[name="seller"]');
function getValue() {
    let selectedValue = null
    
    radioButtons.forEach(radio => {
        if (radio.checked) {
            selectedValue = radio.value;
        }
    })
    if (!varejoRadio.checked && !atacadoRadio.checked) {
        window.alert('Selecione uma opção ATACADO ou VAREJO para continuar !');
    } else if (inputData.value !== '') {
        radioCell = document.createElement('td');
        radioCell.textContent = selectedValue;
        radioCell.classList.add('radioCell');
        row.appendChild(radioCell);
    } else {
        window.alert('Preencha a DATA para continuar !');
    }
}

//Botão para limpar os campos e começar um novo pedido

plusBtn.addEventListener('click', ()=> {
    getValue();
    let row = document.createElement('tr');
    countCell = document.createElement('td');
    codigoPedido.value = '';
    codigoProduto.value = '';
    varejoRadio.checked = false;
    atacadoRadio.checked = false;
    inputData.value = '';
    inputData.disabled = false;
    codigoPedido.focus();

});

//Função para Exportar em XLSX

function exportToXLSX() {
    updatePedidoCount();
    let headers = ["Contagem","Pedido", "Produtos"];
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