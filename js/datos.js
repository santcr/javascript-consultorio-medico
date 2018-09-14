var pacientes = [
    {
    nombre: "Aquiles",
    apellido: "Brinco",
    numero: 31843782,
    clave: "123",
    foto: "Aquiles Brinco.jpg",
    habilitado: true,
    pesoActual: 70,
    pesoMax: 89,
    pesoMin: 53,
    altura: 175,
    imcAnterior: 20,
    imcActual: 19
    },{
    nombre: "Armando",
    apellido: "Casas Paredes",
    numero: 35546958,
    clave: "123",
    foto: "Armando Casas Paredes.jpg",
    habilitado: false,
    pesoActual: 75,
    pesoMax: 83,
    pesoMin: 62,
    altura: 170,
    imcAnterior: 25,
    imcActual: 26
    },{
    nombre: "Zacarias",
    apellido: " del Campo García",
    numero: 19949025,
    clave: "123",
    foto: "Zacarias Flores del Campo.jpg",
    habilitado: true,
    pesoActual: 81,
    pesoMax: 102,
    pesoMin: 78,
    altura: 182,
    imcAnterior: 30,
    imcActual: 32
    },{
    nombre: "Alan",
    apellido: "Brito Delgado",
    numero: 36880511,
    clave: "123",
    foto: "Alan Brito Delgado.jpg",
    habilitado: true,
    pesoActual: 89,
    pesoMax: 94,
    pesoMin: 81,
    altura: 173,
    imcAnterior: 34,
    imcActual: 30
    },{
    nombre: "Elmer",
    apellido: "Curio",
    numero: 34573396,
    clave: "123",
    foto: "Elmer Curio.jpg",
    habilitado: true,
    pesoActual: 75,
    pesoMax: 77,
    pesoMin: 63,
    altura: 174,
    imcAnterior: 25,
    imcActual: 23
    },{
    nombre: "Achero",
    apellido: "Galvan Izado",
    numero: 39048609,
    clave: "123",
    foto: "Achero Galvan Izado.jpg",
    habilitado: true,
    pesoActual: 81,
    pesoMax: 93,
    pesoMin: 69,
    altura: 182,
    imcAnterior: 29,
    imcActual: 32
    },{
    nombre: "Clara",
    apellido: "Luz de Luna",
    numero: 40383543,
    clave: "123",
    foto: "Clara Luz de Luna.jpg",
    habilitado: true,
    pesoActual: 70,
    pesoMax: 89,
    pesoMin: 53,
    altura: 175,
    imcAnterior: 20,
    imcActual: 19
    },{
    nombre: "Francisco",
    apellido: "Lorin Colorado",
    numero: 31450343,
    clave: "123",
    foto: "Francisco Lorin Colorado.jpg",
    habilitado: true,
    pesoActual: 79,
    pesoMax: 89,
    pesoMin: 68,
    altura: 169,
    imcAnterior: 32,
    imcActual: 34
    },{
    nombre: "Lara",
    apellido: "Conesa Cara",
    numero: 20178001,
    clave: "123",
    foto: "Lara Conesa Cara.jpg",
    habilitado: true,
    pesoActual: 71,
    pesoMax: 82,
    pesoMin: 56,
    altura: 177,
    imcAnterior: 24,
    imcActual: 28
    },{
    nombre: "Pedro",
    apellido: "Medario Camello",
    numero: 34765351,
    clave: "123",
    foto: "Pedro Medario Camello.jpg",
    habilitado: true,
    pesoActual: 73,
    pesoMax: 78,
    pesoMin: 71,
    altura: 179,
    imcAnterior: 31,
    imcActual: 29
    }
];

