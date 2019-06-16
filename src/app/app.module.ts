import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CrudService } from './shared/services/crud.service';
import { MaterialModule } from './material.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { ActivitySelectorComponent } from './shared/components/activity-selector/activity-selector.component';
import { OnlyNumberDirective } from './shared/directives/only-number.directive';

@NgModule({
    declarations: [AppComponent, HomepageComponent, RegisterComponent, ActivitySelectorComponent, OnlyNumberDirective],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        TextMaskModule,
        AppRoutingModule,
    ],
    providers: [CrudService],
    entryComponents: [ActivitySelectorComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
