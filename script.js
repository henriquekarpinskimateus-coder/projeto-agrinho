// Seleção dos elementos da página
const slider = document.getElementById('produtividade');
const valProd = document.getElementById('val-prod');
const ctx = document.getElementById('graficoEquilibrio').getContext('2d');

// Função para calcular o impacto ambiental simulado
// No agro sustentável, mais tecnologia/eficiência ajuda a mitigar o impacto negativo
function calcularImpacto(valorProdutividade) {
    return Math.max(15, 110 - valorProdutividade); 
}

// Inicialização do Gráfico do Chart.js
const grafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Produção Agrícola (%)', 'Impacto Ambiental (%)'],
        datasets: [{
            label: 'Índices do Ecossistema',
            data: [slider.value, calcularImpacto(slider.value)],
            backgroundColor: [
                '#2d6a4f', // Verde para produção
                '#d90429'  // Vermelho/Laranja para impacto
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        },
        plugins: {
            legend: {
                display: false // Esconde a legenda padrão para ficar mais limpo
            }
        }
    }
});

// Evento que escuta quando o usuário mexe no slider
slider.addEventListener('input', (e) => {
    const valor = parseInt(e.target.value);
    
    // Atualiza o texto do valor na tela
    valProd.textContent = valor;
    
    // Calcula o novo impacto ambiental baseado no slider
    const novoImpacto = calcularImpacto(valor);
    
    // Atualiza os dados do gráfico e redesenha na tela
    grafico.data.datasets[0].data = [valor, novoImpacto];
    grafico.update();
});