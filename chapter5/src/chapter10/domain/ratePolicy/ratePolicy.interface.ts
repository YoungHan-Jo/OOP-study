import { Money } from '../../value';
import { Phone } from '../phone/phone';

export interface RatePolicy {
  calculateFee(phone: Phone): Money;
}
