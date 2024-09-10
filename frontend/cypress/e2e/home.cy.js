describe('homepage tests', () => {

  it('visits my hosted project website', () => {
    cy.visit('https://empowered-voice.vercel.app/')
  })
  
  
  it('finds the content Candidates', () => {
    cy.visit('https://empowered-voice.vercel.app/')
    cy.contains('Candidates')
  })
  

  it('finds the content About', () => {
    cy.visit('https://empowered-voice.vercel.app/')
    cy.contains('About')
  })

  it('finds the content Elections', () => {
    cy.visit('https://empowered-voice.vercel.app/')
    cy.contains('Elections')
  })

  it('finds the content FAQ', () => {
    cy.visit('https://empowered-voice.vercel.app/')
    cy.contains('FAQ')
  })

})