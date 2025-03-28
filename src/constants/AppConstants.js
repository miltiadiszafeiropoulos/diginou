const AppConstants = {
    // change whatever needs...
    ENVIROMENT: "ENV_SERVER",
    TEST: "ENV_DEVELOPMENT",
  
    ENV_SERVER: "ENV_SERVER",
    ENV_PRODUCTION: "ENV_PRODUCTION",
    ENV_STAGING: "ENV_STAGING",
    ENV_DEVELOPMENT: "ENV_DEVELOPMENT",
    GOOGLE_URL: "https://panel-beta.diginou.com/api/v1/User/GoogleLogin?appId=USERAPP",
  
    GetUrl() {
      switch (this.ENVIROMENT) {
        case this.ENV_PRODUCTION:
          return "https://panel.diginou.com";
        case this.ENV_STAGING:
          return "https://panel-beta.diginou.com";
        case this.ENV_SERVER:
          return "https://server-beta.diginou.com";
        default:
          return "http://localhost:3030";
      }
    },
  
    ReturnUrl() {
      switch (this.TEST) {
        case this.ENV_PRODUCTION:
          return "https://panel.diginou.com";
        case this.ENV_STAGING:
          return "https://panel-beta.diginou.com";
        default:
          return "http://localhost:3000";
      }
    },
  
    // MENU
    MenuInfo() {
      return this.GetUrl() + "/api/v1/Menu/GetByIdForApp"; // Use "this" for method calls
    },

    // ANALYTICS
    Track() {
      return this.GetUrl() + "/api/v1/Analytics/track"; // Use "this" for method calls
    },
  };

  const DefaultImages = {
    DEFAULT_IMAGE_STORE : "https://files-beta.diginou.com/uploads/default_images/default_square_v3.png",
    DEFAULT_IMAGE_MENU : "https://files-beta.diginou.com/uploads/default_images/default_horizontal_v3.png",
    DEFAULT_IMAGE_PRODUCTS : "https://files-beta.diginou.com/uploads/default_images/default_square_v3.png",
    DEFAULT_IMAGE_PROFILE_LIGHT : "https://files-beta.diginou.com/uploads/default_images/default_profile_v2.png",
    DEFAULT_IMAGE_PROFILE_DARK : "https://files-beta.diginou.com/uploads/default_images/default_profile_v3.png",

};

export { AppConstants, DefaultImages };

  
  