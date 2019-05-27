const isEmpty = require('../server/validation/isEmpty')

test('check isEmpty', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty(new Object(Object.prototype))).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty('      ')).toBe(true)
    expect(isEmpty(5)).toBe(false)
    expect(isEmpty([1, 2, 3])).toBe(false)
    expect(isEmpty({a: 1, b: 2})).toBe(false)
    expect(isEmpty('kadmfklsnd')).toBe(false)
})