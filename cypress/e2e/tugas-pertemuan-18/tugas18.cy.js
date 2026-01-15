describe('Authorization API Testing Tugas 18', ()=>{
    
    it('Single User', ()=>{
        cy.request({
            method:'GET', 
            url:'https://reqres.in/api/users/2',
            headers:{ 'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"}
        }).then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
            })
    })
    it('Create Record', ()=>{
        cy.request({
            method:'POST', 
            url:'https://reqres.in/api/users',
            body:{
                "name":"dudu",
                "job":"QA"
            },
            headers:{
                'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"
            }
        }).then((response)=>{
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('name')
                expect(response.body).to.have.property('job')
            })
    })
    it('', ()=>{

    })
    it('', ()=>{

    })
    it('', ()=>{

    })
    it('', ()=>{

    })
    it('', ()=>{

    })
    it('', ()=>{

    })
    it('', ()=>{

    })

})

    