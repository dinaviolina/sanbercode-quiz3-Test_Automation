// Buatlah automation API menggunakan cypress pada website https://reqres.in/ minimal 7 request.
describe('API Automation using Cypress - Tugas 18', ()=>{
    it('1. Single User', ()=>{
        cy.request({
            method:'GET', 
            url:'https://reqres.in/api/users/2',
            headers:{ 'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"}
        }).then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body.data).to.have.property('id', 2)
                expect(response.body).to.have.property('data')
            })
    })
    it('2. Fetch Records', ()=>{
        cy.request({
            method:'GET',
            url:'https://reqres.in/api/users?page=2',
            
            headers:{'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"}
        }).then((response)=>{
            expect(response.status).to.eq(200)

        })
    })
    it('3. Delayed response', ()=>{
        cy.request({
            method:'GET',
            url:'https://reqres.in/api/users?delay=3',
            
            headers:{'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"}
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('data')
        })
    })

    it('4. Create Record', ()=>{
        cy.request({
            method:'POST', 
            url:'https://reqres.in/api/users',
            body:{
                "name":"Dina Violina, S.Kom., M.Kom",
                "job":"QA"
            },
            headers:{
                'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"
            }
        }).then((response)=>{
                expect(response.status).to.eq(201)
                // expect(response.body).to.have.property('name','Dina Violina, S.Kom., M.Kom')
                // expect(response.body).to.have.property('job')
            })
    })
    it('5. Verify Session', ()=>{
        cy.request({
            method:'POST',
            url:'https://reqres.in/api/login',
            body:{
    "email": "eve.holt@reqres.in",
    "password": "dinasukses"
},
            headers:{'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"}
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('token')
            expect(response.body.token).to.be.a('string')
            

        })
    })
    
    it('6. Create Record', ()=>{
        cy.request({
            method:'POST',
            url:'https://reqres.in/api/users',
            body:{
                
    "name": "purwowidodo",
    "job": "leader"

            },
            headers:{'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"}
        }).then((response)=>{
            expect(response.status).to.eq(201)

        })
    })
    it('7. Register - unsuccessfull', ()=>{
        cy.request({
            method:'POST',
            url:'https://reqres.in/api/register',
            failOnStatusCode: false,
            body:{
                "email":"dinabid@gmail.com"
            },
            headers:{'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"}
        }).then((response)=>{
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('error')
            expect(response.body.error).to.eq('Missing password')

        })
    })
    it('8. Login - unsuccessfull', ()=>{
        cy.request({
            method:'POST',
             failOnStatusCode: false,
            url:'https://reqres.in/api/login',
            body:{
                "email": "peter@klaven"
            },
            headers:{'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"}
        }).then((response)=>{
            expect(response.status).to.eq(400)
            // expect(response.body.error).to.eq('Missing password, check ya')

        })
    })
    
    it('9. Single user not found ', ()=>{
        cy.request({
            method:'GET',
            url:'https://reqres.in/api/users/23',
            failOnStatusCode: false,
            headers:{'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"}
        }).then((response)=>{
            expect(response.status).to.eq(404)
            expect(response.body).to.be.empty
        })

    })
    it('10. Single <resource>', ()=>{
        cy.request({
            method:'GET',
            url:'https://reqres.in/api/unknown/2',
            headers:{'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"}

        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('data')
            expect(response.body.data).to.have.property('id', 2)
            expect(response.body.data).to.have.property('name')
            expect(response.body.data).to.have.property('year')
        })

    })

    it('11. Single <resource> not found', ()=>{
        cy.request({
            method:'GET',
            url:'https://reqres.in/api/unknown/23',
             failOnStatusCode: false,
            headers:{'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"}

        }).then((response)=>{
            expect(response.status).to.eq(404)
            expect(response.body).to.be.empty
        })
    })
    
    it('12. Update User', ()=>{
         cy.request({
            method:'PUT',
            url:'https://reqres.in/api/users/2',
            body:{
                "name":"Dina Violina",
                "job":"QA Engineer"
            },
            headers:{'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"}
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('job')
        })
    })

    it('13. Delete User', ()=>{
        cy.request({
            method:'DELETE',
            url:'https://reqres.in/api/users/2',
            headers:{'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"}
        }).then((response)=>{
            expect(response.status).to.eq(204)
        })
    })
    it('14. Patch Update User', ()=>{
        cy.request({
            method:'PATCH',
            url:'https://reqres.in/api/users/2',
            body:{
                
                "job":"Direktur"
            },
            headers:{'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"}
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('job','Direktur')
            expect(response.body).to.have.property('updatedAt')
        })
    })
    it('15. List resource', ()=>{
        cy.request({
            method:'GET',
            url:'https://reqres.in/api/unknown',
            
            headers:{'x-api-key':"reqres_fb6834692dd24d89a6038287d22bb188"}
        }).then((response)=>{
            expect(response.status).to.eq(200)
            
        })
    })

})

    