document.addEventListener('DOMContentLoaded',function(){  //programa vai rodar apos o carregamento de todos os outros arquivos!
    document.getElementById('form-sorteador').addEventListener('submit',function(evento){ 
        evento.preventDefault();
        let numeroMaximo = document.getElementById('numero-maximo').value;
        numeroMaximo= parseInt(numeroMaximo); 

        let numeroAleatorio = Math.random() * numeroMaximo;
        numeroAleatorio = Math.floor(numeroAleatorio + 1); //+1 para que o resultado nunca seja 0 sendo que o número minimo é 2

        document.getElementById('resultado-valor').innerText = numeroAleatorio; 
        document.querySelector('.resultado').style.display='block';

        

    })
})