var medicos = [
    {
    nombre: "Dr. Enrique",
    apellido: "Cido Concalcio",
    numeroProfesional: 4356,
    clave: "123",
    consultasFinalizadas: 27,
    especialidad: "Traumatología"
    },{
    nombre: "Dra. Placida",
    apellido: "Concepción de Niño",
    numeroProfesional: 4357,
    clave: "123",
    consultasFinalizadas: 33,
    especialidad: "Pediatría"
    },{
    nombre: "Dra. Rosa",
    apellido: "Espinosa Flores",
    numeroProfesional: 4358,
    clave: "123",
    consultasFinalizadas: 17,
    especialidad: "Pediatría"
    },{
    nombre: "Dr. Víctor",
    apellido: "Tazo Tremendo",
    numeroProfesional: 4359,
    clave: "123",
    consultasFinalizadas: 28,
    especialidad: "Traumatología"
    },{
    nombre: "Dra. Susana",
    apellido: "Oria Pereira",
    numeroProfesional: 4360,
    clave: "123",
    consultasFinalizadas: 28,
    especialidad: "Gastroenterología"
    },{
    nombre: "Dr. Takurado",
    apellido: "Yamimo",
    numeroProfesional: 4361,
    clave: "123",
    consultasFinalizadas: 44,
    especialidad: "Emergencias"
    },{
    nombre: "Dr. Pedro",
    apellido: "Gadicto Coca",
    numeroProfesional: 4362,
    clave: "123",
    consultasFinalizadas: 39,
    especialidad: "Toxicología"
    },{
    nombre: "Dra. Serafina",
    apellido: "Joya de Plata",
    numeroProfesional: 4363,
    clave: "123",
    consultasFinalizadas: 21,
    especialidad: "Medicina General"
    },{
    nombre: "Dra. Sol",
    apellido: "Dávalos Hierros",
    numeroProfesional: 4364,
    clave: "123",
    consultasFinalizadas: 19,
    especialidad: "Traumatología"
    },{
    nombre: "Dr. Tomás",
    apellido: "Cando Hierba",
    numeroProfesional: 4365,
    clave: "123",
    consultasFinalizadas: 43,
    especialidad: "Toxicología"
    }
    
];

var consultas = [
    {
    numeroConsulta: "SJOY5593",
    numeroPaciente: 31843782,
    numeroMedico: 4363,
    finalizada: true,
    paga: true,
    descripcion: "El paciente goza de perfecta salud por lo que puede realizar cualquier tipo de trabajo mental o físico que le sea requerido."
    },{
    numeroConsulta: "SDÁV5594",
    numeroPaciente: 31843782,
    numeroMedico: 4364,
    finalizada: false,
    paga: false,
    descripcion: ""
    },{
    numeroConsulta: "SDÁV5595",
    numeroPaciente: 31843782,
    numeroMedico: 4364,
    finalizada: true,
    paga: true,
    descripcion: "Se observan fracturas en las costillas primera, segunda, tercera, cuarta, quinta y sexta, a la altura de los ángulos costales de las costillas sexta, quinta y cuarta"
    },{
    numeroConsulta: "ECID5596",
    numeroPaciente: 39048609,
    numeroMedico: 4356,
    finalizada: false,
    paga: false,
    descripcion: ""
    },{
    numeroConsulta: "ECID5597",
    numeroPaciente: 34765351,
    numeroMedico: 4356,
    finalizada: false,
    paga: true,
    descripcion: ""
    },{
    numeroConsulta: "SDÁV5598",
    numeroPaciente: 36880511,
    numeroMedico: 4364,
    finalizada: true,
    paga: false,
    descripcion: "En las radiografías no se aprecia ninguna fractura en el cráneo. Se aprecian fracturas en  la clavícula derecha en la región del extremo acromial y el tubérculo conoideo."
    },{
    numeroConsulta: "TYAM5599",
    numeroPaciente: 35546958,
    numeroMedico: 4361,
    finalizada: true,
    paga: true,
    descripcion: "Plesenta un cuadlo de gastloentelitis sevela pol lo cual debelá de gualdar leposo absoluto dulante las plóximas 72 holas."
    },{
    numeroConsulta: "PCON5600",
    numeroPaciente: 40383543,
    numeroMedico: 4357,
    finalizada: false,
    paga: false,
    descripcion: ""
    },{
    numeroConsulta: "PGAD5601",
    numeroPaciente: 34573396,
    numeroMedico: 4362,
    finalizada: false,
    paga: false,
    descripcion: ""
    },{
    numeroConsulta: "PGAD5602",
    numeroPaciente: 31450343,
    numeroMedico: 4362,
    finalizada: false,
    paga: false,
    descripcion: ""
    }
];