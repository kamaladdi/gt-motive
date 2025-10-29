import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'brands',
    pathMatch: 'full',
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brands/adapters/ui/brands-page.component').then(
        (m) => m.BrandsPageComponent
      ),
  },
  {
    path: 'brand/:makeName',
    loadComponent: () =>
      import('./features/brand-detail/adapters/ui/brand-detail-page.component').then(
        (m) => m.BrandDetailPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'brands',
  },
];
