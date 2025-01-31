const math = require('./math')

test(`add 3 + 4 to equal 7`, () =>{
    const result = math.sum(3,4)
    expect(result).toBe(7)
})

console.log(math.sum(3,4))

