/* global pacientes, medicos, consultas */

var usuarioLogeado;
var consultaActual;
var pacienteEnConsulta;
var pacienteEncontrado;
$("#divLogin").fadeIn(700);

/////////////////////////////////////////// LOGIN PACIENTES /////////////////////////////////////////
$("#btnLogPacIngresar").click(loginPaciente);
function loginPaciente(){
    var usuarioLogin = Number($("#txtLogPacNumero").val());
    var _contrasenia = $("#txtLogPacContrasenia").val();
    var _puedeAcceder = false;
    for (var i = 0; i < pacientes.length; i++) {
        if (pacientes[i].numero === usuarioLogin && pacientes[i].clave === _contrasenia){
            _puedeAcceder = true;
            usuarioLogeado = pacientes[i];
            break;
        } 
    }
    if (_puedeAcceder) {
        $("#pLogPacError").html("");
        $("#divLogin").hide();
        $(".todos").hide();
        $(".paciente").show();
        $("#divDerecha").show();
        bienvenido();
        actualizarListaDerecha();
    } else {
        botonShake("#btnLogPacIngresar");
        $("#pLogPacError").html("<font color=\"red\">El número de usuario o la contraseña no son correctos");
    }
}

/////////////////////////////////////////// LOGIN MEDICO ////////////////////////////////////////////
$("#btnLogMedIngresar").click(loginMedico);
function loginMedico(){
    var usuarioLogin = Number($("#txtLogMedNumero").val());
    var _contrasenia = $("#txtLogMedContrasenia").val();
    var _puedeAcceder = false;
    for (var i = 0; i < pacientes.length; i++) {
        if (medicos[i].numeroProfesional === usuarioLogin && medicos[i].clave === _contrasenia){
            _puedeAcceder = true;
            usuarioLogeado = medicos[i];
            break;
        } 
    }
    if (_puedeAcceder) {
        $("#pLogMedError").html("");
        $("#divLogin").hide();
        $(".todos").hide();
        $(".medico").show();
        $("#divDerecha").show();
        bienvenido();
        actualizarListaDerecha();
    } else {
        botonShake("#btnLogMedIngresar");
        $("#pLogMedError").html("<font color=\"red\">El número de usuario o la contraseña no son correctos");
    }
}

//////////////////////////////////////////// BIENVENIDO /////////////////////////////////////////////
function bienvenido(){
    $("#pBienvenido").html("<h3>Bienvenido <b>" + usuarioLogeado.nombre + " " + usuarioLogeado.apellido + "</b></h3>");
    $("#divBienvenido").show( "slide", { direction: "down", easing: "easeOutElastic" }, 700 );
}

/////////////////////////////////////// MOSTRAR UNA SECCION /////////////////////////////////////////
function mostrarSeccion(_seccion){
    $(".seccion").hide();
    $(_seccion).show();
}

///////////////////////////////////// ACTUALIZAR LISTA DERECHA //////////////////////////////////////
function actualizarListaDerecha(){
    medicos.sort(criterio);
    var _paraHtml = "";
    _paraHtml += "<table><thead><tr><th>Especialidad</th><th>Nombre</th><th>Cant.</th></tr></thead>";
    _paraHtml += "<tbody>";
    for (var i = 0; i < medicos.length; i++) {
        _paraHtml += "<tr>";
        _paraHtml += "<td>" + medicos[i].especialidad + "</td>";
        _paraHtml += "<td>" + medicos[i].nombre + " " + medicos[i].apellido + "</td>";
        _paraHtml += "<td>" + medicos[i].consultasFinalizadas + "</td>";
        _paraHtml += "</tr>";
    }
    _paraHtml += "</tbody></table>";
    $("#pListaDerecha").html(_paraHtml);
}

///////////////////////////////////// LISTA CRITERIO PARA ORDENAR ///////////////////////////////////
function criterio(_a,_b){
    var _dev;
    if(_a.especialidad > _b.especialidad){
        _dev = 1;
    } else if ( _a.especialidad < _b.especialidad ) {
        _dev = -1;
    } else {
        if(_a.consultasFinalizadas > _b.consultasFinalizadas){
            _dev = -1;
        } else if ( _a.consultasFinalizadas < _b.consultasFinalizadas ) {
            _dev = 1;
        }
    }
    return _dev;
}

