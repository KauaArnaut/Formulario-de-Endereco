document.getElementById('cep').addEventListener('blur', buscarEndereco);
document.getElementById('cep').addEventListener('input', function(event) {
    if (event.target.value.length === 8) {
        buscarEndereco();
    }
});

function buscarEndereco() {
    const cep = document.getElementById('cep').value;

    if (cep.length === 8 && /^[0-9]+$/.test(cep)) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('CEP inválido');
                }
                return response.json();
            })
            .then(data => {
                if (data.erro) {
                    throw new Error('CEP não encontrado');
                }

                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('uf').value = data.uf;
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
                alert('CEP inválido ou não encontrado.');
            });
    } else {
        alert('Por favor, insira um CEP válido.');
    }
}

document.getElementById('enderecoForm').addEventListener('submit', function(event) {
    const form = event.target;
    const inputs = form.querySelectorAll('input[required]');

    let allFilled = true;
    inputs.forEach(input => {
        if (!input.value) {
            allFilled = false;
        }
    });

    if (!allFilled) {
        event.preventDefault();
        alert('Por favor, preencha todos os campos.');
    }
});
