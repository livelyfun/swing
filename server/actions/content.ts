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

  revalidatePath("/", "layout");
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

  revalidatePath("/", "layout");
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

  revalidatePath("/", "layout");
  return { success: true, message: "Article del blog desat correctament." };
}

export async function saveFaqAction(faqData: FaqItem) {
  contentStore.addFaq({
    ...faqData,
    id: faqData.id || `faq-${Date.now()}`,
  });

  revalidatePath("/", "layout");
  return { success: true, message: "Pregunta freqüent desada." };
}

export async function saveTestimonialAction(testimonialData: TestimonialItem) {
  contentStore.addTestimonial({
    ...testimonialData,
    id: testimonialData.id || `test-${Date.now()}`,
  });

  revalidatePath("/", "layout");
  return { success: true, message: "Opinió de client desada amb consentiment." };
}
