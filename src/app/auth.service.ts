import { Injectable } from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {JwksValidationHandler} from "angular-oauth2-oidc-jwks";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authConfig: AuthConfig = {
    issuer: environment.authUrl+'/auth/realms/webjynx',
    redirectUri: window.location.origin + "/heroes",
    clientId: 'test-ui',
    scope: 'acr email profile roles web-origins webjynx',
    responseType: 'code',
    disableAtHashCheck: true,
    showDebugInformation: environment.debug,
    requireHttps: false
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
