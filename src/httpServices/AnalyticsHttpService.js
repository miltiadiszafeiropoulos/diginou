import { httpService } from "./HttpService";
import { AppConstants } from "../constants/AppConstants";

export const AnalyticsHttpService = {

    async TrackAnalytics(formdata) {
    try {
        const response = await httpService.post(`${AppConstants.Track()}`, formdata);
        return response.data;
    } catch (error) {
      console.error("Error during track:", error);
      throw error;
    }
  },
};
