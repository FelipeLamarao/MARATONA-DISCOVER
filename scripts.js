const Modal = {  
    open(){
        //Abrir modal
        // Adicionar a class active ao modal
        document.querySelector('.modal-overlay').classList.add('active');
    },
    close(){ 
       //fechar o modal
       // remover a class active do modal
       document.querySelector('.modal-overlay').classList.remove('active');
    }
}

// Eu preciso pegar as minhas transaçoes do meu 
// objeto aqui no javascript
// e jogar no meu html

const transactions = [
    {  
        id: 1, 
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021'        
    },
    { 
        id: 2, 
        description: 'Website',
        amount: 500000,
        date: '23/01/2021'        
    },
    { 
        id: 3, 
        description: 'Internet',
        amount:   -20000,
        date: '23/01/2021'        
    },
    { 
        id: 4, 
        description: 'App',
        amount:   20000,
        date: '30/01/2021'        
    },
]

// Eu preciso somar as entradas
// depois eu preciso somar as saidas e
// remover das entradas o valor das saidas 
// assim, eu terei o total

const Transaction = {
    incomes(){
        // somar as entradas
    },
    expenses(){
        //somar as saidas
    },
    total(){
        // entradas - saidas
    }
}


// variavel que recebe minhas transactions

const DOM = {
    
    transactionsContainer : document.querySelector('#data-table tbody'), // container que armazena o 'tr' e indica onde sera feita a alteração
    
    addTransaction(transaction, index){
         
        
        const tr = document.createElement('tr');
        tr.innerHTML = this.innerHTMLTransaction(transaction);        

        DOM.transactionsContainer.appendChild(tr) // container filho de tr .. o elemento criado
        
    },

    // OBJETO QUE AFETA DIRETAMEMENTE O HTML
    innerHTMLTransaction(transaction) {
        const CSSclass =  transaction.amount > 0 ? "income" : "expense"

        //const amount = Utils.formatCurrency(transaction.amount) 
        
        const html = `
     
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${transaction.amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/assets/minus.svg" alt="Remover Transação"> 
            </td>
 
       `

       return html
    }
}

//const Utils = {
//    formatCurrency(value){
//        const signal = number(value) < 0 ? "-" : ""    
//    }
//}

transactions.forEach(function(transaction){
    DOM.addTransaction(transaction) 
})