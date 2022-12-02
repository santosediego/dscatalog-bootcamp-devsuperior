import { formatPrice } from "util/formatters";

test('formatPric should format number pt-BR when given 10.1', () => {

    const result = formatPrice(10.1);
    expect(result).toEqual("10,10");
})