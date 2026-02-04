import { CommonEnvironmentHelper, ApiHelper, Locale } from "@churchapps/apphelper";
import { EnvironmentHelper as WebsiteEnvironmentHelper } from "@churchapps/apphelper-website";

export class EnvironmentHelper {
  private static LessonsApi = "";
  static LessonsUrl = "";
  static B1Url = "";
  static ChurchAppsUrl = "";
  static Common = CommonEnvironmentHelper;

  static init = async () => {
    const stage = process.env.REACT_APP_STAGE;

    switch (stage) {
      case "staging":
        EnvironmentHelper.initStaging();
        break;
      case "prod":
        EnvironmentHelper.initProd();
        break;
      default:
        EnvironmentHelper.initDev();
        break;
    }
    EnvironmentHelper.Common.init(stage);
    EnvironmentHelper.applyEnvironmentOverrides();

    WebsiteEnvironmentHelper.init();
    ApiHelper.apiConfigs.push(
      {
        keyName: "ReportingApi",
        url: EnvironmentHelper.Common.ReportingApi,
        jwt: "",
        permissions: [],
      },
      {
        keyName: "LessonsApi",
        url: EnvironmentHelper.LessonsApi,
        jwt: "",
        permissions: [],
      },
      {
        keyName: "AskApi",
        url: EnvironmentHelper.Common.AskApi,
        jwt: "",
        permissions: [],
      }
    );

    await Locale.init([`/locales/{{lng}}.json?v=1`, `/apphelper/locales/{{lng}}.json`]);
  };

  static initLocal = async () => { };

  // Allow env-based API overrides in every stage, including prod builds.
  static applyEnvironmentOverrides = () => {
    EnvironmentHelper.Common.AttendanceApi = process.env.REACT_APP_ATTENDANCE_API || EnvironmentHelper.Common.AttendanceApi;
    EnvironmentHelper.Common.DoingApi = process.env.REACT_APP_DOING_API || EnvironmentHelper.Common.DoingApi;
    EnvironmentHelper.Common.GivingApi = process.env.REACT_APP_GIVING_API || EnvironmentHelper.Common.GivingApi;
    EnvironmentHelper.Common.MembershipApi = process.env.REACT_APP_MEMBERSHIP_API || EnvironmentHelper.Common.MembershipApi;
    EnvironmentHelper.Common.ReportingApi = process.env.REACT_APP_REPORTING_API || EnvironmentHelper.Common.ReportingApi;
    EnvironmentHelper.Common.MessagingApi = process.env.REACT_APP_MESSAGING_API || EnvironmentHelper.Common.MessagingApi;
    EnvironmentHelper.Common.MessagingApiSocket = process.env.REACT_APP_MESSAGING_API_SOCKET || EnvironmentHelper.Common.MessagingApiSocket;
    EnvironmentHelper.Common.ContentApi = process.env.REACT_APP_CONTENT_API || EnvironmentHelper.Common.ContentApi;
    EnvironmentHelper.Common.ContentRoot = process.env.REACT_APP_CONTENT_ROOT || EnvironmentHelper.Common.ContentRoot;
    EnvironmentHelper.Common.B1Root = process.env.REACT_APP_B1_ROOT || EnvironmentHelper.Common.B1Root;
    EnvironmentHelper.Common.B1AdminRoot = process.env.REACT_APP_B1ADMIN_ROOT || EnvironmentHelper.Common.B1AdminRoot;
    EnvironmentHelper.Common.LessonsRoot = process.env.REACT_APP_LESSONS_ROOT || EnvironmentHelper.Common.LessonsRoot;
    EnvironmentHelper.LessonsApi = process.env.REACT_APP_LESSONS_API || EnvironmentHelper.LessonsApi;
    EnvironmentHelper.B1Url = process.env.REACT_APP_B1_WEBSITE_URL || EnvironmentHelper.B1Url;
  };

  static initDev = () => {
    this.initStaging();
    EnvironmentHelper.LessonsApi = process.env.REACT_APP_LESSONS_API || EnvironmentHelper.LessonsApi;
    EnvironmentHelper.B1Url = process.env.REACT_APP_B1_WEBSITE_URL || EnvironmentHelper.B1Url;
  };

  //NOTE: None of these values are secret.
  static initStaging = () => {
    EnvironmentHelper.LessonsApi = "https://api.staging.lessons.church";
    EnvironmentHelper.LessonsUrl = "https://staging.lessons.church";
    EnvironmentHelper.B1Url = "https://{subdomain}.staging.b1.church";
  };

  //NOTE: None of these values are secret.
  static initProd = () => {
    EnvironmentHelper.Common.GoogleAnalyticsTag = "G-47N4XQJQJ5";
    EnvironmentHelper.LessonsApi = "https://api.lessons.church";
    EnvironmentHelper.LessonsUrl = "https://lessons.church";
    EnvironmentHelper.B1Url = "https://{subdomain}.b1.church";
  };
}
