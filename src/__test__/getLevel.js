/* eslint-disable no-undef */
import getLevel from "../getLevel.js";
import fetchData from "../http.js";

jest.mock('../http.js');

beforeEach(() => {
    jest.resetAllMocks();
});

test('should call loadUser once', () => {
    fetchData.mockReturnValue(JSON.stringify({}));
    getLevel(1);
    expect(fetchData).toBeCalledWith('https://server/user/1');
});

beforeEach(() => {
    jest.resetAllMocks();
});

// test('should call loadUser once', () => {
//     const response = { status: 'ok', level: 100 };
//     const result = getLevel(fetchData.mockReturnValue(response))
//     expect(result).toBe('Ваш текущий уровень: 100');
// });


test.each([
    [{ status: 'ok', level: 100 }, 'Ваш текущий уровень: 100'],
    // ['silver', undefined],
    // ['regular', undefined],
    [{}, "Информация об уровне временно недоступна"],
])('testing getLevel with response = %s and expected = "%s"', (response, expected) => {
    const result = getLevel(fetchData.mockReturnValue(response))
    expect(result).toBe(expected);
})
