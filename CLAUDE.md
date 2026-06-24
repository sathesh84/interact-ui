# Angular Project Rules & Standards

- **Version**: Angular 17+ (Strict TypeScript mode)
- **Architecture**: Standalone components only. Do NOT use NgModules.
- **State Management**: Use regular class properties and getters. No signals or computed().
- **Control Flow**: Use structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`). Import `NgIf`, `NgFor` from `@angular/common`.
- **Styling**: Standard CSS. Keep components modular.
