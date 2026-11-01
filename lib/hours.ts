export interface OpeningHoursRange {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  opensAt: string;   // "06:00"
  closesAt: string;  // "21:00"
  isClosed: boolean;
}

export interface SpecialHoursClosure {
  dateFrom: string; // "YYYY-MM-DD"
  dateTo: string;   // "YYYY-MM-DD"
  isClosed: boolean;
  opensAt?: string;
  closesAt?: string;
  note?: string;
}

export interface OpenStatusResult {
  isOpen: boolean;
  statusText: string;
  nextChangeText?: string;
}

export const DEFAULT_WEEKLY_HOURS: OpeningHoursRange[] = [
  { dayOfWeek: 1, opensAt: "06:00", closesAt: "21:00", isClosed: false }, // Mon
  { dayOfWeek: 2, opensAt: "06:00", closesAt: "21:00", isClosed: false }, // Tue
  { dayOfWeek: 3, opensAt: "06:00", closesAt: "21:00", isClosed: false }, // Wed
  { dayOfWeek: 4, opensAt: "06:00", closesAt: "21:00", isClosed: false }, // Thu
  { dayOfWeek: 5, opensAt: "06:00", closesAt: "21:00", isClosed: false }, // Fri
  { dayOfWeek: 6, opensAt: "06:00", closesAt: "15:00", isClosed: false }, // Sat
  { dayOfWeek: 0, opensAt: "06:00", closesAt: "15:00", isClosed: false }, // Sun
];

/**
 * Calculates whether the bakery is currently open in the Europe/Madrid timezone
 */
export function getBakeryOpenStatus(
  weeklyHours: OpeningHoursRange[] = DEFAULT_WEEKLY_HOURS,
  specialHours: SpecialHoursClosure[] = [],
  locale: "ca" | "es" | "en" = "es"
): OpenStatusResult {
  const timeZone = "Europe/Madrid";
  const now = new Date();

  // Get current Madrid date and time parts
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  const parts = formatter.formatToParts(now);
  const partMap: Record<string, string> = {};
  for (const p of parts) {
    partMap[p.type] = p.value;
  }

  const currentYear = partMap.year;
  const currentMonth = partMap.month;
  const currentDay = partMap.day;
  const currentDateStr = `${currentYear}-${currentMonth}-${currentDay}`;
  const currentHour = parseInt(partMap.hour || "0", 10);
  const currentMinute = parseInt(partMap.minute || "0", 10);
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  // Day of week in Madrid
  const madridDate = new Date(now.toLocaleString("en-US", { timeZone }));
  const currentDayOfWeek = madridDate.getDay();

  // Check special closures first
  const activeSpecial = specialHours.find(
    (s) => currentDateStr >= s.dateFrom && currentDateStr <= s.dateTo
  );

  if (activeSpecial && activeSpecial.isClosed) {
    const text =
      locale === "ca"
        ? `Tancat · ${activeSpecial.note || "Festiu"}`
        : locale === "en"
        ? `Closed · ${activeSpecial.note || "Holiday"}`
        : `Cerrado · ${activeSpecial.note || "Festivo"}`;
    return { isOpen: false, statusText: text };
  }

  // Today's schedule
  const todaySchedule = weeklyHours.find((h) => h.dayOfWeek === currentDayOfWeek);

  if (!todaySchedule || todaySchedule.isClosed) {
    const closedText =
      locale === "ca"
        ? "Tancat avui"
        : locale === "en"
        ? "Closed today"
        : "Cerrado hoy";
    return { isOpen: false, statusText: closedText };
  }

  const [openH, openM] = todaySchedule.opensAt.split(":").map(Number);
  const [closeH, closeM] = todaySchedule.closesAt.split(":").map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (currentTotalMinutes >= openMinutes && currentTotalMinutes < closeMinutes) {
    const text =
      locale === "ca"
        ? `Obert ara · Tanca a les ${todaySchedule.closesAt}`
        : locale === "en"
        ? `Open now · Closes at ${todaySchedule.closesAt}`
        : `Abierto ahora · Cierra a las ${todaySchedule.closesAt}`;
    return { isOpen: true, statusText: text };
  } else if (currentTotalMinutes < openMinutes) {
    const text =
      locale === "ca"
        ? `Tancat · Obre a les ${todaySchedule.opensAt}`
        : locale === "en"
        ? `Closed · Opens at ${todaySchedule.opensAt}`
        : `Cerrado · Abre a las ${todaySchedule.opensAt}`;
    return { isOpen: false, statusText: text };
  } else {
    // Already closed for today
    const text =
      locale === "ca"
        ? "Tancat · Obre demà a les 06:00"
        : locale === "en"
        ? "Closed · Opens tomorrow at 06:00"
        : "Cerrado · Abre mañana a las 06:00";
    return { isOpen: false, statusText: text };
  }
}
