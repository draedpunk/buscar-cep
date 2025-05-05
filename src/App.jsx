import { useState } from "react";
import "./App.css";

function App() {
  const [cep, setCep] = useState("");
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState("");

  const buscarCep = async () => {
    if (cep.length !== 8) {
      setErro("CEP deve conter exatamente 8 dígitos.");
      setDados(null);
      return;
    }

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const json = await resposta.json();

      if (json.erro) {
        setErro("CEP não encontrado.");
        setDados(null);
      } else {
        setErro("");
        setDados(json);
      }
    } catch (e) {
      setErro("Erro ao buscar o CEP.");
      setDados(null);
    }
  };

  return (
    <div className="Principal">
      <div className="App">
        <h1>Buscar CEP</h1>
        <input
          type="text"
          placeholder="Digite o CEP (ex: 01001000)"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
        <button onClick={buscarCep}>Buscar</button>

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        {dados && (
          <div className="resultado">
            <p><strong>Rua:</strong> {dados.logradouro}</p>
            <p><strong>Cidade:</strong> {dados.localidade}</p>
            <p><strong>Estado:</strong> {dados.uf}</p>
            <p><strong>País:</strong> Brasil</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
