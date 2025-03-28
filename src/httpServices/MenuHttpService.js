import { httpService } from "./HttpService";
import { AppConstants } from "../constants/AppConstants";

export const MenuHttpService = {

    async GetMenuInfo(lang, menuId) {
    try {
      const response = await httpService.post(`${AppConstants.MenuInfo()}?language=${encodeURIComponent(lang)}&id=${encodeURIComponent(menuId)}`);
      return response.data;
    } catch (error) {
      console.error("Error during loading localized menu:", error);
      throw error;
    }
  },
};
