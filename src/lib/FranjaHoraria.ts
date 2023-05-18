function asignarMomentoDelDia(franjaHoraria: any) {
  if (franjaHoraria >= 6 && franjaHoraria <= 9) {
    return "Morning (Mañana)";
  } else if (franjaHoraria >= 10 && franjaHoraria <= 12) {
    return "Noon (Mediodía)";
  } else if (franjaHoraria >= 13 && franjaHoraria <= 17) {
    return "Afternoon (Tarde)";
  } else if (franjaHoraria >= 18 && franjaHoraria <= 20) {
    return "Night (Noche)";
  } else {
    return "Midnight (Medianoche)";
  }
}

// Ejemplo de uso
var hora = new Date().getHours(); // Obtener la hora actual
var momentoDelDia = asignarMomentoDelDia(hora);
console.log(momentoDelDia);
