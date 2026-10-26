/* =========================================================
   AURA - Datos de productos + página de detalle
   Para agregar o editar un producto, modificá la lista de abajo.
   Las fotos se buscan solas en la carpeta img/ con el nombre
   "id.jpg" (ej: img/remera-oversize.jpg). Si no existe, se
   muestra el espacio "Tu imagen acá".
   ========================================================= */

const PRODUCTOS = [
  {
    id: "remera-oversize",
    nombre: "Remera oversize Aura",
    categoria: "Remeras",
    precio: 24900,
    talles: ["S", "M", "L", "XL"],
    descripcion: "Nuestra remera estrella. Corte suelto, tela suave y el logo de Aura en el pecho. Va con todo.",
    detalles: ["100% algodón", "Corte oversize", "Estampado resistente al lavado"]
  },
  {
    id: "remera-street",
    nombre: "Remera estampada street",
    categoria: "Remeras",
    precio: 22500,
    talles: ["S", "M", "L", "XL"],
    descripcion: "Estampa grande en la espalda y corte clásico. Ideal para combinar con un cargo.",
    detalles: ["Algodón peinado", "Corte regular", "Estampa en la espalda"]
  },
  {
    id: "buzo-canguro",
    nombre: "Buzo canguro con capucha",
    categoria: "Buzos",
    precio: 52900,
    talles: ["S", "M", "L", "XL"],
    descripcion: "Abrigado, cómodo y con bolsillo grande al frente. El básico que no puede faltar en el invierno.",
    detalles: ["Friza premium por dentro", "Capucha con cordón", "Bolsillo canguro"]
  },
  {
    id: "campera-rompeviento",
    nombre: "Campera rompeviento",
    categoria: "Camperas",
    precio: 74900,
    talles: ["S", "M", "L", "XL"],
    descripcion: "Liviana, impermeable y con onda. Para los días de viento y de lluvia.",
    detalles: ["Tela repelente al agua", "Cierre frontal", "Dos bolsillos laterales"]
  },
  {
    id: "pantalon-cargo",
    nombre: "Pantalón cargo",
    categoria: "Pantalones",
    precio: 48500,
    talles: ["38", "40", "42", "44"],
    descripcion: "Con bolsillos a los costados, calce holgado y ajuste en el tobillo. Cómodo para todo el día.",
    detalles: ["Gabardina resistente", "Seis bolsillos", "Cintura con elástico"]
  },
  {
    id: "jean-baggy",
    nombre: "Jean baggy",
    categoria: "Pantalones",
    precio: 56900,
    talles: ["38", "40", "42", "44"],
    descripcion: "Jean de tiro medio y pierna ancha. Lavado clásico que combina con cualquier remera.",
    detalles: ["Denim rígido", "Calce baggy", "Cinco bolsillos"]
  },
  {
    id: "zapatillas-urbanas",
    nombre: "Zapatillas urbanas",
    categoria: "Calzado",
    precio: 89900,
    talles: ["36", "37", "38", "39", "40", "41", "42", "43"],
    descripcion: "Suela gruesa, diseño llamativo y muy cómodas para caminar la ciudad.",
    detalles: ["Suela de goma antideslizante", "Plantilla acolchada", "Cierre con cordones"]
  },
  {
    id: "gorra-aura",
    nombre: "Gorra Aura",
    categoria: "Accesorios",
    precio: 14900,
    talles: ["Único"],
    descripcion: "Gorra con visera curva y logo bordado. Ajustable atrás para que te quede perfecta.",
    detalles: ["Logo bordado", "Cierre ajustable", "Talle único"]
  },
  {
    id: "mochila-urbana",
    nombre: "Mochila urbana",
    categoria: "Accesorios",
    precio: 38900,
    talles: ["Único"],
    descripcion: "Con lugar para la compu, los cuadernos y todo lo que cargues. Resistente y con muchos bolsillos.",
    detalles: ["Compartimento para notebook", "Tela resistente al agua", "Bretel acolchados"]
  },
  {
    id: "rinonera-cross",
    nombre: "Riñonera cross",
    categoria: "Accesorios",
    precio: 16900,
    talles: ["Único"],
    descripcion: "Para llevar lo justo: celu, llaves y billetera. Se usa cruzada o en la cintura.",
    detalles: ["Dos cierres", "Correa regulable", "Talle único"]
  }
];

function formatearPrecio(numero) {
  return "$" + numero.toLocaleString("es-AR");
}

/* Pone la foto (img/id.jpg) dentro de un contenedor. Si no existe, no pasa nada. */
function ponerFoto(contenedor, producto) {
  const img = new Image();
  img.alt = producto.nombre;
  img.addEventListener("error", function () { img.remove(); });
  img.src = "../img/" + producto.id + ".jpg";
  contenedor.appendChild(img);
}

