
/*
  Crie um App para cadastrar o período, disciplina, professor(a) e carga horária. 
  Para os campos período e professor(a) deve criar uma combo box (caixa de combinação) para o usuário escolher as opções. 
  Os dados devem ser listados em formato de tabela na parte inferior do formulário e com a opção de excluir. 
  Salve as informações no localstorage.

  Rodrigo Franco Bruno 13-09-2021 - LPW II - Professor: Luiz
*/

import React, {useState, useEffect} from "react"
import "./styles.css"

function Home() {
  // ATRIBUTOS //
  const [simestre, setSemester] = useState("")
  const [disciplina, setSubject] = useState("")
  const [professor, setTeacher] = useState("")
  const [cargaHoraria, setWorkload] = useState("")
  const [students, setStudents] = useState([])

  // METODOS //
  function handleStudent(event) {
    event.preventDefault()
    const data = {
      id: new Date().getTime(),
      simestre,
      disciplina,
      professor,
      cargaHoraria
    }
    setStudents([...students, data])
    setSemester("")
    setSubject("")
    setTeacher("")
    setWorkload("")
  }

  function handleDelete(id) {
    setStudents(students.filter((student) => student.id !== id));
  }

  useEffect(() => {
    function loadData() {
      const storageStudents = localStorage.getItem("@cadcurso:cursos");
      if (storageStudents) {
        setStudents(JSON.parse(storageStudents));
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    function saveData() {
      localStorage.setItem("@cadcurso:cursos", JSON.stringify(students));
    }
    saveData();
  }, [students]);

  return (

    <div className="page">
      <form className="cadastro" onSubmit={handleStudent}>

        <label for="semester">Período</label>
        <select 
          id="semester" 
          name="semester"
          className="border"
          value={simestre} 
          onChange={(event) => setSemester(event.target.value)}>
          <option disabled selected>  </option>
          <option value="1º">Período 1</option>
          <option value="2º">Período 2</option>
          <option value="3º">Período 3</option>
          <option value="4º">Período 4</option>
          <option value="5º">Período 5</option>
          <option value="6º">Período 6</option>
          <option value="7º">Período 7</option>
          <option value="8º">Período 8</option>
        </select>
        
        <label>Disciplina</label>
        <input id="subject"
          type="text" 
          name="subject"  
          className="border"
          placeholder="Digite a disciplina" 
          value={disciplina} 
          onChange={(event) => setSubject(event.target.value)}
        />
      
        <label for="teacher">Professor</label>
        <select 
          id="teacher" 
          name="teacher" 
          className="border"
          value={professor} 
          onChange={(event) => setTeacher(event.target.value)} >
          <option selected disabled>  </option>
          <option value="Luiz">Luiz</option>
          <option value="Débora">Débora</option>
          <option value="Osni">Osni</option>
          <option value="Salete">Salete</option>
          <option value="Carlos">Carlos</option>
        </select>

        <label for="workload">Carga Horária</label>
        <input 
          id="workload" 
          type="text" 
          name="workload" 
          className="border"
          placeholder="Digite a carga horaria" 
          value={cargaHoraria} 
          onChange={(event) => setWorkload(event.target.value)} 
        />

        <div className="page">
          <button  onClick={handleStudent}>Enviar</button>
        </div>

      </form>

      <h1 className="TituloTabela"> Tabela </h1>
      <table>
        
        <thead>
          <tr>
            <th>Período</th>
            <th>Disciplina</th>
            <th>Professor(a)</th>
            <th>Carga Horária</th>
            <th colSpan={1}>Ações</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.simestre}</td>
              <td>{student.disciplina}</td>
              <td>{student.professor}</td>
              <td>{student.cargaHoraria}</td>
              <td>
                <button
                  className="Excluir"
                  onClick={() => handleDelete(student.id)}
                >Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export { Home };
