export const errorHandlersInstances: { [key: string]: ErrorHandler } = {
    ValidationError: new ValidationErrorHandler(),
    UniqueConstraintError: new UniqueConstraintErrorHandler(),
    DatabaseError: new DatabaseErrorHandler(),
};