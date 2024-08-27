const express = require('express');
const app = express();
const port = 3000;

app.get('/calculadora', (req, res) => {
    const operacao = req.query.operacao;
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);

    // ------------ verificação
    if (!operacao || isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ error: 'Parâmetros inválidos.' });
    }

    // ------------ Funções para as operações - Objeto 
    const operacoes = {
        'soma': (a, b) => a + b,
        'subtracao': (a, b) => a - b,
        'multiplicacao': (a, b) => a * b,
        'divisao': (a, b) => b !== 0 ? a / b : null,
    };

    const operacaoFuncao = operacoes[operacao];
    if (!operacaoFuncao) {
        return res.status(400).json({ error: 'Operação inválida.' });
    }

    const resultado = operacaoFuncao(n1, n2);
    if (resultado === null) {
        return res.status(400).json({ error: 'Divisão por zero.' });
    }

    // Retorno do resultado
    res.json({ resultado });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
