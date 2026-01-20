window.addEventListener('load', function(){
    console.log('Formulario cargado');
    inicializarFormulario();
});

function inicializarFormulario(){
    const form = document.getElementById('evaluation');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const genreSelect = document.getElementById('genre');
    const satisfactionInput = document.getElementById('satisfaction');
    const commentsTextarea = document.getElementById('comments');

    crearElementosValidacion();

   // Validaciones en input y change - Nuevo RA6 - Bloque B - Uso del evento Event -> con console.log - Larisa
    nameInput.addEventListener('input', function(event){
        validarNombre(event.target);
        console.log("Evento target: " + event.target)
        console.log("Evento type: " + event.type)
    });

    emailInput.addEventListener('input', function(event){
        validarEmail(event.target);
    });

    genreSelect.addEventListener('input', function(event){
        validarGenero(event.target);
    });

    satisfactionInput.addEventListener('input', function(event){
        validarSatisfaccion(event.target);
    });

    commentsTextarea.addEventListener('input', function(event){
        contarCaracteres(event.target);
    });

    genreSelect.addEventListener('change', function(event){
        validarGenero(event.target);
    });

    satisfactionInput.addEventListener('change', function(event){
        validarSatisfaccion(event.target);
    });

    // Eventos focus y blur
    nameInput.addEventListener('focus', function(event){
        event.target.style.borderColor = 'blue';
    });

    emailInput.addEventListener('focus', function(event){
        event.target.style.borderColor = 'blue';
    });

    commentsTextarea.addEventListener('focus', function(event){
        event.target.style.borderColor = 'blue';
    });

    nameInput.addEventListener('blur', function(event) {
        const campo = event.target;
        campo.style.borderColor = '';   // neutro primero
        if (campo.dataset.touched === "true") {
            validarNombre(campo);       // solo valida si fue tocado
        }
    });

    emailInput.addEventListener('blur', function(event){
        event.target.style.borderColor = '';
        if (event.target.dataset.touched === "true") {
            validarEmail(event.target);
        }
    });

    //Nuevo - RA6 - Bloque B - Control del flujo de eventos -> con console.log - Larisa
    emailInput.addEventListener('keydown', function(event){
        event.stopPropagation()
        console.log('Tecla detectada SOLO en email: ' + event.key)
    })

    commentsTextarea.addEventListener('blur', function(event){
        event.target.style.borderColor = '';
    });

    // Evento keydown global - Nuevo RA6 - Bloque B - Uso del evento Event -> con console.log - Larisa
    document.addEventListener('keydown', function(event){
        console.log('Tecla presionada: ' + event.key);
        console.log('Type : ' + event.type);
        console.log('KeyCode : ' + event.keyCode);

        //Detectar teclas especiales :
        if(event.key === 'Enter'){
            console.log('Tecla ENTER detectada')
        }
        if(event.key === 'Shift'){
            console.log('Tecla SHIFT detectada')
        }
        if(event.ctrlKey){
            console.log('CTRL esta pulsado')
        }

    });

    // Botones (corregidos con # para IDs)
    const submitBtn = form.querySelector('#sendBtn');
    const resetBtn = form.querySelector('#resetBtn');

    submitBtn.addEventListener('click', function(event){
        console.log('Botón Enviar clickeado');
    });

    resetBtn.addEventListener('click', function(event){
        console.log('Botón Limpiar clickeado');
    });

    // Submit
    form.addEventListener('submit', function(event){
        event.preventDefault();

        console.log('Formulario enviado - Validando...');

        const nombreValido = validarNombre(nameInput);
        const emailValido = validarEmail(emailInput);
        const generoValido = validarGenero(genreSelect);
        const satisfaccionValido = validarSatisfaccion(satisfactionInput);

        if(nombreValido && emailValido && generoValido && satisfaccionValido){
            procesarForm();
        }else{
            alert('Corrija los errores del formulario.');
        }
    });

    // Reset - Opción A: limpieza completa
    form.addEventListener('reset', function(event) {
        setTimeout(() => {
            limpiarValidaciones();
            document.getElementById('results').style.display = 'none';
        }, 0);
    });
}

function validarNombre(campo){
    const valor = campo.value.trim();
    const errorSpan = document.getElementById('nameError');

    if(valor === ''){
        errorSpan.textContent = 'El nombre no puede estar vacío.';
        errorSpan.style.display = 'block';
        campo.style.borderColor = 'red';
        return false;
    } else{
        errorSpan.style.display = 'none';
        campo.style.borderColor = 'green';
        return true;
    }
}

function validarEmail(campo){
    const valor = campo.value.trim();
    const errorSpan = document.getElementById('emailError');

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(valor === ''){
        errorSpan.textContent = 'El email no puede estar vacío.';
        errorSpan.style.display = 'block';
        campo.style.borderColor = 'red';
        return false;
    }else if(!regexEmail.test(valor)){
        errorSpan.textContent = 'Email inválido. Formato: ejemplo@dominio.com.';
        errorSpan.style.display = 'block';
        campo.style.borderColor = 'red';
        return false;
    } else{
        errorSpan.style.display = 'none';
        campo.style.borderColor = 'green';
        return true;
    }
}

