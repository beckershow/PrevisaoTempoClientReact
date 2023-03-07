import { Container, TableDatalhamento } from "../../style";

import { useEffect, useState } from "react";

function Home() {

  
  const [cidade, setCidade]         = useState('Blumenau');
  const [pais_sigla, setPais_sigla] = useState('BR');
  const [previsoes, setPrevisoes]   = useState([]);
  const [historico, setHistorico]   = useState([]);

  //Para iniciar executando a pesquisa
  // useEffect(()=>{
  
  //   fetch(`http://192.168.1.52:7777/getprevisaotempo/{cidade, pais}?cidade=${cidade}&pais=${pais_sigla}`)
  //   .then(response => response.json() )
  //   .then( data => {    
      
  //     console.log(data);
  //     setPrevisoes(data.resultados);
  //     // setPrevisoes(data);
  //   });
  // }, []);  

  function pesquisar(){
    fetch(`http://192.168.1.52:7777/getprevisaotempo/{cidade, pais}?cidade=${cidade}&pais=${pais_sigla}`)
    .then(response => response.json() )
    .then( data => {
      console.log(data);
      setPrevisoes(data.resultados);
      if ( historico.length === 0 )
      {
        atualizar();
      }
    });  
  }

  function atualizar(){

    fetch(`http://192.168.1.52:7777/gethistoricopesquisa`)
    .then(response => response.json() )
    .then( data => {
      console.log(data);
      setHistorico(data.items);
    });
  }

  function showDetalhar(id, ev){
    if ( document.getElementById(id).style.display === 'block' )
    {
      document.getElementById(id).style.display = 'none';
    }
    else
    {
      document.getElementById(id).style.display = 'block';
    }
  }

  return (
    <Container>
      <h1>Consultar Previsão do Tempo</h1>      

      <table>
        <tr>
          <td>
            <Container>
              <ul>
                <li>
                  <label>Nome Cidade</label>
                  <input type='text' id='cidade' name='cidade' value={cidade} onChange={e => setCidade(e.target.value)}></input>
                </li>
                <li>
                  <label>Sigla Pais</label>
                  <input type='text' id='pais_sigla' name='pais_sigla' value={pais_sigla} onChange={e =>setPais_sigla(e.target.value)}></input>
                </li>
                <li>
                  <button type="button" onClick={pesquisar}>Pesquisar</button>
                </li>
              </ul>
            </Container>

            <table>
              <tr>
                <th>Data Previsão</th>
                <th>Temp </th>
                <th>Min</th>
                <th>Max</th>
                <th>Descrição</th>
                <th>Detalhar</th>
              </tr>
              {previsoes.map(previsao => {
                return (    
                  <tbody>
                    <tr>
                      <td>{previsao.data_horaprevisao}</td>
                      <td>{previsao.temp}</td>
                      <td>{previsao.temp_min}</td>
                      <td>{previsao.temp_max} </td>
                      <td>{previsao.weather_desc}</td>
                      <td><button onClick={(e) => showDetalhar(previsao.id, e)}>Detalhar</button></td>
                      {/* <td><button onClick={showDetalhar}>Detalhar</button></td> */}
                    </tr>
                    <tr>
                      {/* <td colspan="5"><b>Detalhamento: </b>Pressão: {previsao.pressure}, Humidade:{previsao.humidity},  Vel. vento:{previsao.wind_speed}</td> */}
                      <td colspan="6">

                        <TableDatalhamento id={previsao.id}>
                          <thead>
                            <th>Pressão</th>
                            <th>Humidade</th>
                            <th>Vel. vento</th>
                          </thead>
                          <tbody>
                            <td>{previsao.pressure}</td>
                            <td>{previsao.humidity}</td>
                            <td>{previsao.wind_speed}</td>
                          </tbody>
                        </TableDatalhamento>
                      </td>
                    </tr>
                  </tbody>          
                )
                })
              }             
            </table>
          </td>
        
          <td>
            <h2>Histório de Consultas</h2>

            <table>
              <tr>          
                <th>Data Consulta</th>
                <th>Cidade</th>
                <th>Pais</th>
                <th>Data Previsão</th>
                <th>Temperaturas</th>
                <th>Descrição</th>
              </tr>

              {historico.map(consulta => {
              return (
                <tr>          
                  <td>{consulta.data_horapesquisa}</td>
                  <td>{consulta.cidade}</td>
                  <td>{consulta.pais}</td>
                  <td>{consulta.data_horaprevisao}</td>
                  <td>{consulta.temp}</td>
                  <td>{consulta.weather_desc}</td>
                </tr>
                )
              })}

            </table>
            <button type="button" onClick={atualizar}>Atualizar</button>

          </td>
        </tr>        
      </table>    

    </Container>
  );
}

export default Home;