//////////////////////////////////// PACIENTES SOLICITAR CONSULTA //////////////////////////////////
$("#secPacientesSolicitarConsulta").click(solicitarConsultaSeccion);
function solicitarConsultaSeccion(){
    mostrarSeccion("#divPacientesSolicitarConsulta");
    if ( usuarioLogeado.habilitado === true ){ // si está habilitado genera un select con los médicos
        var _selectMedicos = "";
        _selectMedicos += "<select id=\"slcSolicitarConsulta\">";
        _selectMedicos += "<option value=\"0\">Seleccione un médico</option>";
        for (var i = 0; i < medicos.length; i++) {
            _selectMedicos += "<option value=\"" + medicos[i].numeroProfesional + "\">" + medicos[i].nombre + " " + medicos[i].apellido + " (" + medicos[i].especialidad.toLowerCase() + ")" + "</option>";
        }
        _selectMedicos += "</select>";
        $("#pConsultas").html(_selectMedicos);
        $("#btnSolicitarConsulta").attr("disabled", false);
    } else { // si no está habilitado se le informa
        $("#pConsultas").html("<font color=\"red\">Usted no está habilitado.");
        $("#btnSolicitarConsulta").attr("disabled", true);
    }
    $("#pMensajeConsultas").html("");
}

/////////////////////////////// PACIENTES SOLICITAR CONSULTA BOTON //////////////////////////////////
$("#btnSolicitarConsulta").click(solicitarConsulta);
function solicitarConsulta(){ 
    var _numeroDelMedico = Number($("#slcSolicitarConsulta").val());
    if ( _numeroDelMedico === 0 ) { // si el usuario no seleccionó ningún médico de la lista le avisa
        botonShake("#btnSolicitarConsulta");
        $("#pMensajeConsultas").html("<font color=\"red\">Seleccione un médico por favor.");
        
    } else {
        var _yaTieneConsulta = false;
        for (var i = 0; i < consultas.length; i++) { // revisa si ya tiene una consulta pendiente con ese médico
            if ( consultas[i].numeroPaciente === usuarioLogeado.numero && 
                    consultas[i].numeroMedico === _numeroDelMedico && 
                    consultas[i].finalizada === false ){
                _yaTieneConsulta = true;
                break;
            }
        }
        
        if ( _yaTieneConsulta === true ){ // si tiene le avisa
            botonShake("#btnSolicitarConsulta");
            $("#pMensajeConsultas").html("<font color=\"red\">Ud. ya tiene una consulta pendiente con ese médico.");
        
        } else { // si no tiene le permite solicitar una nueva consulta y genera el número único de consulta
            var _numeroUnicoConsulta;
            var _nombreMedico;
            var _apellidoMedico;
            var _numeroAnterior = consultas[consultas.length-1].numeroConsulta;
            _numeroAnterior = Number(_numeroAnterior.substr(4)) + 1;
            for (var i = 0; i < medicos.length; i++) {
                if( medicos[i].numeroProfesional === _numeroDelMedico ){
                    _nombreMedico = medicos[i].nombre;
                    _apellidoMedico = medicos[i].apellido;
                    break;
                }
            }
            _numeroUnicoConsulta = _nombreMedico;
            _numeroUnicoConsulta = _numeroUnicoConsulta.substring(_numeroUnicoConsulta.indexOf(" ") + 1);
            _numeroUnicoConsulta = _numeroUnicoConsulta.charAt(0).toUpperCase();
            _numeroUnicoConsulta += _apellidoMedico.substr(0,3).toUpperCase();
            _numeroUnicoConsulta += _numeroAnterior;
            var nuevaConsulta = {
                numeroConsulta: _numeroUnicoConsulta,
                numeroPaciente: usuarioLogeado.numero,
                numeroMedico: _numeroDelMedico,
                finalizada: false,
                paga: false,
                descripcion: ""
            };
            consultas.push(nuevaConsulta);
            $("#pMensajeConsultas").html("Se generó una nueva consulta con: <b>" +_nombreMedico +" "+ _apellidoMedico + "</b>");
            $("#pMensajeConsultas").append("<br> El número de consulta es: <b>"+_numeroUnicoConsulta + "</b>");
        }
    }
}

