describe('User', () => {

  it('Succesfull Loads', () => {

    cy.visit('http://localhost:3000')

  })

  it('Connect Wallet', () => {

    cy.visit('http://localhost:3000/home')
    cy.contains('Connect Wallet').click()

    })

  it('View Home page', () => {
    
  cy.visit('http://localhost:3000/home')
    
  })

  it('Redirect to 404 page if url is wrong', () => {

    cy.visit('http://localhost:3000/sdbsbds')

  })

  it('Redirect to 404 page if the user not connected to the system and try to mint to NFT using url', () => {

    cy.visit('http://localhost:3000/mint')

  })

  it('HeXmint logo renders', () => {

    cy.visit('http://localhost:3000/home')
    cy.get('h2').contains('HeXmint')
    
  })

  it('HeXmint logo redirects to home page', () => {

    cy.visit('http://localhost:3000/home')
    cy.get('h2').contains('HeXmint').click()
    cy.url().should('include', '/home')

  })

  it('Redirect to home page from 404 page works', () => {

    cy.visit('http://localhost:3000/sdbsbds')
    cy.contains('Home').click()
    cy.url().should('include', '/home')

  })

  it('How it works title renders', () => {
      
      cy.visit('http://localhost:3000/home')
      cy.contains('h1', 'How It Works')
  
  })

  it('Banner Image renders', () => {

    cy.visit('http://localhost:3000/home')
    cy.get('img').should('have.attr', 'alt').should('include', 'bannerImage')

  })

  it('Mint button renders', () => {

    cy.visit('http://localhost:3000/home')
    cy.contains('Create').should('be.visible')

  })

  it('Explore button renders', () => {
      
      cy.visit('http://localhost:3000/home')
      cy.contains('Explore').should('be.visible')
  
  })

  it('Explore title in home page renders', () => {

    cy.visit('http://localhost:3000/home')
    cy.contains('h3', 'Explore')

  })

  it('Best Sellers title in home page renders', () => {

    cy.visit('http://localhost:3000/home')
    cy.contains('h3', 'Top Sellers')

  })

  it('Best Sellers title in home page renders', () => {

    cy.visit('http://localhost:3000/home')
    cy.contains('h3', 'Top Buyers')

  })

  it('Service section renders', () => {

    cy.visit('http://localhost:3000/home')
    cy.contains('h3', 'Create and Sell your NFTS')

  })

  it('Footer HeXmint logo rendrs', () => {
      
      cy.visit('http://localhost:3000/home')
      cy.contains('h2', 'HeXmint')
  
  })

  it('Footer HeXmint logo redirects to home page', () => {
      
      cy.visit('http://localhost:3000/home')
      cy.contains('h2', 'HeXmint').click()
      cy.url().should('include', '/home')
  
    })

  it('Footer Description text renders', () => {

    cy.visit('http://localhost:3000/home')
    cy.contains('For any inquiries :')

  })

})