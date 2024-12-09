document.getElementById("gerar-bilhete").addEventListener("click", function () {
    const numeros = new Set();
    while (numeros.size < 6) {
        const num = Math.floor(Math.random() * 60) + 1;
        numeros.add(num);
    }
    const bilhete = Array.from(numeros)
        .sort((a, b) => a - b)
        .map(num => num.toString().padStart(2, '0'))
        .join(" ");
    document.getElementById("bilhete").innerText = bilhete;
});
