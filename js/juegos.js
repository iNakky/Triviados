window.onload = function(){
  if(window.addEventListener){
    JuegoIE9()
  }else{
    /* Nuevo RA6 - Bloque C - Eventos Cross-Browser - Izan */
    JuegoIE8()
  }
}

function JuegoIE9(){
  // -------------------------------
  //   ARRAY DE PREGUNTAS
  // -------------------------

  const preguntas = [
    {
      texto: "1. ¿Qué órgano del cuerpo humano consume más energía?",
      opciones: ["Corazón", "Cerebro", "Hígado"],
      correcta: "Cerebro",
    },
    {
      texto: "2. ¿Cuál es el metal más abundante en la corteza terrestre?",
      opciones: ["Hierro", "Aluminio", "Calcio"],
      correcta: "Aluminio",
    },
    {
      texto: "3. ¿Qué tipo de energia produce el Sol?",
      opciones: ["Nuclear", "Geotermica", "Cinética"],
      correcta: "Nuclear",
    },
    {
      texto: "4. ¿Cuál es el país más poblado de África?",
      opciones: ["Egipto", "Nigeria", "Etiopía"],
      correcta: "Nigeria",
    },
    {
      texto: "5. ¿Qué cordillera es la más larga del mundo?",
      opciones: ["Andes", "Himalaya", "Montañas Rocosas"],
      correcta: "Andes",
    },
    {
      texto: "6. ¿Qué país tiene dos capitales oficiales?",
      opciones: ["Sudáfrica", "Canadá", "India"],
      correcta: "Sudáfrica",
    },
    {
      texto: "7. ¿Que imperio construyó la famosa Ruta de la Seda?",
      opciones: ["Romano", "Persa", "Mongol"],
      correcta: "Mongol",
    },
    {
      texto:
        "8. ¿Quién fue el primer hombre en circunnavegar el mundo(completar el viaje)?",
      opciones: ["Magallanes", "Elcano", "Cook"],
      correcta: "Elcano",
    },
    {
      texto: "9. ¿En qué siglo comenzó la Revolución Francesa?",
      opciones: ["Siglo XVII", "Siglo XVIII", "Siglo XIX"],
      correcta: "Siglo XVIII",
    },
    {
      texto: "10. ¿Qué escritor creó el personaje de Sherlock Holmes?",
      opciones: ["Agatha Christie", "Arthur Conan Doyle", "Edgar Allan Poe"],
      correcta: "Arthur Conan Doyle",
    },
    {
      texto: "11. ¿Cuál es el país de origen del sushi?",
      opciones: ["Corea", "China", "Japón"],
      correcta: "Japón",
    },
    {
      texto: "12. ¿Qué artista pintó La última cena?",
      opciones: ["Miguel Ángel", "Leonardo da Vinci", "Rafael"],
      correcta: "Leonardo da Vinci",
    },
    {
      texto: "13. ¿Cuánto es la raíz cuadrada de 144?",
      opciones: ["10", "12", "14"],
      correcta: "12",
    },
    {
      texto: "14. ¿Cuántos grados tiene un triángulo?",
      opciones: ["90", "180", "360"],
      correcta: "180",
    },
    {
      texto:
        "15. ¿Si un número par se multiplica por un número impar, el resultado es?",
      opciones: ["Siempre par", "Siempre impar", "Depende"],
      correcta: "Siempre par",
    },
  ];

  let indice = 0; // pregunta actual
  let nota = 0; // aciertos totales

  const contenedor = document.getElementById("contenedorPregunta");
  const resultado = document.getElementById("resultado");
  const tablaRes = document.getElementById("tablaRes");
  const tablaUser = document.getElementById("tablaUser");
  const error = document.getElementById("error");
  const res = [];

  // -------------------------------
  //   FUNCIÓN PARA MOSTRAR PREGUNTA
  // -------------------------------

  function mostrarPregunta() {
    const p = preguntas[indice];

    contenedor.innerHTML = `
          <div class="pregunta">
            <p>${p.texto}</p>
            ${p.opciones
              .map(
                (op, i) => `
              <label>
                <input type="radio" name="respuesta" value="${op}">
                ${op}
              </label><br>
            `,
              )
              .join("")}
          </div>
        `;
    //Nuevo RA6 - Bloque A Alba
    const contador = document.createElement("p");
    const textoCont = document.createTextNode(`${preguntas.length}`);
    const textAntes = document.createTextNode("");

    contador.appendChild(textAntes);
    contador.insertBefore(textoCont, null);

    textAntes.nodeValue = `Pregunta ${indice + 1}/ `;

    contador.setAttribute("class", "contPregunta");
    console.log("Atributo de contador: " + contador.getAttribute("class"));
  contenedor.appendChild(contador);
  }

  mostrarPregunta();

  // -------------------------------
  //   VALIDACIÓN Y SIGUIENTE
  // -------------------------------
  //Nuevo RA6 - Bloque A Alba
  let bien = 0;
  let mal = 0;

  const contadorMB = document.createElement("p");
  contadorMB.id = "contadorGlobal";
  contadorMB.textContent = `Aciertos: ${bien} | Fallos: ${mal}`;

  const form = document.getElementById("formTest");
  form.parentNode.insertBefore(contadorMB, form);
  //
  document.getElementById("formTest").addEventListener("submit", function (e) {
    e.preventDefault();

    const marcada = document.querySelector("input[name='respuesta']:checked");

    const respuestaMarcada = document.getElementsByName("respuesta"); //devuelve un array, lo recorro y al nodo padre(label(se genera automaticamente)) se marca de verde/rojo

    if (!marcada) {
      error.textContent = "Debes marcar una respuesta";
      contenedor.firstElementChild.classList.add("vacia");
      return;
    }
    res.push(marcada.value);

    //Nuevo RA6 - Bloque A Alba
    const labels = contenedor.getElementsByTagName("label"); //Devuelve array, ese array lo uso para resaltar todas las opciones cuando se contesta

    for (let i = 0; i < respuestaMarcada.length; i++) {
      const labelM = respuestaMarcada[i].parentNode;

      if (respuestaMarcada[i].checked) {
        if (marcada.value === preguntas[indice].correcta) {
          bien++;
          labelM.style.color = "green";
          $(".pregunta").css("border", "3px solid green");
        } else {
          mal++;
          labelM.style.color = "red";
          $(".pregunta").css("border", "3px solid red");
        }

        contadorMB.textContent = `Aciertos: ${bien} | Fallos: ${mal}`;
      } else {
        labelM.style.color = "black";
      }
      labels[i].style.fontWeight = "bold";
    }
    error.textContent = "";

    setTimeout(() => {
      const contador = document.querySelector(".contPregunta");

    //Nuevo RA6 - Bloque A Alba
      if (contador) {
        console.log("Eliminando contador" + contador);
        contenedor.removeChild(contador);
      }
    //
      $(".pregunta").css("border", "none");

      indice++;

      if (indice >= preguntas.length) {
        contadorMB.parentNode.removeChild(contadorMB);  //Nuevo RA6 - Bloque A Alba
        let validador = new Validator(res);
        let gridAnswers = validador.answerGridSenderV2();
        let userAnswersGrind = validador.userAnswerGridSender();
        contenedor.innerHTML = "";
        resultado.textContent = `${validador.validateAnswers()}`;
        crearCookie(validador.getAccuracy());
        tablaRes.innerHTML = `
                  <table style="width:100%; text-align:center;">
                      <tr>
                          <th></th><th>A</th><th>B</th><th>C</th>
                      </tr>
                      ${gridAnswers
                        .map(
                          (fila, i) => `
                          <tr>
                              <td>Pregunta ${i + 1}</td>
                              <td>${fila[0]}</td>
                              <td>${fila[1]}</td>
                              <td>${fila[2]}</td>
                          </tr>
                      `,
                        )
                        .join("")}
                  </table>
                  `;

        tablaUser.innerHTML = `
                  <table style="width:100%; text-align:center;">
                      <tr>
                          <th></th><th>Respuestas del usuario</th>
                      </tr>
                      ${userAnswersGrind
                        .map(
                          (fila, i) => `
                          <tr>
                              <td>Pregunta ${i + 1}</td>
                              <td>${fila[0]}</td>
                          </tr>
                      `,
                        )
                        .join("")}
                  </table>
                  `;


    //BOTONDE REINICIO + Nuevo RA6 Bloque B - Modelo avanzado de eventos - Larisa

    /*
    CODIGO ANTERIOR
        const boton = document.getElementById("btn");
        boton.textContent = "🔄 Jugar de Nuevo";
        boton.type = "button";
        boton.onclick = function () {
          location.reload();
        };*/

        /*CODIGO NUEVO*/
        const boton = document.getElementById("btn")
        boton.textContent = "🔄 Jugar de Nuevo"
        boton.type = "button"

        function reiniciarJuego(){
          location.reload()
        }

        //eventos add y remove EventListener
        boton.removeEventListener("click", reiniciarJuego)
        boton.addEventListener("click", reiniciarJuego)
        
        /**/


        const botonRedirigir = document.createElement("button");
        botonRedirigir.textContent = "📈Autoevaluación";
        botonRedirigir.type = "button";
        botonRedirigir.id = "btnRedirigir";
        botonRedirigir.onclick = function () {
          window.location.href = "autoevaluacion.html";
        };

        const form = document.getElementById("formTest");
        form.appendChild(botonRedirigir);

        return;
      }

      // Mostrar siguiente pregunta
      mostrarPregunta();
    }, 250);
  });

}


