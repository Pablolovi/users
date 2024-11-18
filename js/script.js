// Paso 1: Obtener los usuarios desde la API JSONPlaceholder
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())  // Convertimos la respuesta a formato JSON
  .then(data => {
    // Paso 2: Añadir una edad aleatoria a cada usuario
    const usuariosConEdadYImg = data.map((usuario) => {
      // Usamos Lorem Picsum para obtener una imagen aleatoria
      const imgUrl = `https://picsum.photos/80?random=${Math.floor(Math.random() * 1000)}`;  // Generamos una URL única para cada usuario
      console.log("Imagen URL: ", imgUrl);  // Verifica que la URL de la imagen es correcta
      return {
        ...usuario,  // Copiamos todas las propiedades del usuario original
        edad: Math.floor(Math.random() * (60 - 18 + 1)) + 18,  // Generamos una edad aleatoria entre 18 y 60
        img: imgUrl,  // Asignamos la URL de la imagen
      };
    });

    // Paso 3: Mostrar los detalles de los usuarios en el DOM
    const listaUsuarios = document.getElementById('listaUsuarios');  // Obtenemos el elemento <ul> donde se mostrarán los usuarios

    // Recorremos todos los usuarios para crear un <li> para cada uno
    usuariosConEdadYImg.forEach(usuario => {
      // Creamos un nuevo elemento <li> para cada usuario
      const li = document.createElement('li');
      li.classList.add('card');  // Añadimos la clase 'card' para aplicar estilos

      // Insertamos la información del usuario en formato HTML dentro del <li>
      li.innerHTML = `
        <div class="foto-container">
          <img src="${usuario.img}" alt="Imagen de ${usuario.name}">
        </div>
        <div class="info-container">
          <strong>${usuario.name}</strong>
          <p>Edad: ${usuario.edad}</p>
          <p>Username: ${usuario.username}</p>
          <p>Email: ${usuario.email}</p>
          <div class="direccion-container">
            <p>${usuario.company.name}</p>
            <p>${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}</p>
          </div>
        </div>
      `;

      // Añadimos el <li> creado a la lista <ul> en el DOM
      listaUsuarios.appendChild(li);
    });
  })
  .catch(error => console.log(error));  // Si ocurre algún error, lo mostramos en la consola
