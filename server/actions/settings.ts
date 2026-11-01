"use server";

import { revalidatePath } from "next/cache";
import { updateActiveSettings, updateActiveWeeklyHours, PublicSiteSettings } from "@/lib/settings";
import { OpeningHoursRange } from "@/lib/hours";

export async function updateSiteSettingsAction(data: Partial<PublicSiteSettings>) {
  updateActiveSettings(data);
  revalidatePath("/", "layout");
  return { success: true, message: "Configuració guardada correctament" };
}

export async function updateOpeningHoursAction(hours: OpeningHoursRange[]) {
  updateActiveWeeklyHours(hours);
  revalidatePath("/", "layout");
  return { success: true, message: "Horaris d'obertura actualitzats" };
}
