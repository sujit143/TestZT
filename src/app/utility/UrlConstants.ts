export class UrlConstants {
    private constructor(){}
    public static chatHubUrl = 'https://localhost:44335/chathub?MemberId={0}';
    public static baseAPIUrl = 'http://qaapi.zoomteams.com/api/';
    public static loginUrl = UrlConstants.baseAPIUrl.concat('Account/login?UserName={0}&Password={1}');

    public static apiRoot = 'http://qaapi.zoomteams.com/api/';
    // public static apiRoot = 'https://localhost:44335/api/';
    public static stsAuthority = "http://idpqa.zoomteams.com"; // "https://localhost:44352/";
  
    // public static apiRoot = 'http://localhost:2112/api/';
    // public static stsAuthority = 'http://localhost:4242/';
  
    //public static stsAuthority = 'https://softinsight.auth0.com/';
  
    public static clientId = 'ztngapp';
    //public static clientId = 'FVZYzaiuyFYR4bxPTtSriqNLgAE69Btn'; //softinsight
  
    public static clientRoot = 'http://localhost:4200/';
}