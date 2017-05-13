import {LocalesService} from "../services/LocalesService";
import {Injectable} from "@angular/core";

@Injectable()
export class ErrorType {
  private formLocales;

  constructor(
    public localesService: LocalesService
  ) {

    this.formLocales = this.localesService.get_Forms_Locales();

  };

  getMessage(error:string): string{
    switch (error) {
      case "EMPTY_EMAIL":
        return this.formLocales.error.required_email;
      case "EMPTY_USERNAME":
        return this.formLocales.error.required_username;
      case "EMPTY_PASSWORD":
        return this.formLocales.error.required_password;
      case "EMPTY_DNI":
        return this.formLocales.error.required_dni;
      case "EMPTY_NAME":
        return this.formLocales.error.required_name;
      case "EMPTY_SURNAMES":
        return this.formLocales.error.required_surnames;
      case "EMPTY_ROLE":
        return this.formLocales.error.required_role;
      case "INVALID_EMAIL":
        return this.formLocales.error.format_email;
      case "INVALID_DNI":
        return this.formLocales.error.format_dni;
      case "INVALID_USERNAME":
        return this.formLocales.error.format_username;
      case "INVALID_ROLE":
        return this.formLocales.error.format_role;
      case "SHORT_USERNAME":
        return this.formLocales.error.short_username;
      case "SHORT_PASSWORD":
        return this.formLocales.error.format_password;
      case "LONG_USERNAME":
        return this.formLocales.error.large_username;
      case "EMAIL_EXISTS":
        return this.formLocales.error.email_exist;
      case "USERNAME_EXISTS":
        return this.formLocales.error.username_exist;
      case "DNI_EXISTS":
        return this.formLocales.error.dni_exist;
      default:
        break;
    }
    return "";
  }
}
