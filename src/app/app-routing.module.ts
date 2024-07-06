import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { CreditFormComponent } from './credit-form/credit-form.component';

const routes: Routes = [];

@NgModule({
  imports: [
      RouterModule.forRoot([
          {
              path: '', component: AppLayoutComponent,
              children: [
                  { path: 'credit', component:CreditFormComponent },
                  
                 
              ]
          },
          { path: '**', redirectTo: '/notfound' },
      ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
