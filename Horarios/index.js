// elementos html
const tables = document.getElementById('tables')
const newStaff = document.getElementById('staffNew')
const newStudio = document.getElementById('studioNew')
const send = document.getElementById('sendNew')

let staff = JSON.parse(localStorage.getItem("staff")) || [];

const horarioConfig = {
    staff: [],
    shifts: ['AP', 'AB', 'CJ'],
    daysWorking: [0, 1, 2, 3, 4, 5, 6],
    maxDescansos: 4,
    mindays: 3,
    maxdays: 8,
    studios: ['YAHO', 'SARA', 'ALOHA', 'DALI 1', 'DALI 2']
}

let getMonthAndDays = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth(); 
    const nameMonth = date.toLocaleString('es-ES', {month: "long"}) 
    const daysMonth = new Date(year, month + 1, 0).getDate(); 
    
    // Generar la lista de días
    const days = [];
    for (let i = 1; i <= daysMonth; i++) { days.push(i) }
    return [days, nameMonth]
}

let createTables = () => {

    for (let i = 0; i < horarioConfig.studios.length; i++) {
        tables.innerHTML += `
            <table id="${horarioConfig.studios[i]}">
                <caption>${getMonthAndDays()[1]}</caption>
                <thead id="thead-${horarioConfig.studios[i]}">
                    <tr class="columnTitle"><th>${horarioConfig.studios[i]}</th></tr>
                </thead>
                <tbody id="tbody-${horarioConfig.studios[i]}" class="bodyTable"></tbody>
            </table>`}
    const columnTitle = document.querySelectorAll('.columnTitle')
    columnTitle.forEach(col => { getMonthAndDays()[0].forEach(day => { col.innerHTML += `<th>${day}</th>`; }) })

}

let assingStaff = () => {
    // Muestra personal en todas las tablas
    staff.forEach(s => {
        let i = 0
        horarioConfig.studios.forEach(st => {
            if (s.studio == st) {
                const tr = document.createElement('tr')
                tr.setAttribute('id', `content-${s.name}`)
                tr.innerHTML = `<th id="${s.name}">${s.name}</th>`
                document.getElementById(`tbody-${horarioConfig.studios[i]}`).appendChild(tr)
            }
            i++
        });
    });
}
let assingShift = () => {

/* 
    1. Aparezcan los turnos
    2. No sea igual al anterior bloque d turno
    3. de 4 a 5 descansos por mes
    4. nose repita en las columnas
    5. llegue solo hasta el dia asignado
*/

    let shiftRandom = ()=> {
        let r2 = Math.floor(Math.random() * 3);
        return horarioConfig.shifts[r2]
    }
/* 
    let schedule = []

    staff.forEach(s => {
        let random = shiftRandom()
        let shifts = [];
        let randonNumberShift = Math.floor(Math.random() * (9 - 3)) + 3
        
       for (let i = 0; i < getMonthAndDays()[0].length; i++) {
        
        if (getMonthAndDays()[0].length > schedule.length) {
            console.log(`aun falta`);
            let rows = document.getElementById(`content-${s.name}`)
            for (let i = 0; i < randonNumberShift; i++) {
                rows.innerHTML += `<td>${random}</td>`
                console.log(randonNumberShift);
                shifts.push(random)
            }
            rows.innerHTML += `<td>RD</td>`
            shifts.push('RD')
            schedule.push({staff: s.name, schedule: shifts})
            
        } else {break}

       }
        
    });

    console.log(schedule[0].schedule);
     */
    let shifts = []
        
    staff.forEach(s => {
        let r = Math.floor(Math.random() * (11 - 3) + 3);
        let rows = document.getElementById(`content-${s.name}`)
        for (let i = 0; i < getMonthAndDays()[0].length; i++) {
            let random = shiftRandom()
            if (document.getElementById(`content-${s.name}`).children.length < getMonthAndDays()[0].length) {
            rows.innerHTML += `<td>${random}</td>`.repeat(r)
            rows.innerHTML += `<td style="color: red">RD</td>`
            }
        }
    
    })
}

createTables()
assingStaff()
assingShift()

send.addEventListener('click', (e) => {
    staff.push({
        name: newStaff.value,
        studio: newStudio.value,
        schedule: []
    });
    localStorage.setItem("staff", JSON.stringify(staff));
});

console.log(staff);