/* Nuevo RA6 - Bloque C - Eventos Cross-Browser Funcionamiento del juego para IE8- - Izan */
function JuegoIE8() {
  // -------------------------------
  //   ARRAY DE PREGUNTAS
  // -------------------------------
  var preguntas = [
    { texto: "1. ¿Qué órgano del cuerpo humano consume más energía?", opciones: ["Corazón", "Cerebro", "Hígado"], correcta: "Cerebro" },
    { texto: "2. ¿Cuál es el metal más abundante en la corteza terrestre?", opciones: ["Hierro", "Aluminio", "Calcio"], correcta: "Aluminio" },
    { texto: "3. ¿Qué tipo de energia produce el Sol?", opciones: ["Nuclear", "Geotermica", "Cinética"], correcta: "Nuclear" },
    { texto: "4. ¿Cuál es el país más poblado de África?", opciones: ["Egipto", "Nigeria", "Etiopía"], correcta: "Nigeria" },
    { texto: "5. ¿Qué cordillera es la más larga del mundo?", opciones: ["Andes", "Himalaya", "Montañas Rocosas"], correcta: "Andes" },
    { texto: "6. ¿Qué país tiene dos capitales oficiales?", opciones: ["Sudáfrica", "Canadá", "India"], correcta: "Sudáfrica" },
    { texto: "7. ¿Que imperio construyó la famosa Ruta de la Seda?", opciones: ["Romano", "Persa", "Mongol"], correcta: "Mongol" },
    { texto: "8. ¿Quién fue el primer hombre en circunnavegar el mundo(completar el viaje)?", opciones: ["Magallanes", "Elcano", "Cook"], correcta: "Elcano" },
    { texto: "9. ¿En qué siglo comenzó la Revolución Francesa?", opciones: ["Siglo XVII", "Siglo XVIII", "Siglo XIX"], correcta: "Siglo XVIII" },
    { texto: "10. ¿Qué escritor creó el personaje de Sherlock Holmes?", opciones: ["Agatha Christie", "Arthur Conan Doyle", "Edgar Allan Poe"], correcta: "Arthur Conan Doyle" },
    { texto: "11. ¿Cuál es el país de origen del sushi?", opciones: ["Corea", "China", "Japón"], correcta: "Japón" },
    { texto: "12. ¿Qué artista pintó La última cena?", opciones: ["Miguel Ángel", "Leonardo da Vinci", "Rafael"], correcta: "Leonardo da Vinci" },
    { texto: "13. ¿Cuánto es la raíz cuadrada de 144?", opciones: ["10", "12", "14"], correcta: "12" },
    { texto: "14. ¿Cuántos grados tiene un triángulo?", opciones: ["90", "180", "360"], correcta: "180" },
    { texto: "15. ¿Si un número par se multiplica por un número impar, el resultado es?", opciones: ["Siempre par", "Siempre impar", "Depende"], correcta: "Siempre par" }
  ];

  var indice = 0;
  var bien = 0;
  var mal = 0;
  var res = [];

  var contenedor = document.getElementById("contenedorPregunta");
  var resultado = document.getElementById("resultado");
  var tablaRes = document.getElementById("tablaRes");
  var tablaUser = document.getElementById("tablaUser");
  var error = document.getElementById("error");
  var form = document.getElementById("formTest");

  // Contador global
  var contadorMB = document.createElement("p");
  contadorMB.id = "contadorGlobal";
  contadorMB.innerText = "Aciertos: " + bien + " | Fallos: " + mal;
  form.parentNode.insertBefore(contadorMB, form);

  // -------------------------------
  // FUNCIONES PARA MOSTRAR PREGUNTA
  // -------------------------------
  function mostrarPregunta() {
    var p = preguntas[indice];
    var html = '<div class="pregunta"><p>' + p.texto + '</p>';
    for (var i = 0; i < p.opciones.length; i++) {
      html += '<label><input type="radio" name="respuesta" value="' + p.opciones[i] + '">' + p.opciones[i] + '</label><br>';
    }
    html += '</div>';
    contenedor.innerHTML = html;

    var contador = document.createElement("p");
    contador.innerText = "Pregunta " + (indice + 1) + " / " + preguntas.length;
    contador.className = "contPregunta";
    contenedor.appendChild(contador);
  }

  mostrarPregunta();

  // -------------------------------
  // FUNCION PARA MANEJAR SUBMIT
  // -------------------------------
  function manejarSubmit(e) {
    if (!e) e = window.event;
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;

    var inputs = document.getElementsByName("respuesta");
    var marcada = null;
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        marcada = inputs[i];
        break;
      }
    }

    if (!marcada) {
      error.innerText = "Debes marcar una respuesta";
      if (contenedor.firstChild) contenedor.firstChild.className += " vacia";
      return;
    }

    res.push(marcada.value);

    var labels = contenedor.getElementsByTagName("label");
    for (var i = 0; i < inputs.length; i++) {
      var labelM = inputs[i].parentNode;
      if (inputs[i].checked) {
        if (inputs[i].value === preguntas[indice].correcta) {
          bien++;
          labelM.style.color = "green";
        } else {
          mal++;
          labelM.style.color = "red";
        }
        contadorMB.innerText = "Aciertos: " + bien + " | Fallos: " + mal;
      } else {
        labelM.style.color = "black";
      }
      labelM.style.fontWeight = "bold";
    }

    error.innerText = "";

    setTimeout(function () {
      var contP = contenedor.getElementsByTagName("p");
      if (contP.length > 1) contenedor.removeChild(contP[contP.length - 1]);
      indice++;

      if (indice >= preguntas.length) {
        contenedor.innerHTML = '';
        resultado.innerText = "Has terminado el test. Aciertos: " + bien + " / Fallos: " + mal;
        return;
      }

      mostrarPregunta();
    }, 250);
  }

  // -------------------------------
  // ASIGNAR EVENTO SUBMIT
  // -------------------------------
  form.attachEvent("onsubmit", manejarSubmit);
}
