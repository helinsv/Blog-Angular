import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ROUTER_INITIALIZER } from '@angular/router';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from '../admin/dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CanActivateGuard } from './shared/servises/can.activate.guard';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: '', pathMatch: 'full', redirectTo: '/admin/login' },
          { path: 'login', component: LoginPageComponent },
          { path: 'dashboard', component: DashboardPageComponent, canActivate: [CanActivateGuard] },
          { path: 'post/:id/edit', component: EditPageComponent, canActivate: [CanActivateGuard] },
          { path: 'create', component: CreatePageComponent, canActivate: [CanActivateGuard] }
        ]
      }
    ]),

  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanActivateGuard
  ]
})
export class AdminModule { }
