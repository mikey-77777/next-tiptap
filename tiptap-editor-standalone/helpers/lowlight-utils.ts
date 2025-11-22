/**
 * Lowlight Utilities
 * 
 * File này chứa các utility functions cho lowlight
 */

import { supportedLanguages } from "./lowlight-config";

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

