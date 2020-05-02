export class Settings {

  private static baseUrl = 'autofficina-abm.it';
  // private static baseUrl = '192.168.1.7';

  private static httpsPort = '8080';

  public static get API_ENDPOINT(): string {
    return 'http://' + Settings.baseUrl + ':' + Settings.httpsPort + '/autofficina-1.0-SNAPSHOT/';
  }
  public static get API_REST_ENDPOINT(): string {
    return 'http://' + Settings.baseUrl + ':' + Settings.httpsPort + '/autofficina-1.0-SNAPSHOT/rest';
  }

}