//////////////////////////////////// PACIENTES VER CONSULTAS ////////////////////////////////////////
$("#secPacientesConsultas").click(pacientesConsultas);
function pacientesConsultas(){
    mostrarSeccion("#divPacientesConsultas");
    var _consultasPendientes = "<h3>Consultas pendientes: </h3>";
    var _consultasFinalizadas = "<h3>Consultas finalizadas: </h3>";
    for (var j = 0; j < consultas.length; j++) { 
        if (consultas[j].numeroPaciente === usuarioLogeado.numero ){ // busca todas las consultas de ese paciente
            if (consultas[j].finalizada === false){ // las separa según estén finalizadas o no
                _consultasPendientes += "Número de consulta: <b>" + consultas[j].numeroConsulta + "</b><br>";
                _consultasPendientes += "Médico: <b>" + buscarNombreMedico(consultas[j].numeroConsulta) + "</b><br><br>";
            } else {
                _consultasFinalizadas += "Número de consulta: <b>" + consultas[j].numeroConsulta + "</b><br>";
                _consultasFinalizadas += "Médico: <b>" + buscarNombreMedico(consultas[j].numeroConsulta) + "</b><br>";
                _consultasFinalizadas += "Descripción: " + consultas[j].descripcion + "<br><br>";
            }
        }
    }
    $("#pConsultasPendientes").html(_consultasPendientes);
    $("#pConsultasFinalizadas").html(_consultasFinalizadas);
}

///////////////////////////////////// PACIENTES DATOS PERSONALES ////////////////////////////////////
$("#secDatos").click(pacientesDatos);
function pacientesDatos(){
    mostrarSeccion("#divDatos");
    var _paraHtml = "";
    _paraHtml += "<img src=\"img/"+ usuarioLogeado.foto + "\"height=\"150\" width=\"150\"></td>";
    _paraHtml += "Nombre: <b>" + usuarioLogeado.nombre + "</b><br>";
    _paraHtml += "Apellido: <b>" + usuarioLogeado.apellido + "</b><br><br>";
    _paraHtml += "N° de usuario: <b>" + usuarioLogeado.numero + "</b><br>";
    _paraHtml += "Contraseña: <b>" + usuarioLogeado.clave + "</b><br>";
    _paraHtml += "Peso: <b>" + usuarioLogeado.pesoActual + "</b><br>";
    _paraHtml += "Altura: <b>" + usuarioLogeado.altura + "</b><br>";
    _paraHtml += "IMC: <b>" + usuarioLogeado.imcActual + "</b><br>";
    $("#pDatos").html(_paraHtml);
    $("#btnPacEditarDatosAceptar").hide();
    $("#pEditarDatos").html("");
}

////////////////////////////////////// PACIENTES EDITAR DATOS ///////////////////////////////////////
$("#btnPacEditarDatos").click(pacientesEditarDatos);
function pacientesEditarDatos(){
    var _paraHtml = "";
    _paraHtml += "<label for=\"txtEditarNombre\">Nombre:</label>";
    _paraHtml += "<input type=\"text\" id=\"txtEditarNombre\" value=\"" + usuarioLogeado.nombre + "\"><br>";
    _paraHtml += "<label for=\"txtEditarApellido\">Apellido:</label>";
    _paraHtml += "<input type=\"text\" id=\"txtEditarApellido\" value=\"" + usuarioLogeado.apellido + "\"><br>";
    _paraHtml += "<label for=\"txtEditarNumero\">Número de usuario:</label>";
    _paraHtml += "<input type=\"text\" id=\"txtEditarClave\" value=\"" + usuarioLogeado.clave + "\"><br>";
    _paraHtml += "<label for=\"fileEditarFoto\">Foto:</label><br>";
    _paraHtml += "<input type=\"file\" id=\"fileEditarFoto\" ><br>";
    $("#pEditarDatos").html(_paraHtml);
    $("#btnPacEditarDatosAceptar").show();
}

////////////////////////////////// PACIENTES EDITAR DATOS ACEPTAR ///////////////////////////////////
$("#btnPacEditarDatosAceptar").click(pacientesEditarDatosAceptar);
function pacientesEditarDatosAceptar(){
    var _foto = $("#fileEditarFoto").val();
    usuarioLogeado.nombre = $("#txtEditarNombre").val();
    usuarioLogeado.apellido = $("#txtEditarApellido").val();
    usuarioLogeado.clave = $("#txtEditarClave").val();
    if (_foto !== ""){
        usuarioLogeado.foto = _foto.substr(_foto.lastIndexOf("\\") + 1); // para que la ruta funcione en todos los navegadores
    }
    pacientesDatos();
}

