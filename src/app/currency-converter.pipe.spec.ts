import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConverter'
})
export class CurrencyConverterPipe implements PipeTransform {

  private rates = {
    USD: 1,
    EUR: 0.85,
    COP: 4100
  };

  transform(value: number, targetCurrency: string): number {
    const rate = this.rates[targetCurrency] || 1;
    return value * rate;
  }
}