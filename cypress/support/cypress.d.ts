import "./commands";

declare global {
    namespace Cypress {
        interface Chainable {
            dragAndDrop(sourceSelector: string, targetSelector: string): void;
            fillConstructor(): void;
            checkModal(): void;
        }
    }
}