////////////////////////////////////////// MEDICO CONSULTAS /////////////////////////////////////////
$("#secMedicoConsulta").click(medicoListarConsultas);
function medicoListarConsultas(){
    mostrarSeccion("#divMedicoConsultas");
    var _paraHtml = "<table><th>Consulta</th><th>Nombre del paciente</th><th>Número</th><th></th>";
    for (var i = 0; i < consultas.length; i++) {
        if ( consultas[i].numeroMedico === usuarioLogeado.numeroProfesional && consultas[i].finalizada === false ){
            _paraHtml += "<tr>";
            _paraHtml += "<td>" + consultas[i].numeroConsulta + "</td>";
            _paraHtml += "<td>" + buscarNombrePaciente(consultas[i].numeroConsulta) + "</td>";
            _paraHtml += "<td>" + consultas[i].numeroPaciente + "</td>";
            _paraHtml += "<td><input class=\"botonesConsultas\" type=\"button\" data-id=" + consultas[i].numeroConsulta + " value=\"Realizar consulta\"></td>";
            _paraHtml += "</tr>";
        }
    }
    _paraHtml += "</table>";
    $("#pTodasMisConsultas").html(_paraHtml);
    $("#pConsultaActual").html("");
    $(".botonesConsultas").click(realizarConsulta);
}

//////////////////////////////////////// MEDICO REALIZAR CONSULTA ///////////////////////////////////
function realizarConsulta(){
    mostrarSeccion("#divMedicoConsultaActual");
    var _consultaActualNumero = $(this).attr("data-id");
    var _numeroPaciente;
    for (var i = 0; i < consultas.length; i++) {
        if ( consultas[i].numeroConsulta === _consultaActualNumero ){
            consultaActual = consultas[i];
            _numeroPaciente = consultas[i].numeroPaciente;
            break;
        }
    }
    for (var i = 0; i < pacientes.length; i++) {
        if ( pacientes[i].numero === _numeroPaciente ){
            pacienteEnConsulta = pacientes[i];
        }
    }
    $("#txtPeso").val("");
    $("#txtAltura").val("");
    $("#pMensajePesoAltura").html("");
    $("#txtPeso").attr("disabled",false);
    $("#txtAltura").attr("disabled",false);
    $("#btnIngresarPesoAltura").attr("disabled",false);
    consultaActualActualizarDatos();
}

////////////////////////////// MEDICO CONSULTA ACTUAL ACTUALIZAR DATOS //////////////////////////////
function consultaActualActualizarDatos(){
    var _paraHtml = "<h3>Consulta actual: " + consultaActual.numeroConsulta + "</h3>";
    _paraHtml += "<img src=\"img/"+ pacienteEnConsulta.foto + "\"height=\"150\" width=\"150\"></td>";
    _paraHtml += "Paciente: <b>" + buscarNombrePaciente(consultaActual.numeroConsulta) + "</b><br><br>";
    _paraHtml += "Número del paciente: <b>" + consultaActual.numeroPaciente + "</b><br><br>";
    _paraHtml += "Médico: <b>" + buscarNombreMedico(consultaActual.numeroConsulta) + "</b><br><br>";
    if (consultaActual.paga === true){
        _paraHtml += "Paga: <b>Si</b><br>"; // para poner "Si" o "No" en vez de true o false
        $("#btnMarcarComoPaga").attr("disabled", true);
    } else {
        _paraHtml += "Paga: <b>No</b><br>";
        $("#btnMarcarComoPaga").attr("disabled", false);
    }
    if (consultaActual.finalizada === true){ // para poner "Si" o "No" en vez de true o false
        _paraHtml += "Finalizada: <b>Si</b><br><br>";
        $("#btnFinalizarConsulta").attr("disabled", true);
    } else {
        _paraHtml += "Finalizada: <b>No</b><br><br>";
        $("#btnFinalizarConsulta").attr("disabled", false);
    }
    $("#pMedicoConsultaActual").html(_paraHtml);
}

