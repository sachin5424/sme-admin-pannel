import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { angularUIModule } from './shared/material-ui.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TextAuthInterceptor } from './_http/HttpInterceptor';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    // MyCkEditorComponent,
    HeaderComponent,
    NavigationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    // CKEditorModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ApppRoutingModule,
    angularUIModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TextAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
