class RequestHandler {
  constructor() {
    this.url = "https://rickandmortyapi.com/api/character";
  }

  getHeaders() {
    return {
      "Content-type": "application/json",
    };
  }

  getCharacters(request, params, method) {
    return new Promise((resolve, reject) => {
      console.log(
        `Enviando request con los parametros = ` + JSON.stringify(params)
      );
      fetch(this.url + (request || ""), {
        headers: this.getHeaders(),
        method,
        body: method !== "GET" ? JSON.stringify(params) : null,
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("Datos recibidos => ");
          resolve(data);
        })
        .catch((error) => {
          console.log("Request falló => ", error, reject(new Error(error)));
        });
    });
  }
}

const requestHandler = new RequestHandler();
requestHandler
  .getCharacters(null, {}, "GET")
  .then((response) => console.log(response));

/*requestHandler
  .getCharacters(
    null,
    { nombre: "Cristian", apellido: "Grisales", notas: [4, 5, 3, 5] },
    "POST"
  )
  .then((response) => console.log(response));*/

/*requestHandler
  .getCharacters(
    null,
    { id: 1, nombre: "Cristian", apellido: "Grisales", notas: [4, 5, 3, 5] },
    "PUT"
  )
  .then((response) => console.log(response));*/

/*requestHandler
  .getCharacters(
    null,
    { id: 1 },
    "DELETE"
  )
  .then((response) => console.log(response));*/
