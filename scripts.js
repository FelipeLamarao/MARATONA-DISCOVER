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

const transaction = [
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
        amount: -20000,
        date: '23/01/2021'        
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


const DOM = {
    innerHTMLTransaction()  {
        const html = `
        <tr>
            <td class="description">Aluguel</td>
            <td class="expense">- R$ 1.500,00</td>
            <td class="date">26/01/2021</td>
         </tr>      
        
        `
    }
}