//////////////////////////////////// MEDICO INGRESAR PESO Y ALTURA //////////////////////////////////
$("#btnIngresarPesoAltura").click(ingresarPesoAltura);
function ingresarPesoAltura(){
    var _pesoActual = Number($("#txtPeso").val());
    var _alturaActual = Number($("#txtAltura").val());
    var _mensaje = "";
    if ( isNaN(_pesoActual) || isNaN(_alturaActual) || _pesoActual === 0 || _alturaActual === 0 ){
        botonShake("#btnIngresarPesoAltura");
        _mensaje = "<font color=\"red\">Ingrese peso y altura correctos.";
    } else {
        var _imcActual =  Math.round(_pesoActual/(_alturaActual*_alturaActual)); // calcula el IMC
        var _imcAnterior = pacienteEnConsulta.imcAnterior;
        pacienteEnConsulta.imcActual = _imcActual;
        pacienteEnConsulta.pesoActual = _pesoActual;
        pacienteEnConsulta.imcAnterior = _imcActual;
        if (_pesoActual > pacienteEnConsulta.pesoMax ){
            pacienteEnConsulta.pesoMax = _pesoActual;
            _mensaje += "El peso actual es el nuevo máximo.<br>";
        }
        if (_pesoActual < pacienteEnConsulta.pesoMin ){
            pacienteEnConsulta.pesoMin = _pesoActual;
            _mensaje += "El peso actual es el nuevo mínimo.<br>";
        }
        if( _imcActual > _imcAnterior * (1.1) ){
            _mensaje += "El IMC es más de 10% mayor que el anterior.<br>";
        } else if ( _imcActual < _imcAnterior * (0.9) ){
            _mensaje += "El IMC es más de 10% menor que el anterior.<br>";
        }
        _mensaje += "IMC actual " + _imcActual + "<br>";
        _mensaje += "IMC anterior " + _imcAnterior + "<br>";
        $("#txtPeso").attr("disabled",true);
        $("#txtAltura").attr("disabled",true);
        $("#btnIngresarPesoAltura").attr("disabled",true);
    }
    $("#pMensajePesoAltura").html(_mensaje);
}

///////////////////////////////////// MEDICO MARCAR CONSULTA COMO PAGA //////////////////////////////
$("#btnMarcarComoPaga").click(marcarComoPaga);
function marcarComoPaga(){
    consultaActual.paga = true;
    consultaActualActualizarDatos();
}

//////////////////////////////////////// MEDICO FINALIZAR CONSULTA //////////////////////////////////
$("#btnFinalizarConsulta").click(finalizarConsulta);
function finalizarConsulta(){
    var _descripcion = $("#txtDescripcion").val();
    var _ingresoPesoYAltura = $("#btnIngresarPesoAltura").prop('disabled');
    if ( _ingresoPesoYAltura === false ) {
        botonShake("#btnFinalizarConsulta");
        $("#pFinalizarConsulta").html("<font color=\"red\">Por favor ingrese peso y altura.");
    } else if ( _descripcion.length < 7 ) {
        botonShake("#btnFinalizarConsulta");
        $("#pFinalizarConsulta").html("<font color=\"red\">Por favor escriba una descripción de más de 7 caracteres.");
    } else {
        $("#pFinalizarConsulta").html("");
        $("#txtDescripcion").val("");
        consultaActual.descripcion = _descripcion;
        consultaActual.finalizada = true;
        usuarioLogeado.consultasFinalizadas ++;
        actualizarListaDerecha();
        medicoListarConsultas();
    }
}

//////////////////////////////////////// MEDICO BUSCAR PACIENTE /////////////////////////////////////
$("#secMedicoBuscarPaciente").click(medicoBuscarPaciente);
function medicoBuscarPaciente(){
    mostrarSeccion("#divMedicoBuscarPaciente");
    pacienteEncontrado = "";
    $("#btnMedicoHabilitarPaciente").hide();
    $("#pMedicoBuscarPacienteInfo").html("");
    $("#pMedicoBuscarPaciente").html("");
}

