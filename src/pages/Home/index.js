import React, { useState } from 'react'
import axios from 'axios'
import * as S from './styled'
import { useHistory } from 'react-router-dom'

function App(props) {
    // useState define um estado e retorna um array com uma função [usuario, setUsuario]

    const history = useHistory()
    const [usuario, setUsuario] = useState('')
    const [erro, setErro] = useState(false)

    function handlePesquisa() {
        axios.get(`https://api.github.com/users/${usuario}/repos`)
            .then(response => {
                const repositories = response.data;
                const repositoriesName = [];

                repositories.map((repository) => {
                    repositoriesName.push(repository.name)
                })

                localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
                setErro(false)
                history.push('/repositories')
            })
            .catch(err => {
                setErro(true)
            });
    }

    return (
        <S.HomeContainer>
            <S.Content>
                <S.Input className="usuarioInput" placeholder="Usuário" value={usuario} onChange={e => setUsuario(e.target.value)} />
                <S.Button type="submit" onClick={handlePesquisa}>Pesquisar</S.Button>
            </S.Content>
            {erro ? <S.ErrorMsg>Ocorreu um erro, tente novamente</S.ErrorMsg> : ''}
        </S.HomeContainer>
    );
}

export default App;