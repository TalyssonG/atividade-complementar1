const express = require('express');
const app = express();
const port = 3000;

app.get('/calculadora', (req, res) => {
    const operacao = req.query.operacao;
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);

    //---------------- Verificação dos parâmetros obrigatórios
    if (!operacao || isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ error: 'Bad request. Please provide valid "operacao", "n1", and "n2" query parameters.' });
    }
    let resultado;

    //------------------- Realização da operação solicitada
    switch (operacao) {
        case 'soma':
            resultado = n1 + n2;
            break;
        case 'subtracao':
            resultado = n1 - n2;
            break;
        case 'multiplicacao':
            resultado = n1 * n2;
            break;
        case 'divisao':
            if (n2 === 0) {
                return res.status(400).json({ error: 'Bad request. Division by zero is not allowed.' });
            }
            resultado = n1 / n2;
            break;
        default:
            return res.status(400).json({ error: 'Bad request. Invalid "operacao" parameter. Use "soma", "subtracao", "multiplicacao", or "divisao".' });
    }

    // --------------------- Retorno do resultado da operação
    res.json({ resultado: resultado });
});

app.listen(port, () => {
    console.log(`Web Service running at http://localhost:${port}`);
});
