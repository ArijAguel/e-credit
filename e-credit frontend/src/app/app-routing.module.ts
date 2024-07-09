import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { CreditFormComponent } from './credit-form/credit-form.component';
import { ConsultationComponent } from './consultation/consultation.component';

const routes: Routes = [];

@NgModule({
  imports: [
      RouterModule.forRoot([
          {
              path: '', component: AppLayoutComponent,
              children: [
                  { path: 'demande-credit', component:CreditFormComponent },
                  { path: 'consultation-credit', component:ConsultationComponent },
                  
                  
                 
              ]
          },
          { path: '**', redirectTo: '/notfound' },
      ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
