import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotestComponent } from './totest.component';

describe('Test component using Cypress', () => {
 function mountDefault() {
   return cy
    .mount(TotestComponent, { autoSpyOutputs: true})
 }

 it("should render"), () => {
  mountDefault()
  cy.get('[data-cy="message"]')
    .should('be.visible')
    .should('contain',"It works!")
 }
});