//////////////////////////////////// MEDICO BUSCAR PACIENTE BUSCAR //////////////////////////////////
$("#btnBuscarPaciente").click(medicoBuscarPacienteBuscar);
function medicoBuscarPacienteBuscar(){
    var _numeroBuscado = Number($("#txtMedicoBuscarPaciente").val());
    var _paraHtml = "";
    for (var i = 0; i < pacientes.length; i++) {
        if( pacientes[i].numero === _numeroBuscado ){
            pacienteEncontrado = pacientes[i];
            _paraHtml = "";
            medicoBuscarPacienteInfo();
            break;
        } else {
            _paraHtml = "<font color=\"red\">El número ingresado no es correcto.";
            $("#pMedicoBuscarPacienteInfo").html("");
            $("#btnMedicoHabilitarPaciente").hide();
        }
    }
    $("#pMedicoBuscarPaciente").html(_paraHtml);
}

///////////////////////////////////// MEDICO BUSCAR PACIENTE INFO ///////////////////////////////////
function medicoBuscarPacienteInfo(){
    var _paraHtml = "<hr><br>El paciente " + pacienteEncontrado.nombre + " " + pacienteEncontrado.apellido ;
    _paraHtml += " (" + pacienteEncontrado.numero + ") ";
    if ( pacienteEncontrado.habilitado === true ){
        _paraHtml += "<font color=\"green\">está habilitado";
        $("#btnMedicoHabilitarPaciente").attr("value","Inhabilitar" );
    } else {
        _paraHtml += "<font color=\"red\">NO está habilitado.";
        $("#btnMedicoHabilitarPaciente").attr("value","Habilitar" );
    }
    $("#btnMedicoHabilitarPaciente").show();
    $("#pMedicoBuscarPacienteInfo").html(_paraHtml);
}

//////////////////////////////// MEDICO BUSCAR PACIENTE HABILITAR O NO //////////////////////////////
$("#btnMedicoHabilitarPaciente").click(medicoHabilitarInhabilitar);
function medicoHabilitarInhabilitar(){
    if ( pacienteEncontrado.habilitado === true ){
        pacienteEncontrado.habilitado = false;
    } else {
        pacienteEncontrado.habilitado = true;
    }
    medicoBuscarPacienteInfo();
}

///////////////////////////////////////////////// SALIR /////////////////////////////////////////////
$("#secSalir").click(salir);
function salir(){
    $(".seccion").hide();
    $("#divDerecha").hide();
    $(".todos").hide();
    $("#divLogin").fadeIn(900);
}

////////////////////////////////////// TODOS LOS PACIENTES //////////////////////////////////////////
$("#secTodosLosPacientes").click(listarPacientes);
function listarPacientes(){
    mostrarSeccion("#divListaPacientes");
    $("#pListaPacientes").html("");
    var _listaParaHtml = "";
    _listaParaHtml += "<h3>Todos los pacientes</h3>";
    _listaParaHtml += "<table><tr><th>Nombre</th><th>Apellido</th><th>Número</th><th>Clave</th><th>Foto</th><th>Habilitado</th><th>Peso actual</th><th>Peso max</th><th>Peso min</th><th>Altura</th><th>IMC anterior</th><th>IMC actual</th></tr>";
    for (var i = 0; i < pacientes.length; i++) {
        _listaParaHtml += "<tr>";
        _listaParaHtml += "<td>" + pacientes[i].nombre + "</td>";
        _listaParaHtml += "<td>" + pacientes[i].apellido + "</td>";
        _listaParaHtml += "<td>" + pacientes[i].numero + "</td>";
        _listaParaHtml += "<td>" + pacientes[i].clave + "</td>";
        _listaParaHtml += "<td>" + "<img src=\"img/"+ pacientes[i].foto + "\"height=\"55\" width=\"55\"></td>";
        _listaParaHtml += "<td>" + pacientes[i].habilitado + "</td>";
        _listaParaHtml += "<td>" + pacientes[i].pesoActual + "</td>";
        _listaParaHtml += "<td>" + pacientes[i].pesoMax + "</td>";
        _listaParaHtml += "<td>" + pacientes[i].pesoMin + "</td>";
        _listaParaHtml += "<td>" + pacientes[i].altura + "</td>";
        _listaParaHtml += "<td>" + pacientes[i].imcAnterior + "</td>";
        _listaParaHtml += "<td>" + pacientes[i].imcActual + "</td>";
        _listaParaHtml += "</tr>";
    }
    _listaParaHtml += "</table>";
    $("#pListaPacientes").html(_listaParaHtml);
}

