import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'register-seller', component: RegisterComponent, data: { id: 1 } },
    { path: 'register-buyer', component: RegisterComponent, data: { id: 2 } },
    { path: '**', component: HomepageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})

export class AppRoutingModule { }
