/**
 * Public API for the brands feature.
 * This is the entry point for consuming the brands feature from outside.
 *
 * Following hexagonal architecture principles:
 * - Only expose what's necessary for integration
 * - Hide internal implementation details
 * - Provide clear boundaries for the feature
 */

// Domain models (can be shared if needed)
export * from './domain/models/manufacturer.model';

// Application layer use cases (input ports)
export * from './application/use-cases/load-manufacturers.use-case';
export * from './application/use-cases/search-manufacturers.use-case';

// UI components (for routing)
export { BrandsPageComponent } from './adapters/ui/brands-page.component';

// Store infrastructure (for app configuration)
export { manufacturersReducer } from './infrastructure/store/reducers/manufacturers.reducer';
export { ManufacturersEffects } from './infrastructure/store/effects/manufacturers.effects';
export type { ManufacturersState } from './infrastructure/store/state/manufacturers.state';
