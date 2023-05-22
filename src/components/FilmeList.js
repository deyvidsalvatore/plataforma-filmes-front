import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilmeList = () => {
  const [filmes, setFilmes] = useState([]);
  const [linkAssistir, setLinkAssistir] = useState(null);

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/filmes'); // Altere a URL da requisição de acordo com o endpoint do seu backend
        setFilmes(response.data);
      } catch (error) {
        console.error('Erro ao obter os filmes:', error);
      }
    };

    fetchFilmes();
  }, []);

  const abrirLinkAssistir = (urlGoogleDrive) => {
    setLinkAssistir(urlGoogleDrive);
  };

  const fecharLinkAssistir = () => {
    setLinkAssistir(null);
  };

  return (
    <div>
      <h2>Lista de Filmes</h2>
      {filmes.length === 0 ? (
        <p>Nenhum filme encontrado.</p>
      ) : (
        <ul className="filme-list">
          {filmes.map((filme) => (
            <li key={filme.id} className="filme-item">
              <div className="capa-container">
                <img src={filme.imagemCapa} alt={filme.titulo} className="capa" />
              </div>
              <div className="filme-info">
                <h3 className="titulo">{filme.titulo}</h3>
                <p className="descricao">{filme.descricao}</p>
                <button onClick={() => abrirLinkAssistir(filme.urlGoogleDrive)} className="assistir-link">Assistir</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {linkAssistir && (
        <div className="modal">
          <div className="modal-content">
            <iframe src={linkAssistir} title="Assistir Filme" className="iframe-assistir" />
            <button onClick={fecharLinkAssistir} className="fechar-link-assistir">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmeList;
