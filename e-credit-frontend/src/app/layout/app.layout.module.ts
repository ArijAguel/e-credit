import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppLayoutComponent } from "./app.layout.component";


@NgModule({
    declarations: [
        AppTopBarComponent,
        AppFooterComponent,
        AppLayoutComponent,
        
    ],
    imports: [

        BrowserAnimationsModule,
        RouterModule,
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
