export function generateIntervalTime(horaInicio: string, horaFin: string): string[] {
    // Convertir las horas de entrada a objetos Date
    const inicio = new Date();
    const fin = new Date();

    // Dividir la horaInicio y horaFin
    const [horaI, minutoI] = horaInicio.split(":").map(Number);
    const [horaF, minutoF] = horaFin.split(":").map(Number);

    // Establecer las horas y minutos
    inicio.setHours(horaI, minutoI, 0, 0);
    fin.setHours(horaF, minutoF, 0, 0);

    // Crear un array para los intervalos
    const intervalos: string[] = [];

    // Generar intervalos de 30 minutos
    const MILISEGUNDOS_30_MINUTOS = 30 * 60 * 1000;
    while (inicio < fin) {
        intervalos.push(
            inicio.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
        );
        inicio.setTime(inicio.getTime() + MILISEGUNDOS_30_MINUTOS);
    }

    // Añadir el límite superior si no está incluido
    if (intervalos.length === 0 || intervalos[intervalos.length - 1] !== horaFin) {
        intervalos.push(horaFin);
    }

    return intervalos;
}

export function formatDate(date: Date):string{
    const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false
    })

    return formattedDate
}