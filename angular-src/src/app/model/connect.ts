export class Connect {
    private static hostUrl = 'https://oralhealthstatuscheck.com';
    public static readonly USER_TOKEN = 'user_token';
    static getHostUrl():string {
      return this.hostUrl;
    }
  }