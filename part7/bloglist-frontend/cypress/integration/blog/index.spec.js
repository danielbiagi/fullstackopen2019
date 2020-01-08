describe('Blog app', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('username:')
  })

  it('front page contains random text', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login')
  })

  it('logging in with wrong credentials', function() {
    cy.get('input')
      .first()
      .type('username')
      .should('have.value', 'username')
    cy.get('input')
      .last()
      .type('password')
      .should('have.value', 'password')
    cy.get('button')
      .last()
      .click()
      .should('have.text', 'login')
  })

  it('logging in with correct credentials', function() {
    cy.visit('http://localhost:3000')
    cy.get('input')
      .first()
      .type('hihihi')
      .should('have.value', 'hihihi')
    cy.get('input')
      .last()
      .type('hohoho')
      .should('have.value', 'hohoho')
    cy.get('button')
      .last()
      .click()
    cy.get('button').should('not.have.text', 'login')
  })

  it('clicking thru nav items', function() {
    cy.get('a')
      .last()
      .should('have.text', 'users')
      .click()
    cy.get('a')
      .first()
      .should('have.text', 'home')
      .click()
  })

  it('create a new blog', function() {
    cy.get('button').each(($el, index, $list) => {
      if (index === 1) {
        cy.wrap($el).click()
      }
    })
    cy.get('input').each(($el, index, $list) => {
      if (index === 0) {
        cy.wrap($el).type('this is a new blog title')
      } else if (index === 1) {
        cy.wrap($el).type('cypress testing')
      } else {
        cy.wrap($el).type('http://www.google.com{enter}')
      }
    })
  })
  it('liking a blog', function() {
    cy.get('p')
      .last()
      .should('have.contain.text', 'this is a new blog title')
      .click()

    cy.get('.details', {timeout: 3000})
      .find('.pointing')
      .first()
      .should('have.contain.text', '0')
      .click()
      .should('have.contain.text', '1')
  })

  it('removing a blog', function() {
    cy.get('.details')
      .find('.negative')
      .click()
    cy.get('p').should('not.contain.text', 'this is a new blog title')
  })
})
