//Importações do HTML
let codigoPedido = document.querySelector('#codigoPedido');
let codigoProduto = document.querySelector('#codigoProduto');
let plusBtn = document.querySelector('#plusBtn');
let table = document.querySelector('#table');
let pedidoCountContainer = document.querySelector('#pedidoCountContainer');
let pedidoCount = 1;
let regex = /[a-zA-Z]/;
let row;

//Função para carregar os dados do LocalStorage e popular na tabela 
function loadDataFromLocalStorage() {
    let data = localStorage.getItem('tableData');
    if (data) {
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
            row = document.createElement('tr');
            countCell = document.createElement('td');
            countCell.classList.add('countCell');
            countCell.textContent = data[i][0];
            row.appendChild(countCell);

            for (let j = 1; j < data[i].length; j++) {
                let cell = document.createElement('td');
                cell.textContent = data[i][j].text;
                cell.classList.add(...data[i][j].classes);

                row.appendChild(cell);
            }

            let removeCell = document.createElement('td'); // Criar a célula de remoção apenas uma vez
            removeCell.classList.add('removeCell');
            removeCell.textContent = "✖";
            removeCell.addEventListener('click', () => {
                let parentRow = removeCell.closest('tr');
                parentRow.remove();
                updatePedidoCount();
                saveDataToLocalStorage();
            });

            row.appendChild(removeCell); // Adicionar a célula de remoção à linha

            table.appendChild(row);
            updatePedidoCount();
        }
    }
}

// Call the function to load data when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    loadDataFromLocalStorage();
  });

function saveDataToLocalStorage() {
    let data = [];
    let tableRows = document.querySelectorAll('.tableStyle tr');
    for (let i = 0; i < tableRows.length; i++) {
      let rowData = [];
      let cells = tableRows[i].querySelectorAll('td');
      for (let j = 0; j < cells.length; j++) {
        rowData.push({
            text: cells[j].textContent,
            classes: Array.from(cells[j].classList) // Salvar todas as classes da célula
        });
      }
      data.push(rowData);
    }
    localStorage.setItem('tableData', JSON.stringify(data));
  }


