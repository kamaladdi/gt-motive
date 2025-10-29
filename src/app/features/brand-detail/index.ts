/**
 * Public API for the brand-detail feature.
 *
 * This is the feature's entry point that exports only what's needed
 * by the application configuration and other features.
 *
 * Following hexagonal architecture principles:
 * - Export the reducer and effects for app configuration
 * - Export the page component for routing
 * - Keep internal implementation details private
 */

// Store configuration (needed for app.config.ts)
export { brandDetailReducer } from './infrastructure/store/reducers/brand-detail.reducer';
export { BrandDetailEffects } from './infrastructure/store/effects/brand-detail.effects';

// UI Component (needed for routing)
export { BrandDetailPageComponent } from './adapters/ui/brand-detail-page.component';

// Domain models (if needed by other features)
export type { VehicleType } from './domain/models/vehicle-type.model';
export type { VehicleModel } from './domain/models/vehicle-model.model';
