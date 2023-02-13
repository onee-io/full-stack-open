describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.contains('Matti Luukkainen logged in');
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'invalid username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
            cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })
    
        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('Google')
            cy.get('#author').type('google')
            cy.get('#url').type('https://google.com')
            cy.contains('create').click()
            cy.contains('a new blog Google by google added')
        })
      })
})