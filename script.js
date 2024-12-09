document.getElementById('gerar').addEventListener('click', function () {
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const bilhete = gerarBilhete(quantidade);

    const bilheteContainer = document.querySelector('.bilhete');
    bilheteContainer.innerHTML = '';
    bilhete.forEach(num => {
        const span = document.createElement('span');
        span.textContent = num;
        bilheteContainer.appendChild(span);
    });

    const historicoContainer = document.getElementById('historico');
    const historicoItem = document.createElement('div');
    historicoItem.classList.add('historico-bilhete');
    historicoItem.textContent = bilhete.join(' - ');
    historicoContainer.appendChild(historicoItem);
});

function gerarBilhete(quantidade) {
    const numeros = [];
    while (numeros.length < quantidade) {
        const num = (Math.floor(Math.random() * 60) + 1).toString().padStart(2, '0');
        if (!numeros.includes(num)) {
            numeros.push(num);
        }
    }
    return numeros;
}

document.getElementById('limparHistorico').addEventListener('click', function () {
    document.getElementById('historico').innerHTML = '';
});
