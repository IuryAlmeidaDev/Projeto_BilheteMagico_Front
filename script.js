document.getElementById("gerar-bilhete").addEventListener("click", function () {
    const numeros = new Set();
    while (numeros.size < 6) {
        const num = Math.floor(Math.random() * 60) + 1;
        numeros.add(num);
    }
    const bilhete = Array.from(numeros)
        .sort((a, b) => a - b)
        .map(num => num.toString().padStart(2, '0')); // Adiciona zero à esquerda

    const bilheteDiv = document.getElementById("bilhete");
    bilheteDiv.innerHTML = ""; // Limpa os números anteriores

    bilhete.forEach(num => {
        const span = document.createElement("span");
        span.textContent = num;
        bilheteDiv.appendChild(span);
    });
});
