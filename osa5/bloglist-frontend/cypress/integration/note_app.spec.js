describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.visit('http://localhost:3000') 
    })
  
    it('Login form is shown', function() {
        cy.contains('username')
        cy.contains('password')
        cy.get('form').contains('login')
    })
  })

describe('Login',function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
      })

    it('succeeds with correct credentials', function() {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
    
        cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
    
        cy.contains('invalid credentials')
    })
})


describe('When logged in', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)

        cy.request('POST', 'http://localhost:3003/api/login', {
            username: 'mluukkai', password: 'salainen'
        }).then(response => {
            localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
            cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function() {
        cy.get('#create-button').click()
        
        cy.get('#title').type('Testiblogi')
        cy.get('#author').type('Testaaja')
        cy.get('#url').type('testi.com')
        cy.get('#save-button').click()

        cy.contains('a new blog Testiblogi by Testaaja added!')
        cy.visit('http://localhost:3000')
        cy.contains('Testiblogi by Testaaja')


    })

    it('Created blog can be liked', function() {
        cy.get('#create-button').click()
        
        cy.get('#title').type('Testiblogi')
        cy.get('#author').type('Testaaja')
        cy.get('#url').type('testi.com')
        cy.get('#save-button').click()

        cy.get('#view-button').click()
        cy.get('#like-button').click()

        cy.contains('1')
    })

    it('Created blog can be deleted', function() {
        cy.get('#create-button').click()
        
        cy.get('#title').type('Testiblogi')
        cy.get('#author').type('Testaaja')
        cy.get('#url').type('testi.com')
        cy.get('#save-button').click()

        cy.visit('http://localhost:3000')
        cy.get('#view-button').click()
        cy.get('#delete-button').click()
        cy.on('window:confirm', () => true)

        cy.contains('blog Testiblogi was deleted!')
        cy.visit('http://localhost:3000')
        cy.get('html').should('not.contain', 'Testiblogi by Testaaja')


    })

  })
