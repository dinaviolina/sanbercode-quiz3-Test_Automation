const data = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Doe', age: 25 },
  { id: 3, name: 'Jim Brown', age: 35 }
]

data.forEach((item) => {
  cy.request('GET', `https://jsonplaceholder.typicode.com/posts/${item.id}`)
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(item.id)
      expect(response.body.title).to.not.be.null
    })
})
// Contoh Parameterisasi Menggunakan Cypress:

const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a,b) => a / b
}

Object.entries(calculator).forEach(([name, fn]) => {
  cy.request('POST', 'https://httpbin.org/post', {
    operation: name,
    num1: 2,
    num2: 2
  })
  .then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body.json.args.operation).to.eq(name)
    expect(response.body.json.args.num1).to.eq(2)
    expect(response.body.json.args.num2).to.eq(2)
    expect(response.body.json.data.result).to.eq(fn(2, 2))
  })
