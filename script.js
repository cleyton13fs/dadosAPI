async function fetchDataParallel() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    const resultsContainer = document.getElementById('results');
    const loadingIndicator = document.getElementById('loading');
    const fetchButton = document.getElementById('fetchButton');

    try {
        loadingIndicator.style.display = 'block'
        fetchButton.disabled = true;

        resultsContainer.innerHTML = '';

        const requests = [
            fetch(`${apiUrl}/1`),
            fetch(`${apiUrl}/2`),
            fetch(`${apiUrl}/3`)
        ];

        const responses = await Promise.all(requests);

        const jsonData = await Promise.all(responses.map(response => response.json()));

        jsonData.forEach((data, index) => {
            const card = document.createElement('div')
            card.className = 'card';
            card.innerHTML = `
                <h2>Resultado da requisição ${index + 1}</h2>
                <p><strong>Título:</strong> ${data.title}</p>
                <p><strong>Corpo:</strong> ${data.body}</p>
            `;

            resultsContainer.appendChild(card);

            gsap.fromTo(card,
                { opacity: 0, y:20},
                { opacity: 1, y:0, duration: 0.5, delay: index * 0.2 }
            );
        });
    } catch (error) {
        console.error('Ocorreu um erro:', error.message);
        resultsContainer.innerHTML = `<p>Erro ao buscar dados: ${error.message}</p>`
    } finally {
        loadingIndicator.style.display = 'none';
        fetchButton.disabled = false;
    }
}
document.getElementById('fetchButton').addEventListener('click', fetchDataParallel);