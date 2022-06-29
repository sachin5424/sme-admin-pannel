import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { HeaderComponent } from './header/header.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then((category) => category.CategoryModule),
    canActivate:[AdminGuard]
  },
  {
    path: 'author',
    canActivate:[AdminGuard],
    loadChildren: () => import('./author/author.module').then((m) => m.AuthorModule)
  },
  {
    path: 'news',
    canActivate:[AdminGuard],
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
  },
  {
    path: 'comment',
    canActivate:[AdminGuard],
    loadChildren: () => import('./comment/comment.module').then(m => m.CommentModule)
  },
  {
    path: 'test-ads',
    canActivate:[AdminGuard],
    loadChildren:()=> import('./ads/ads.module').then((m=>m.AdsModule))
  },
  {
    path: 'video',
    canActivate:[AdminGuard],
    loadChildren:() => import('./videos/videos.module').then(m => m.VideosModule)
  }
  ,
  {
    path: 'magazine',
    canActivate:[AdminGuard],
    loadChildren: () => import('./magazine/magazine.module').then(m=>m.MagazineModule)
  },
  {
    path: 'contact-us',
    canActivate:[AdminGuard],
    loadChildren: () => import('./contact-us/contact-us.module')
    .then((m)=>m.ContactUsModule)
  },
  
  { path: '**', redirectTo: 'admin', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class ApppRoutingModule { }
