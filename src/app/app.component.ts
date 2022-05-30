import { Component } from '@angular/core';
import { OAuthService, NullValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/webjynx',
    redirectUri: window.location.origin + "/heroes",
    clientId: 'test-ui',
    scope: 'acr email profile roles web-origins webjynx',
    responseType: 'code',
    disableAtHashCheck: true,
    showDebugInformation: true
  }

  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.tokenValidationHandler = new  JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  public logoff() {
    this.oauthService.revokeTokenAndLogout();
  }

  public isLoggedIn(){
    return this.oauthService.hasValidIdToken() || this.oauthService.hasValidAccessToken();
  }
}
