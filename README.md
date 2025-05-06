
# Geoquiz: Juego de preguntas y respuestas

-Este proyecto es un juego web de preguntas y respuestas con tematica de paises utilizando datos de la API de RestCountries. 

-Los usuarios responden un total de 10 preguntas y se genera un ranking basado en puntaje, cantidad de respuestas correctas y tiempo total.

# Juego

Antes de empezar el juego, el usuario debe ingresar su nick o nombre, luego hacer click en "Iniciar juego". Debe ingresar un nick/nombre valido que cumpla con los requisitos. De lo contrario, no podra acceder al juego

El juego carga las 10 preguntas generadas aleatoriamente entre capital, bandera y paises limitrofes, usando endpoints de la API de RestCountries

El juego cuenta con un temporizador, con 10 segundos para cada pregunta. 

Las 10 preguntas generadas varian entre tres tipos de preguntas, al responder una correctamente, el usuario obtiene puntos segun la pregunta elegida aleatoriamente. El usuario no obtiene, ni pierde puntos al responder incorrectamente, o no responder pasados los 10 segundos. Independientemente de la respuesta elegida, el usuario avanza automaticamente a la siguiente pregunta

El juego contiene un contador de preguntas, que indica al usuario por cual pregunta se encuentra en el momento de la partida y la cantidad total de preguntas	

Al finalizar la partida, el juego muestra otra pantalla con los resultados de la misma y, además, muestra un mensaje informando al usuario que ha entrado al ranking, solo y unicamente, si cumple con los requisitos necesarios para clasificar

**Tipos de preguntas y su puntaje**

* ¿Cual es el pais de la siguiente ciudad capital? (3 puntos)

* El país xx está representado por la siguiente bandera (5 puntos)

* ¿Cuantos países limítrofes tiene el siguiente país? (3 puntos)


**Respuestas**

* Cada pregunta tiene 4 respuestas posibles en forma de botones

* Al responder correctamente, el juego muestra un mensaje, debajo del contador de preguntas, informando al usuario sobre la respuesta y cuantos puntos ha obtenido. La respuesta elegida es pintada de color verde

* Al responder incorrectamente, el juego muestra un mensaje, debajo del contador de preguntas, informando al usuario sobre la respuesta y, además, no obtiene puntos. Todas las respuestas incorrectas son pintadas de color rojo, y la respuesta que queda es pintada de color verde, revelando la respuesta correcta

* Al no responder dentro del tiempo limite, el juego muestra un mensaje, debajo del contador de preguntas, informando al usuario que el tiempo se terminó y, ademas, no obtiene puntos. Las respuestas mantienen su color blanco por defecto

Luego de responder o no la pregunta, el usuario es llevado automaticamente a la siguiente pregunta

**Resultados de la partida**

El juego muestra los resultados de la partida del usuario con la siguiente informacion:

* Tiempo total de la partida

* Tiempo promedio por pregunta -> (Se calcula el promedio del tiempo tardado en responder cada pregunta)

* Cant. de respuestas correctas

* Cant. de respuestas incorrectas

* Cant. de preguntas sin responder -> (Cuantas son las preguntas sin responder luego de 10 segundos)

* Puntaje final

Ademas, muestra un mensaje informando al usuario que ha entrado al ranking, solo si cumplió con los requisitos necesarios, teniendo su nick/nombre, puntaje final, cantidad de respuestas correctas y tiempo total en la tabla

**Como entrar al ranking** 

* Puntaje final >= 15

* Cantidad de respuestas correctas >= 5

* Tiempo total de la partida <= 60 segundos (1 minuto)

# Ranking

Dentro de la pagina del ranking, aparece una tabla de posiciones mostrando las mejores 20 partidas, mostrando a los usuarios en sus puestos, con sus nicks/nombres, puntaje, cant. de respuestas correctas y tiempo total

Si durante la partida, el usuario logró entrar al ranking, su posición y progreso aparecerá en la tabla junto con otros usuarios

Tenemos la opcion de ordenar la tabla de tres formas

**Filtros**

* Ordenar por "Puntaje" -> Mayor a menor puntaje

* Ordenar por "Resp. Correctas" -> Mayor a menor cantidad de respuestas correctas

