export function asignarMomentoDelDia(franjaHoraria: any) {
  if (franjaHoraria >= "06" && franjaHoraria <= "09") {
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
