// --- ANIMAÇÃO DE SCROLL (REVELAR CARDS) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-animate').forEach(card => {
    observer.observe(card);
});

// --- CONTADORES ANIMADOS ---
function runCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const isNegative = target < 0;
        const absoluteTarget = Math.abs(target);
        let current = 0;
        const speed = absoluteTarget / 30; // Ajusta velocidade da animação

        const updateCount = () => {
            if (current < absoluteTarget) {
                current += Math.ceil(speed);
                if (current > absoluteTarget) current = absoluteTarget;
                
                // Recria o sinal de + ou - dinamicamente
                counter.innerText = (isNegative ? '-' : '+') + current + '%';
                setTimeout(updateCount, 25);
            } else {
                counter.innerText = (isNegative ? '-' : '+') + absoluteTarget + '%';
            }
        };
        updateCount();
    });
}

// Executa o contador assim que a página carrega
window.addEventListener('DOMContentLoaded', runCounters);

// --- ALTERNADOR DE DADOS (TOGGLE) ---
const dataSets = {
    sustentavel: {
        metrics: [
            { target: 35, text: "+35%" },
            { target: -22, text: "-22%" },
            { target: 45, text: "+45%" }
        ],
        labels: ["Economia de Água", "Emissão de CO₂", "Uso de Bioinsumos"]
    },
    antigo: {
        metrics: [
            { target: -18, text: "-18%" },
            { target: 40, text: "+40%" },
            { target: -30, text: "-30%" }
        ],
        labels: ["Desperdício hídrico", "Poluição Atmosférica", "Degradação do Solo"]
    }
};

function switchData(type) {
    // Atualiza botões ativos
    document.getElementById('btn-sustentavel').classList.toggle('active', type === 'sustentavel');
    document.getElementById('btn-antigo').classList.toggle('active', type === 'antigo');

    // Atualiza textos e alvos numéricos
    const selectedData = dataSets[type];
    for (let i = 1; i <= 3; i++) {
        const counterElement = document.getElementById(`count-${i}`);
        const labelElement = document.getElementById(`label-${i}`);
        
        labelElement.innerText = selectedData.labels[i-1];
        counterElement.setAttribute('data-target', selectedData.metrics[i-1].target);
    }

    // Reinicia a animação dos números com os novos dados
    runCounters();
}