/////////////////////////////////////////// TODOS LOS MEDICOS ///////////////////////////////////////
$("#secTodosLosMedicos").click(listarMedicos);
function listarMedicos(){
    mostrarSeccion("#divListaMedicos");
    $("#pListaMedicos").html("");
    var _listaParaHtml = "";
    _listaParaHtml += "<h3>Todos los médicos</h3>";
    _listaParaHtml += "<table><tr><th>Nombre</th><th>Apellido</th><th>Especialidad</th><th>Número profesional</th><th>Clave</th><th>Consultas finalizadas</th></tr>";
    for (var i = 0; i < medicos.length; i++) {
        _listaParaHtml += "<tr>";
        _listaParaHtml += "<td>" + medicos[i].nombre + "</td>";
        _listaParaHtml += "<td>" + medicos[i].apellido + "</td>";
        _listaParaHtml += "<td>" + medicos[i].especialidad + "</td>";
        _listaParaHtml += "<td>" + medicos[i].numeroProfesional + "</td>";
        _listaParaHtml += "<td>" + medicos[i].clave + "</td>";
        _listaParaHtml += "<td>" + medicos[i].consultasFinalizadas + "</td>";
        _listaParaHtml += "</tr>";
    }
    _listaParaHtml += "</table>";
    $("#pListaMedicos").html(_listaParaHtml);
}

////////////////////////////////////// TODAS LAS CONSULTAS //////////////////////////////////////////
$("#secTodasLasConsultas").click(listarTodasLasConsultas);
function listarTodasLasConsultas(){
    mostrarSeccion("#divListaTodasConsultas");
    $("#pListaTodasConsultas").html("");
    var _listaParaHtml = "";
    _listaParaHtml += "<h3>Todas las consultas</h3>";
    _listaParaHtml += "<table><tr><th>N°Consulta</th><th>N°Paciente</th><th>N°Médico</th><th>Paga</th><th>Finalizada</th><th>Descripción</th></tr>";
    for (var i = 0; i < consultas.length; i++) {
        _listaParaHtml += "<tr>";
        _listaParaHtml += "<td>" + consultas[i].numeroConsulta + "</td>";
        _listaParaHtml += "<td>" + consultas[i].numeroPaciente + "</td>";
        _listaParaHtml += "<td>" + consultas[i].numeroMedico + "</td>";
        _listaParaHtml += "<td>" + consultas[i].paga + "</td>";
        _listaParaHtml += "<td>" + consultas[i].finalizada + "</td>";
        _listaParaHtml += "<td>" + consultas[i].descripcion + "</td>";
        _listaParaHtml += "</tr>";
    }
    _listaParaHtml += "</table>";
    $("#pListaTodasConsultas").html(_listaParaHtml);
}

///////////////////////////////////////// BOTON SHAKE ///////////////////////////////////////////////
function botonShake(_boton){
    $(_boton).finish().effect( "shake", {distance: 7} );
}

///////////////////////// BUSCAR NOMBRE DEL MEDICO SUGUN CONSULTA ///////////////////////////////////
function buscarNombreMedico(_numeroConsulta){
    var _nombre = "";
    var _numeroMedico;
    for (var i = 0; i < consultas.length; i++) {
        if (consultas[i].numeroConsulta === _numeroConsulta){
            _numeroMedico = consultas[i].numeroMedico;
            break;
        }
    }
    for (var i = 0; i < medicos.length; i++) {
        if (medicos[i].numeroProfesional === _numeroMedico){
            _nombre += medicos[i].nombre + " " + medicos[i].apellido;
            break;
        }
    }
    return _nombre;
}

/////////////////////////// BUSCAR NOMBRE DEL PACIENTE SUGUN CONSULTA ///////////////////////////////
function buscarNombrePaciente(_numeroConsulta){
    var _nombre = "";
    var _numeroPaciente;
    for (var i = 0; i < consultas.length; i++) {
        if (consultas[i].numeroConsulta === _numeroConsulta){
            _numeroPaciente = consultas[i].numeroPaciente;
            break;
        }
    }
    for (var i = 0; i < pacientes.length; i++) {
        if (pacientes[i].numero === _numeroPaciente){
            _nombre += pacientes[i].nombre + " " + pacientes[i].apellido;
            break;
        }
    }
    return _nombre;
}
