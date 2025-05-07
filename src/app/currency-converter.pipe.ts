import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConverter',
  standalone: true
})
export class CurrencyConverterPipe implements PipeTransform {
  transform(value: number, currency: string = 'USD'): string {
    if (value === null || value === undefined) {
      return '';
    }
    
    let symbol = '$';
    if (currency === 'EUR') {
      symbol = '€';
    } else if (currency === 'GBP') {
      symbol = '£';
    }
    
    return `${symbol}${value.toFixed(2)}`;
  }
}
