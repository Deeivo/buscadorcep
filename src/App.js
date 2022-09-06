import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './styles.css'
import api  from './services/api'


function App() {
  const [input, setInput] = useState('') 
  const [cep, setCep] = useState('') 

  const searchCep = async () => {
    if(input === "") {
      alert('Escreva um CEP')
      return
    } 

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')

    } catch {
        alert('Erro ao buscar cep')
        setInput('')
    }
  }

  

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="container-input">
        <input 
          type="text"
          placeholder="digite seu CEP"
          value={input}
          onChange={e => setInput(e.target.value)}
        />

        <button className="search-btt" onClick={searchCep}>
          <FiSearch size={25} color="#AAAAAA" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemneto: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
