/**
 * ==========================================================================
 * CONFIGURACIÓN - MIS XV AÑOS XIMENA
 * ==========================================================================
 * Fecha y hora: cambia solo estas líneas. Día, mes, año, calendario,
 * cuenta regresiva y Google Calendar se calculan automáticamente.
 */

const XV_CONFIG = {
  quinceanera: { nombre: "Ximena" },

  // Fecha y hora de inicio / fin (con zona horaria)
  fecha: {
    fechaHoraISO: "2026-11-24T18:00:00-04:00",
    fechaFinISO: "2026-11-25T02:00:00-04:00"
  },

  // Horas mostradas en las tarjetas y el itinerario
  ceremonia: {
    hora: "6:00 PM",
    lugar: "IGLESIA SAGRADO CORAZÓN",
    mapsUrl: "https://maps.google.com/?q=Iglesia+Sagrado+Corazon"
  },
  recepcion: {
    hora: "7:00 PM",
    lugar: "SALÓN DE EVENTOS QUINTA LA BONITA",
    mapsUrl: "https://maps.google.com/?q=Salon+de+Eventos+Quinta+La+Bonita"
  },
  // Orden: misa, cóctel, vals, cena, fiesta
  itinerario: ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "11:00 PM"],

  // WhatsApp para confirmaciones (con código de país)
  whatsapp: {
    telefono: "59170000000",
    mensajePredefinido:
      "¡Hola {nombre}! Confirmo con mucha alegría mi asistencia a tus XV Años el {fechaTexto}."
  }
};

// ---- Cálculo automático de campos de fecha (no editar) ----
(function () {
  const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const DIAS = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  const f = XV_CONFIG.fecha;
  const m = f.fechaHoraISO.match(/^(\d{4})-(\d{2})-(\d{2})T/);
  const anio = +m[1], mes = +m[2], dia = +m[3];
  const diaSemana = DIAS[new Date(Date.UTC(anio, mes - 1, dia)).getUTCDay()];
  const dd = String(dia), mm = String(mes).padStart(2, "0");
  Object.assign(f, {
    diaSemana, diaSemanaUpper: diaSemana.toUpperCase(),
    diaNumero: dd, mesNombre: MESES[mes - 1], mesIndice: mes - 1,
    anio: String(anio),
    fechaPuntos: `${dd} · ${mm} · ${anio}`,
    fechaTexto: `${dd} de ${MESES[mes - 1]} de ${anio}`
  });
  const w = XV_CONFIG.whatsapp;
  w.mensajePredefinido = w.mensajePredefinido
    .replace("{nombre}", XV_CONFIG.quinceanera.nombre)
    .replace("{fechaTexto}", f.fechaTexto);
})();

window.XV_CONFIG = XV_CONFIG;
window.WEDDING_CONFIG = XV_CONFIG;