//Função para criar a tabela com código do pedido 
codigoPedido.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
        e.preventDefault();
        row = document.createElement('tr');
        
        if (codigoPedido.value.length !=5) {
            window.alert('Código de Pedido Incorreto !');
        } else {
            let newCountCell = document.createElement('td'); // Criar uma nova célula countCell
            row.appendChild(newCountCell);
            newCountCell.classList.add('countCell');
            newCountCell.textContent = pedidoCount++;

            let cell = document.createElement('td');
            cell.classList.add('cellPedido');
            let codigoPedidoValor = codigoPedido.value;
            if (codigoPedidoValor) {
                cell.textContent = codigoPedidoValor;
                table.appendChild(row);
                row.appendChild(cell);

                // Célula de data
                dateCell = document.createElement('td');
                dateCell.classList.add('dateCell');
                row.appendChild(dateCell);

                // Célula de vendedor
                sellerCell = document.createElement('td');
                sellerCell.classList.add('radioCell');
                row.appendChild(sellerCell);

                // Célula de exclusão
                removeCell = document.createElement('td');
                removeCell.classList.add('removeCell');
                removeCell.classList.add('removeCell');
                removeCell.textContent = "✖";
                removeCell.addEventListener('click', () => {
                    let parentRow = removeCell.closest('tr');
                    parentRow.remove();
                    updatePedidoCount();
                    saveDataToLocalStorage(); // Save data to localStorage after removing the row
                });
                row.appendChild(removeCell);
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

//Função para carregar os dados do arquivo produtos.json
async function carregarProdutos() {
    try {
        const response = await fetch('assets/produtos.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao carregar os produtos', error);
        return {};
    }
}
// Objeto para armazenar os produtos carregados do arquivo

let produtos = {};

// Carregar os produtos do arquivo produtos.json
carregarProdutos().then((data) => {
    produtos = data;
});

//Função para adicionar à tabela o código do Produto

codigoProduto.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();

        let cell2 = document.createElement('td');
        let codigoProdutoValor = codigoProduto.value;

        if (codigoProduto.value.length !=13 || !produtos.hasOwnProperty(codigoProdutoValor)) {
            window.alert('Código de Produto Incorreto !');
        } else {
            if (codigoProdutoValor) {
                
                cell2.textContent = produtos[codigoProdutoValor];
                row.appendChild(cell2);
                saveDataToLocalStorage(); 
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
        sellerCell.textContent = selectedValue;
        saveDataToLocalStorage(); 
    } else {
        window.alert('Preencha a DATA para continuar !');
    }
}

//Botão para limpar os campos e começar um novo pedido

plusBtn.addEventListener('click', ()=> {
    if (inputData.value == '') {
        window.alert('Ação Incorreta');
    } else {
        getValue();

        // Preencher células de data e vendedor
        updateDataCell();
        updateSellerCell();
        
        countCell = document.createElement('td');
        codigoPedido.value = '';
        codigoProduto.value = '';
        varejoRadio.checked = false;
        atacadoRadio.checked = false;
        inputData.value = '';
        inputData.disabled = false;
        codigoPedido.focus();
        
    }
    saveDataToLocalStorage(); 

});

function updateDataCell() {
    let dateCells = document.querySelectorAll('.dateCell');
    dateCells.forEach(cell => {
        if (dateCells) {
            let [year, month, day] = inputData.value.split('-');
            let formattedYear = year.slice(-2);
            let formattedData = `${day}-${month}-${formattedYear}`;
            console.log(formattedData);
            
            cell.textContent = formattedData;
        }
    });
}

function updateSellerCell() {
    let sellerCells = document.querySelectorAll('.radioCell');
    let selectedValue = null;
    
    radioButtons.forEach(radio => {
        if (radio.checked) {
            selectedValue = radio.value;
        }
    });

    sellerCells.forEach(cell => {
        cell.textContent = selectedValue;
    });
}


//Função para Exportar em XLSX

function exportToXLSX() {
    updatePedidoCount();
    let headers = ["Contagem","Pedido", "Produtos"];
    let data = [];

    let tableRows = document.querySelectorAll('.tableStyle tr');
    for (let i = 0; i < tableRows.length; i++) {
        let rowData = [];
        let cells = tableRows[i].querySelectorAll('td');
        
        // Create a new array to store cell values excluding removeCell cells
        let rowDataWithoutButtons = [];
        for (let j = 0; j < cells.length; j++) {
            if (!cells[j].classList.contains('removeCell')) {
                rowDataWithoutButtons.push(cells[j].textContent);
            }
        }

        // Skip rows that only contain the removeCell cell
        if (rowDataWithoutButtons.length > 0) {
            rowData.push(...rowDataWithoutButtons);
            data.push(rowData);
        }
    }

    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");

    let today = new Date();
    let fileName = "dados_" + today.toISOString().slice(0, 10) + ".xlsx";
    XLSX.writeFile(workbook, fileName);
}
  //Função para importar em XLSX

  document.querySelector('#importBtn').addEventListener('change', (event) => {
    importAndReplaceTable(event);
});

function importAndReplaceTable(event) {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Limpa todas as linhas existentes antes de importar
        removeAllRows();

        for (let i = 1; i < rows.length; i++) {
            let row = document.createElement("tr");

            for (let j = 0; j < rows[i].length; j++) {
                let cell = document.createElement("td");
                cell.textContent = rows[i][j];
                row.appendChild(cell);
            }

            let removeCell = document.createElement('td'); // Criar a célula de remoção
            removeCell.classList.add('removeCell');
            removeCell.textContent = "✖";
            removeCell.addEventListener('click', () => {
                let parentRow = removeCell.closest('tr');
                parentRow.remove();
                updatePedidoCount();
                saveDataToLocalStorage();
            });
            row.appendChild(removeCell); // Adicionar a célula de remoção à nova linha

            table.appendChild(row);
            saveDataToLocalStorage();
        }
    };

    reader.readAsArrayBuffer(file);
}

  //Função para limpar toda tabela

  function removeAllRows() {
    let tableRows = document.querySelectorAll('.tableStyle tr');
    tableRows.forEach(row => {
      row.remove();
    });
  
    // Atualizar a contagem de pedidos após remover todas as linhas
    updatePedidoCount();
    // Salvar os dados no Local Storage após remover todas as linhas
    saveDataToLocalStorage();
  }