import { formatPrice } from 'util/formatters';

describe('formatePrice tests', () => {
    test('should format number pt-BR when given 10.1', () => {
        const result = formatPrice(10.1);
        expect(result).toEqual('10,10');
    });

    test('should format number pt-BR when given 0', () => {
        const result = formatPrice(0);
        expect(result).toEqual('0,00');
    });
});
