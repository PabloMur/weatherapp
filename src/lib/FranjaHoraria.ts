export function asignarMomentoDelDia(franjaHoraria: any) {
  if (franjaHoraria >= 6 && franjaHoraria <= 9) {
    return "morning";
  } else if (franjaHoraria >= 10 && franjaHoraria <= 12) {
    return "noon";
  } else if (franjaHoraria >= 13 && franjaHoraria <= 17) {
    return "afternoon";
  } else if (franjaHoraria >= 18 && franjaHoraria <= 20) {
    return "night";
  } else {
    return "midnight";
  }
}