* Ordenar por "Tiempo" -> Menor a mayor tiempo 

#### Cuando se accede a la pagina del ranking, la tabla se ordena por "Puntaje" por defecto

# Tecnologias utilizadas

* Javascript

* Node.js

* Express

* Nodemon

* Tailwind CSS (vía CDN)

* Pug

* API de RestCountries

# Requisitos

* Node.js >= 18

* npm

# Como ejecutar el proyecto localmente

* Clonar el repositorio

```bash
  git clone https://github.com/christian-2001/TP-juego-bandera.git
```

* Ingresar al directorio del proyecto

```bash
  cd TP-juego-bandera
```

* Instalar las dependencias

```bash
  npm install
```

* Ejecutar el servidor

```bash
  npm start
```

* URL del servidor local

```bash
  http://localhost:<puerto>
```
Por defecto, el servidor se ejecuta en el **puerto 3000**, reemplaze, en la URL,  **"<puerto>"** por el numero **3000**

En caso que el puerto **3000** esté ocupado, verifique en la terminal el puerto asignado y reemplaze, en la URL, el puerto **3000** por ese puerto asignado

# Endpoints de la API utilizados

#### Obtener las capitales y su respectivo país. 

```http
https://restcountries.com/v3.1/all?fields=capital,translations
```
  Se obtiene el país traducido al español desde el objeto `translations.spa.common`

-----------------------------------------------------------------

#### Obtener las banderas y su respectivo país

```http
https://restcountries.com/v3.1/all?fields=flags,translations
```

 Se obtiene la bandera desde el objeto `flags.png`

 Se obtiene el país traducido al español desde el objeto `translations.spa.common`

-----------------------------------------------------------------
#### Obtener países junto a sus países fronterizos o limítrofes

```http
https://restcountries.com/v3.1/all?fields=borders,translations
```

 Se obtiene el país traducido al español desde el objeto `translations.spa.common`

 Se obtienen los países fronterizos desde el objeto `borders`, y con el metodo `length` se obtiene el total o cantidad de esos países
 
# Endpoints del proyecto

### GET /

Devuelve la pagina principal del juego renderizada

```Respuesta HTTP 
res.render('index')
```

### GET /juego

Devuelve la pagina del juego renderizada con las 10 preguntas generadas aleatoriamente

```Respuesta HTTP 
//setPreguntas -> Las 10 preguntas generadas usando la API de RestCountries
res.render('juego', {setPreguntas})
```

### GET /ranking

Devuelve la pantalla del ranking renderizada con la tabla de posiciones con las mejores 20 partidas

```Respuesta HTTP 
/* 
   Lee el archivo JSON que contiene 
   informacion de las partidas de varios usuarios en el ranking, 
   y son guardados en otra variable
*/  
    const filePath = path.join(__dirname, '<la ruta del JSON del ranking>')
    const data = fs.readFileSync(filePath, {encoding: 'utf-8'})
    const ranking_data = JSON.parse(data)

// Renderiza la pantalla del ranking con los datos del JSON
    res.render('ranking', {ranking_data})
```

### POST /juego

Sube los resultados de la partida del usuario al ranking

Frontend

```POST
//Resultados de la partida
resultado_final = {nick: nombre, ptaje: puntaje_total, resp: cantCorrectas, tiempo_record: tiempo_total}

//Enviamos los resultados al backend mediante POST
    fetch('/juego', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(resultado_final)
    })
```

Backend

```POST y respuesta HTTP
//Guardamos los resultados en el JSON del ranking

    const partida = req.body
    const filePath = path.join(__dirname, '<la ruta del JSON del ranking>')
    const data = fs.readFileSync(filePath, {encoding: 'utf-8'})
    const ranking_data = JSON.parse(data)
    ranking_data.push(partida)
    fs.writeFileSync(filePath, JSON.stringify(ranking_data, null, 3), {encoding : 'utf-8'})

//Cerramos la peticion HTTP con un codigo 200 (OK) y un mensaje que confirma el guardado exitoso
    res.status(200).send({message: 'Partida del usuario guardada!!!'})

```
# Autor

Desarrollado por Christian Villegas