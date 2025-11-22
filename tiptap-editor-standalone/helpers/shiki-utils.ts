/**
 * Shiki Utilities
 * 
 * File này chứa các utility functions cho Shiki
 */

import { supportedLanguages } from "./shiki-config";

import type { SpecialLanguage } from "@shikijs/types";

/**
 * Lấy danh sách các ngôn ngữ được hỗ trợ dưới dạng array
 * @returns Mảng các object với label và value
 */
export function getSupportedLanguages() {
  return Object.entries(supportedLanguages).map(([key, value]) => ({
    label: value.name,
    value: key,
  }));
}

/**
 * Kiểm tra xem một ngôn ngữ có phải là special language không
 * Special languages là các ngôn ngữ đặc biệt như plaintext
 * @param lang - Tên ngôn ngữ cần kiểm tra
 * @returns true nếu là special language
 */
export function isSpecialLanguage(lang: string): lang is SpecialLanguage {
  const special = ["plaintext", "txt", "text", "plain", "ansi"];
  return special.includes(lang);
}

