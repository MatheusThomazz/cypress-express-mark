/// <reference types= 'cypress'/>


Cypress.Commands.add('creatTask', (taskName = '') => {
    cy.visit('/')

    cy.get('input[placeholder="Add a new Task"]').as('inptuTask')

    if(taskName != ''){
        cy.get('@inptuTask')
            .type(taskName)
    }
    
    cy.contains('button', 'Create').click()

})

Cypress.Commands.add('isRequired', (targetMessage) => {
    cy.get('@inptuTask')
            .invoke('prop', 'validationMessage')
            .should((text) => {
                expect(targetMessage).to.eq(text)
            })
})

Cypress.Commands.add('removeTaskByName', (taskName) => {

    cy.request({
        url: Cypress.env('apiUrl') + '/helper/tasks',
        method: 'DELETE',
        body: {name: taskName}
    }).then(response => {
        expect(response.status).to.eq(204)
    })

})


Cypress.Commands.add('postTask', (task) => {

    cy.request({
        url: Cypress.env('apiUrl') + '/tasks',
        method: 'POST',
        body: {name: task.name, is_done: task.is_done}

    }).then(response => {
        expect(response.status).to.eq(201)

    })

})