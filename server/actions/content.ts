"use server";

import { revalidatePath } from "next/cache";
import {
  contentStore,
  ProductItem,
  SeasonalCampaign,
  BlogPostItem,
  FaqItem,
  TestimonialItem,
} from "@/lib/content-store";

function safeRevalidate(path: string, type?: "layout" | "page") {
  try {
    revalidatePath(path, type);
  } catch {
    // Ignore when running outside Next.js request context (e.g. unit tests)
  }
}

export async function saveProductAction(
  productData: Omit<ProductItem, "id" | "allergensReviewedAt" | "allergensReviewedBy"> & { id?: string },
  allergenReviewConfirmed: boolean,
  reviewedByName: string = "Obrador Swing"
) {
  if (!productData.name.ca || !productData.name.es) {
    return { success: false, error: "El nom del producte és obligatori en català i castellà." };
  }

  // Section 12 requirement:
  // "The CMS blocks marking a product's allergens as 'reviewed' without an explicit confirmation"
  let reviewedAt: string | null = null;
  let reviewedBy: string | null = null;

  if (allergenReviewConfirmed) {
    reviewedAt = new Date().toISOString();
    reviewedBy = reviewedByName;
  }

  if (productData.id) {
    contentStore.updateProduct(productData.id, {
      ...productData,
      allergensReviewedAt: reviewedAt,
      allergensReviewedBy: reviewedBy,
    });
  } else {
    const newId = `prod-${Date.now()}`;
    contentStore.addProduct({
      id: newId,
      ...productData,
      allergensReviewedAt: reviewedAt,
      allergensReviewedBy: reviewedBy,
    });
  }

  safeRevalidate("/", "layout");
  return { success: true, message: "Producte desat correctament amb al·lèrgens registrats." };
}

export async function saveCampaignAction(campaignData: SeasonalCampaign) {
  if (campaignData.id && contentStore.getCampaigns().some((c) => c.id === campaignData.id)) {
    contentStore.updateCampaign(campaignData.id, campaignData);
  } else {
    contentStore.addCampaign({
      ...campaignData,
      id: campaignData.id || `camp-${Date.now()}`,
    });
  }

  safeRevalidate("/", "layout");
  return { success: true, message: "Campanya de temporada desada correctament." };
}

export async function saveBlogPostAction(postData: BlogPostItem) {
  if (postData.id && contentStore.getPosts().some((p) => p.id === postData.id)) {
    contentStore.updatePost(postData.id, postData);
  } else {
    contentStore.addPost({
      ...postData,
      id: postData.id || `post-${Date.now()}`,
    });
  }

  safeRevalidate("/", "layout");
  return { success: true, message: "Article del blog desat correctament." };
}

export async function saveFaqAction(faqData: FaqItem) {
  contentStore.addFaq({
    ...faqData,
    id: faqData.id || `faq-${Date.now()}`,
  });

  safeRevalidate("/", "layout");
  return { success: true, message: "Pregunta freqüent desada." };
}

export async function saveTestimonialAction(testimonialData: TestimonialItem) {
  contentStore.addTestimonial({
    ...testimonialData,
    id: testimonialData.id || `test-${Date.now()}`,
  });

  safeRevalidate("/", "layout");
  return { success: true, message: "Opinió de client desada amb consentiment." };
}

export interface SubmitInquiryInput {
  name: string;
  email: string;
  phone?: string;
  topic?: "GENERAL" | "CAKE_QUESTION" | "ALLERGEN_INFO" | "HOURS_VISIT";
  message: string;
  portions?: number;
  consent: boolean;
  honeypot?: string;
}

export async function submitInquiryAction(input: SubmitInquiryInput) {
  // 1. Bot check via honeypot
  if (input.honeypot && input.honeypot.trim().length > 0) {
    // Silently succeed for bots
    return { success: true, message: "Consulta rebuda." };
  }

  // 2. Validate consent
  if (!input.consent) {
    return {
      success: false,
      error: "Cal acceptar la política de privacitat per tramitar la consulta.",
    };
  }

  // 3. Validate required fields
  if (!input.name || !input.name.trim()) {
    return { success: false, error: "El nom és obligatori." };
  }
  if (!input.email || !input.email.includes("@")) {
    return { success: false, error: "Correu electrònic invàlid." };
  }
  if (!input.message || !input.message.trim()) {
    return { success: false, error: "El missatge no pot estar buit." };
  }

  const newInquiry = contentStore.addInquiry({
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    name: input.name.trim(),
    email: input.email.trim(),
    phone: (input.phone || "").trim(),
    topic: input.topic || "GENERAL",
    message: input.message.trim(),
    portions: input.portions,
    consentGiven: true,
    consentTimestamp: new Date().toISOString(),
    status: "NEW",
  });

  safeRevalidate("/admin");
  return {
    success: true,
    message: "Consulta enviada correctament. Et respondrem en menys de 24 hores.",
    inquiryId: newInquiry.id,
  };
}

export async function updateInquiryStatusAction(
  id: string,
  status: "NEW" | "IN_PROGRESS" | "DONE" | "ARCHIVED",
  staffNotes?: string
) {
  contentStore.updateInquiry(id, {
    status,
    ...(staffNotes !== undefined ? { staffNotes } : {}),
  });
  safeRevalidate("/admin");
  return { success: true, message: "Estat de la consulta actualitzat." };
}

export async function deleteInquiryAction(id: string) {
  contentStore.deleteInquiry(id);
  safeRevalidate("/admin");
  return { success: true, message: "Consulta eliminada del sistema." };
}

export async function deleteProductAction(id: string) {
  contentStore.deleteProduct(id);
  safeRevalidate("/", "layout");
  return { success: true, message: "Producte eliminat." };
}

export async function deleteCampaignAction(id: string) {
  contentStore.deleteCampaign(id);
  safeRevalidate("/", "layout");
  return { success: true, message: "Campanya eliminada." };
}

export async function deletePostAction(id: string) {
  contentStore.deletePost(id);
  safeRevalidate("/", "layout");
  return { success: true, message: "Article eliminat." };
}
