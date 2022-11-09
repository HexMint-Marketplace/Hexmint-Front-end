describe('User', () => {

  it('Connect Wallet', () => {
    cy.visit('http://localhost:3000/home')
    cy.contains('Connect Wallet').click()
    })


  it('View Home page', () => {
  cy.visit('http://localhost:3000/home')
    
  })

  it('Explore Collections', () => {
    cy.visit('http://localhost:3000/home')
    cy.contains('Explore').click()
    
  })

  it('View a Collection', () => {
    cy.visit('http://localhost:3000/home')
    cy.contains('Explore').click()
    
  })

  it('View a NFT', () => {
    cy.visit('http://localhost:3000/home')
    cy.contains('Explore').click()
    
  })
})