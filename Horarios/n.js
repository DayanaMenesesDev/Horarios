
console.log("Mes actual:", mes);
console.log("Mes actual:", dias);



let generarDias = () => {
    const dias = parseInt(mes_dias.value);
    container_table.innerHTML = `
        <table id="table">
        <caption>${mes_nombre.value}</caption>
        <thead>
            <tr id="col">
                <th>Nombre</th>
            </tr>
        </thead>
        <tbody id="tbody">
        </tbody>
        </table>
    `


    const col = document.getElementById('col')
    for (let i = 1; i <= dias; i++) {
        const th = document.createElement('th')
        th.innerHTML += `${i}`
        th.setAttribute('id',i)
        col.appendChild(th)
    }

}

let generarSoporte = () => {
    const tbody = document.getElementById('tbody')
    const cantidad = parseInt(mes_cantSop.value);
    const soporte = []
    for (let i = 0; i < cantidad; i++) {
        const tr = document.createElement('tr')
        tr.setAttribute('id', `trSop${i}`)
        tr.innerHTML += `
            <th id="thSop${i}">Sop${i}</th>`
        tbody.appendChild(tr)
        let sop = {
            id: `S${i}`,
            nombre: '',
            estudio: 'YAHO'
        }
        soporte.push(sop)
    }
    let agregarNombres = confirm('agregar nombres a soporte?')

    if (agregarNombres) {
        console.log(soporte);
        
        for (let i = 0; i < soporte.length; i++) {
            let nombre = prompt(`Nombre se soporte ${i + 1}`)
            soporte[i].nombre = nombre;
            let trNombre = document.getElementById(`thSop${i}`)
            trNombre.textContent = soporte[i].nombre = nombre;
        }
    }

}

let generarTurnos = () => {
    const turnos = [
        {
            id: '1',
            nombre: 'AP',
            horaInicio: '6:45',
            horaFin: '14:45',
            horas: 8
        },
        {
            id: '2',
            nombre: 'AB',
            horaInicio: '1:45',
            horaFin: '21:45',
            horas: 8
        },
        {
            id: '3',
            nombre: 'CJ',
            horaInicio: '21:45',
            horaFin: '6:45',
            horas: 8
        }
    ]
    const turnosEspeciales = [{
        id: '4',
        nombre: 'RD',
        horaInicio: 'Descanso Remunerado',
        horaFin: 'Descanso Remunerado',
        horas: 8
    },
    {
        id: '5',
        nombre: 'AS',
        horaInicio: '6:45',
        horaFin: '18:45',
        horas: 8
    },
    {
        id: '6',
        nombre: 'AT',
        horaInicio: '18:45',
        horaFin: '6:45',
        horas: 8
    }]
    let xD = "";
    let aleatoriomaxTurno = () => {return Math.floor(Math.random() * (8 - 3 + 1)) + 3};
    let aleatorioTipoTurno = () => {return Math.floor(Math.random() * (3))};
    console.log("aleatorio: " + aleatoriomaxTurno());
    console.log("aleatorio: " + aleatorioTipoTurno());
    
    
    /* --------- ¡¡REGLAS!! ---------
        1. No se repetirá mas de 8 veces                OK

        2. Los turnos sean seguidos                     OK
        
        3. Tener 4 0 5 descansos al mes
        
        4. Si ya tuvo un turno que no se 
           repita despues del descanso
        
        5. Deben estar los 4 turnos minimo
        en cada dia
    
        6. Todos deben tener turnos                     OK
    */
        let s1 = []
        const cantidadSop = parseInt(mes_cantSop.value);
        const cantidadDias = parseInt(mes_dias.value);
        for (let i = 0; i < cantidadSop; i++) {
            console.log("cantidad: " + cantidadDias);
            console.log("cantidad: " + cantidadSop);
            
            let tipoTurno = aleatorioTipoTurno()
            let sop = document.getElementById(`trSop${i}`)
            console.log(sop);
            let sopAnterior = document.getElementById(`trSop${i - 1}`)
            let turnoActual = `<td>${turnos[tipoTurno].nombre}</td>`
            for (let i = 0; i < aleatoriomaxTurno(); i++) {
                xD += ` + ${turnos[tipoTurno].nombre}`
                console.log(xD);
                sop.innerHTML += `<td>${turnos[tipoTurno].nombre}</td>`
            }  
            sop.innerHTML += `<td>${turnosEspeciales[0].nombre}</td>`
        }

/* generador de turnos seguidos
    for (let i = 0; i < aleatoriomaxTurno; i++) {
        xD += ` + ${turnos[aleatorioTipoTurno].nombre}`
        console.log(xD);


    }  */



}

send.addEventListener('click', (e)=> {
    e.preventDefault()
    generarDias();
    generarSoporte();
    generarTurnos();
})






