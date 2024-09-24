import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import * as validator from 'validator';
import { LoginType } from './auth.dto';

@ValidatorConstraint({ name: 'IsUsernameEmailOrNumber', async: false })
export class IsUsernameEmailOrNumber implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const object = args.object as any;

    if (typeof value !== 'string') {
      return false;
    }

    const loginType: LoginType = object.loginType;

    if (loginType === LoginType.EMAIL) {
      return validator.isEmail(value);
    } else if (loginType === LoginType.PHONE) {
      return validator.isNumeric(value);
    } else if (loginType === LoginType.USERNAME) {
      return validator.isAlphanumeric(value);
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const object = args.object as any;
    const loginType: LoginType = object.loginType;

    if (typeof args.value !== 'string') {
      return 'Username must be a string';
    }

    if (loginType === LoginType.EMAIL) {
      return 'Username must be a valid email address';
    } else if (loginType === LoginType.PHONE) {
      return 'Username must be a valid phone number';
    } else if (loginType === LoginType.USERNAME) {
      return 'Username must be a valid alphanumeric string';
    }

    return 'Invalid login type';
  }
}
