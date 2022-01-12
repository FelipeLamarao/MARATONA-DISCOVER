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

        description: 'Luz',
        amount:-5000,
        date: '23/01/2021'        
    },
    { 
        
        description: 'Website',
        amount: 500000,
        date: '23/01/2021'        
    },  
    { 
      
        description: 'Internet',
        amount:-20000,
        date: '23/01/2021'        
    },
    { 
        
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
    all : transactions,

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes(){
        //pegar todas as  transacoes , para cada transacao, se ela for maior que zero somar a uma variavel e retornar a variavel      
        let income = 0;
        Transaction.all.forEach(t =>{
            if (t.amount > 0){
                income += t.amount;
            }
        })        
        return income
    },

    expenses(){
        let expense = 0;
        Transaction.all.forEach(t =>{
            if (t.amount < 0){
                expense += t.amount;
            }
        })        
        return expense
    },


    total(){
        return Transaction.incomes() + Transaction.expenses()
    }
}

// variavel que recebe minhas transactions

const DOM = {
    
    transactionsContainer : document.querySelector('#data-table tbody'), // container que armazena o 'tr' e indica onde sera feita a alteração
    
    // adiciona as transaçoes ==============================
    addTransaction(transaction, index){      
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction,index);     
        tr.dataset.index = index
        DOM.transactionsContainer.appendChild(tr) // container filho de tr .. o elemento criado
        
    },
    


    // OBJETO QUE AFETA DIRETAMEMENTE O HTML ==============================
    innerHTMLTransaction(transaction,index) {
        const CSSclass =  transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)  //altera o valor da transaction - ele recebe o Utils.formatCurrency 
        
        const html = `
     
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img onclick=Transaction.remove(${index}) src="./assets/assets/minus.svg" alt="Remover Transação"> 
            </td>
 
       `

       return html
    }, 



    //Atualiza os valores de transaçoes dos cards =============================
    updateBalance(){
        document.getElementById('incomesDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions(){
       DOM.transactionsContainer.innerHTML = ""
    }
}

//converte os valores 
const Utils = {
    formatAmount(value){
        value = Number(value.replace(/\,\./g, "")) * 100
        
        return value
    },

    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

       return signal + value
    }
}

const Form = {

    //ESTRUTURA PARA VERIFICAR SE OS DADOS FORAM PREECHIDOS =========================================

    // PEGA OS ELEMENTOS HTML    
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    // VAI PEGAR OS VALORES INPUTADOS
    getValues(){
        return{
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },        

     // verificar se todos os dados foram preenchidos 
    validateFields(){
        const {description , amount , date} = Form.getValues()

        if( description.trim() === "" || description.amount === "" || description.date === "" ){
            throw new Error ("Por favor , preencha todos os campos")
        }
    },

   

    // ESTRUTURA QUE FORMATA OS DADOS DO SUBMIT ===========================================================

    formatValues(value){
        let {description , amount , date} = Form.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)


        return{
            description,
            amount, 
            date
        }      

    },

    // ESTRUTURA QUE SALVA OS DADOS DO SUBMIT ===========================================================
    
    saveTransaction(transaction){
        Transaction.add(transaction)
    },

    // LIMPA OS DADOS 

    clearFields(){ 
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    // ==================================================================================================



    // OBJETO CHAMADA NO MOMENTO QUE É FEITO O INPUT - ONSUBMIT - 
    submit(event){
        event.preventDefault()

        // verificação de erros o try faz a chamada caso tenha um erro o cath e chamaado e faz o alerta da mensagem
        try{            
            Form.validateFields()//VALIDA OS DADOS             
            const transaction = Form.formatValues()//FORMATA OS DADOS,  
            Form.saveTransaction(transaction) // adicionar os dados da transacao 
            Form.clearFields() // limpa o formulariol
            Modal.close() // fecha o modal 
             
        }catch(error){
            alert(error.message)
        }


        
        
    }
   


}

const App = {
    init(){

        Transaction.all.forEach((transaction,index) => {
            DOM.addTransaction(transaction,index)
        })


        DOM.updateBalance()
    },

    reload(){
        DOM.clearTransactions()
        App.init()
    },
}



// CHAMADAS DE OBJETOS ======================================

App.init()

Transaction.remove(0)



