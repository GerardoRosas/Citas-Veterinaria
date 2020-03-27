import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';


function App() {

  //Citas en localstorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = []
  }


  //Listado de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //useEffect para realizar operaciones cundo el state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
      if(citasIniciales){
        localStorage.setItem('citas', JSON.stringify(citas))
      }else{
        localStorage.setItem('citas', JSON.stringify([]))
      }
  }, [citas])

 
  //Funcion que tome las citas actuales y toma la nueva
  const crearCita = (cita) => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

   //Funcion que elimina una cita por su ID
    const eliminaCita = (id) => {
      const nuevoArreglo = citas.filter(cita => cita.id !== id);
      guardarCitas(nuevoArreglo);
  }
  
  //Mensaje Condicional
  var titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas' 


  return (
    <Fragment>
      <h1>Administrador de citas</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario 
                crearCita={crearCita}
              />
          </div>
          <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map(cita => (
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminaCita={eliminaCita}
                />
              ))}
          </div>
        </div> 
      </div>



    </Fragment>
  );
}

export default App;
