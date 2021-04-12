import { generateList } from '../list';

test('should generate a list', () => {
    // ARRANGE - Preparação do ambiente;
    const amount = 5;

    // ACT
    const result = generateList(amount);

    // ASSERT
    const expected = [0, 1, 2, 3, 4];
    expect(result).toEqual(expected);
});

test('should generate an empty list when amount is zero', () => {
    const amount = 0;
    const result = generateList(amount);
    expect(result).toEqual([]);
});