function validarGenero(campo){
    const valor = campo.value.trim();
    const errorSpan = document.getElementById('genreError'); 

    if(valor === ''){
        errorSpan.textContent = 'Seleccione un género.';
        errorSpan.style.display = 'block';
        campo.style.borderColor = 'red';
        return false;
    } else{
        errorSpan.style.display = 'none';
        campo.style.borderColor = 'green';
        return true;
    }
}

function validarSatisfaccion(campo){
    const valor = campo.value.trim();
    const errorSpan = document.getElementById('satisfactionError'); 

    const numero = parseInt(valor);

    if(valor === ''){
        errorSpan.textContent = 'Debes indicar tu grado de satisfacción.';
        errorSpan.style.display = 'block';
        campo.style.borderColor = 'red';
        return false;
    }else if(isNaN(numero)){
        errorSpan.textContent = 'Debe ser un número.';
        errorSpan.style.display = 'block';
        campo.style.borderColor = 'red';
        return false;
    }else if(numero < 1 || numero > 10){
        errorSpan.textContent = 'El número debe estar entre 1 y 10.';
        errorSpan.style.display = 'block';
        campo.style.borderColor = 'red';
        return false;
    } else{
        errorSpan.style.display = 'none';
        campo.style.borderColor = 'green';
        return true;
    }
}

function contarCaracteres(campo){
    const valor = campo.value;
    const contador = document.getElementById('charCounter');
    const numCaracteres = valor.length;

    contador.textContent = 'Caracteres: ' + numCaracteres;
}

function crearElementosValidacion(){
    const nameGroup = document.getElementById('name').parentElement;
    const nameError = document.createElement('span');
    nameError.id = 'nameError';
    nameError.className = 'error-message';
    nameError.style.display = 'none';
    nameGroup.appendChild(nameError);

    const emailGroup = document.getElementById('email').parentElement;
    const emailError = document.createElement('span');
    emailError.id = 'emailError';
    emailError.className = 'error-message';
    emailError.style.display = 'none';
    emailGroup.appendChild(emailError);

    const genreGroup = document.getElementById('genre').parentElement;
    const genreError = document.createElement('span');
    genreError.id = 'genreError';
    genreError.className = 'error-message';
    genreError.style.display = 'none';
    genreGroup.appendChild(genreError);

    const satisfactionGroup = document.getElementById('satisfaction').parentElement;
    const satisfactionError = document.createElement('span');
    satisfactionError.id = 'satisfactionError';
    satisfactionError.className = 'error-message';
    satisfactionError.style.display = 'none';
    satisfactionGroup.appendChild(satisfactionError);

    const commentsGroup = document.getElementById('comments').parentElement;
    const charCounter = document.createElement('span');
    charCounter.id = 'charCounter';
    charCounter.textContent = 'Caracteres: 0';
    charCounter.style.display = 'block';
    charCounter.style.fontSize = '0.9em';
    charCounter.style.color = '#666';
    charCounter.style.marginTop = '5px';
    commentsGroup.appendChild(charCounter);
}

function procesarForm(){
    const nombre = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const genero = document.getElementById('genre').value;
    const satisfaccion = document.getElementById('satisfaction').value;
    const comentarios = document.getElementById('comments').value.trim();

    const generoTexto = genero === 'woman' ? 'Mujer' : 'Hombre';

    const resultsDiv = document.getElementById('results');
    const resultsContent = document.getElementById('resultsContent');
    let notaCookie = getCookie('notaMedia')
    console.log("Cookies:", document.cookie);
    console.log(notaCookie)
    resultsContent.innerHTML = 
        '<h4>Resumen de tu evaluación: </h4>' +
        '<p><strong>Nombre: </strong>' + nombre + '</p>' +
        '<p><strong>Email: </strong>' + email + '</p>' +
        '<p><strong>Género: </strong>' + generoTexto + '</p>' +
        '<p><strong>Satisfacción: </strong>' + satisfaccion + '/10</p>' +
        (comentarios ? '<p><strong>Comentarios: </strong>' + comentarios + '</p>' : '') +
        '<p><strong>Nota Global: </strong>' + notaCookie + '/10</p>';

    resultsDiv.style.display = 'block';

    alert('Formulario enviado correctamente.');
}

function limpiarValidaciones(){
    const errores = document.querySelectorAll('.error-message');
    errores.forEach(function(error){
        error.style.display = 'none';
    });

    const campos = document.querySelectorAll('input, select, textarea');
    campos.forEach(function(campo){
        campo.style.borderColor = '';
        campo.dataset.touched = "false";
    });

    const contador = document.getElementById('charCounter');
    if(contador){
        contador.textContent = 'Caracteres: 0';
    }
}