function crearCard(producto) {
  const enlace = document.createElement("a");
  enlace.className = "card";
  enlace.href = "producto.html?id=" + encodeURIComponent(producto.id);

  const imagen = document.createElement("div");
  imagen.className = "card-img";
  const aviso = document.createElement("span");
  aviso.textContent = "Tu imagen acá";
  imagen.appendChild(aviso);
  ponerFoto(imagen, producto);

  const cuerpo = document.createElement("div");
  cuerpo.className = "card-cuerpo";
  const categoria = document.createElement("span");
  categoria.className = "categoria";
  categoria.textContent = producto.categoria;
  const titulo = document.createElement("h3");
  titulo.textContent = producto.nombre;
  const precio = document.createElement("p");
  precio.className = "precio";
  precio.textContent = formatearPrecio(producto.precio);
  cuerpo.append(categoria, titulo, precio);

  enlace.append(imagen, cuerpo);
  return enlace;
}

(function mostrarDetalle() {
  const detalle = document.getElementById("detalle");
  if (!detalle) return; // esta página no es la de detalle

  const id = new URLSearchParams(window.location.search).get("id");
  const indice = PRODUCTOS.findIndex(function (p) { return p.id === id; });

  if (indice === -1) {
    detalle.innerHTML =
      '<p class="no-encontrado">No encontramos ese producto. ' +
      '<a href="productos.html">Volvé a la tienda</a> y elegí otro.</p>';
    const rel = document.getElementById("relacionados-seccion");
    if (rel) rel.hidden = true;
    return;
  }

  const p = PRODUCTOS[indice];
  document.title = p.nombre + " | Aura";

  const tallesHTML = p.talles.map(function (t) {
    return '<label class="talle"><input type="radio" name="talle" value="' + t + '">' +
           "<span>" + t + "</span></label>";
  }).join("");

  const detallesHTML = p.detalles.map(function (d) { return "<li>" + d + "</li>"; }).join("");

  detalle.innerHTML =
    '<div class="detalle-grid">' +
      '<div class="detalle-img" id="detalle-img"><span>Tu imagen acá</span></div>' +
      '<div class="detalle-info">' +
        '<span class="categoria"></span>' +
        "<h1></h1>" +
        '<p class="precio precio-grande"></p>' +
        '<p class="descripcion"></p>' +
        '<fieldset class="talles"><legend>Talle</legend>' +
          '<div class="talles-lista">' + tallesHTML + "</div></fieldset>" +
        '<label class="cantidad">Cantidad ' +
          '<input type="number" id="cantidad" min="1" max="10" value="1"></label>' +
        '<button type="button" class="boton boton-comprar" id="comprar">Comprar ahora</button>' +
        '<p class="mensaje" id="mensaje" role="status"></p>' +
        '<ul class="detalles">' + detallesHTML + "</ul>" +
        '<div class="envios"><strong>Envíos y cambios</strong><br>' +
          "Envío gratis en compras de más de $60.000. Cambios dentro de los 30 días.</div>" +
      "</div>" +
    "</div>";

  // Textos del producto (con textContent, por seguridad)
  detalle.querySelector(".categoria").textContent = p.categoria;
  detalle.querySelector("h1").textContent = p.nombre;
  detalle.querySelector(".precio").textContent = formatearPrecio(p.precio);
  detalle.querySelector(".descripcion").textContent = p.descripcion;

  ponerFoto(document.getElementById("detalle-img"), p);

  // Si hay un solo talle, queda elegido de entrada
  if (p.talles.length === 1) {
    detalle.querySelector('input[name="talle"]').checked = true;
  }

  // Botón de compra (ficticio)
  const mensaje = document.getElementById("mensaje");
  document.getElementById("comprar").addEventListener("click", function () {
    const elegido = detalle.querySelector('input[name="talle"]:checked');
    let cantidad = parseInt(document.getElementById("cantidad").value, 10);
    if (isNaN(cantidad) || cantidad < 1) cantidad = 1;
    if (cantidad > 10) cantidad = 10;

    if (!elegido) {
      mensaje.className = "mensaje error";
      mensaje.textContent = "Elegí un talle antes de comprar.";
      return;
    }
    mensaje.className = "mensaje ok";
    mensaje.textContent =
      "¡Listo! Agregaste " + cantidad + " × " + p.nombre + " (talle " + elegido.value + ") " +
      "por " + formatearPrecio(p.precio * cantidad) + ". Es una demo: no se hizo ninguna compra real.";
  });

  // Productos relacionados: los 3 siguientes de la lista
  const relacionados = document.getElementById("relacionados");
  if (relacionados) {
    for (let i = 1; i <= 3; i++) {
      relacionados.appendChild(crearCard(PRODUCTOS[(indice + i) % PRODUCTOS.length]));
    }
  }
})();
