# Bank to Payment Method Refactoring Guide

## Overview
This guide documents the refactoring of the confusing "Bank" naming to more appropriate "Payment Method" naming throughout the codebase. The previous naming was misleading because the API handled both "BANK" and "PAY" types, but everything was named as if it only handled banks.

## What Changed

### 1. File Structure
```
Old Structure:
- src/types/bank.types.ts
- src/services/bank.services.ts
- src/queries/bank.queries.ts

New Structure:
- src/types/payment-method.types.ts
- src/services/payment-method.services.ts
- src/queries/payment-method.queries.ts
- src/types/bank.types.ts (deprecated re-export)
- src/services/bank.services.ts (deprecated re-export)
- src/queries/bank.queries.ts (deprecated re-export)
```

### 2. Type Names
```typescript
// Old Types (now deprecated)
type CreateUpdateBankPayload
interface Bank
interface BanksResponse
interface BankResponse
type GetBankListPayload

// New Types
type CreateUpdatePaymentMethodPayload
interface PaymentMethod
interface PaymentMethodsResponse
interface PaymentMethodResponse
type GetPaymentMethodListPayload
```

### 3. API Endpoints
```typescript
// Old Endpoints (still supported for backward compatibility)
export const bankEndpoints = {
  banks: "/banks",
};

// New Endpoints
export const paymentMethodEndpoints = {
  paymentMethods: "/payment-methods",
};
```

### 4. Service Functions
```typescript
// Old Services (now deprecated)
getBanks()
createBank()
updateBank()
deleteBank()
getBankById()

// New Services
getPaymentMethods()
createPaymentMethod()
updatePaymentMethod()
deletePaymentMethod()
getPaymentMethodById()
```

### 5. React Query Hooks
```typescript
// Old Hooks (now deprecated)
useGetBanks()
useCreateBank()
useUpdateBank()
useDeleteBank()
useGetBankById()

// New Hooks
useGetPaymentMethods()
useCreatePaymentMethod()
useUpdatePaymentMethod()
useDeletePaymentMethod()
useGetPaymentMethodById()
```

## Migration Guide

### For Frontend Development

#### 1. Update Imports
```typescript
// Old way (still works but deprecated)
import { useGetBanks, useCreateBank } from '@/queries/bank.queries';
import { CreateUpdateBankPayload } from '@/types/bank.types';

// New way (recommended)
import { useGetPaymentMethods, useCreatePaymentMethod } from '@/queries/payment-method.queries';
import { CreateUpdatePaymentMethodPayload } from '@/types/payment-method.types';
```

#### 2. Update Hook Usage
```typescript
// Old way
const { data: banks } = useGetBanks();
const createBankMutation = useCreateBank(form);

// New way
const { data: paymentMethods } = useGetPaymentMethods();
const createPaymentMethodMutation = useCreatePaymentMethod(form);
```

#### 3. Update Type Usage
```typescript
// Old way
const [formData, setFormData] = useState<CreateUpdateBankPayload>({
  accountType: "BANK",
  // ... other fields
});

// New way
const [formData, setFormData] = useState<CreateUpdatePaymentMethodPayload>({
  accountType: "BANK", // Still supports both "BANK" and "PAY"
  // ... other fields
});
```

### For Backend Development

#### 1. Update API Endpoints
```typescript
// Old endpoint (still supported)
app.get('/banks', getBanksHandler);
app.post('/banks', createBankHandler);
app.put('/banks/:id', updateBankHandler);
app.delete('/banks/:id', deleteBankHandler);

// New endpoint (recommended)
app.get('/payment-methods', getPaymentMethodsHandler);
app.post('/payment-methods', createPaymentMethodHandler);
app.put('/payment-methods/:id', updatePaymentMethodHandler);
app.delete('/payment-methods/:id', deletePaymentMethodHandler);
```

#### 2. Update Database Models
```typescript
// Old model names
BankModel
BankSchema

// New model names
PaymentMethodModel
PaymentMethodSchema
```

## Usage Examples

### Creating a Payment Method
```typescript
import { useCreatePaymentMethod } from '@/queries/payment-method.queries';
import { CreateUpdatePaymentMethodPayload } from '@/types/payment-method.types';

const MyComponent = () => {
  const form = useForm<CreateUpdatePaymentMethodPayload>();
  const createPaymentMethodMutation = useCreatePaymentMethod(form);

  const handleSubmit = (data: CreateUpdatePaymentMethodPayload) => {
    createPaymentMethodMutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      {/* Form fields */}
    </form>
  );
};
```

### Fetching Payment Methods
```typescript
import { useGetPaymentMethods } from '@/queries/payment-method.queries';

const PaymentMethodsList = () => {
  const { data: paymentMethods, isLoading, error } = useGetPaymentMethods();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading payment methods</div>;

  return (
    <div>
      {paymentMethods?.data?.map((method) => (
        <div key={method.id}>
          <h3>{method.name}</h3>
          <p>Type: {method.accountType}</p>
          <p>Account: {method.accountName}</p>
        </div>
      ))}
    </div>
  );
};
```

### Updating a Payment Method
```typescript
import { useUpdatePaymentMethod } from '@/queries/payment-method.queries';

const EditPaymentMethod = ({ paymentMethodId }: { paymentMethodId: number }) => {
  const updatePaymentMethodMutation = useUpdatePaymentMethod();

  const handleUpdate = (data: CreateUpdatePaymentMethodPayload) => {
    updatePaymentMethodMutation.mutate({
      id: paymentMethodId,
      payload: data,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      {/* Form fields */}
    </form>
  );
};
```

### Deleting a Payment Method
```typescript
import { useDeletePaymentMethod } from '@/queries/payment-method.queries';

const DeletePaymentMethodButton = ({ paymentMethodId }: { paymentMethodId: number }) => {
  const deletePaymentMethodMutation = useDeletePaymentMethod();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this payment method?')) {
      deletePaymentMethodMutation.mutate(paymentMethodId);
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete Payment Method
    </button>
  );
};
```

## Backward Compatibility

All old APIs, types, and hooks are still available and functional. They now:
1. Re-export from the new implementations
2. Show deprecation warnings in the console
3. Work exactly as before

This ensures:
- No breaking changes for existing code
- Gradual migration is possible
- Both old and new naming can coexist temporarily

## Benefits of the Refactoring

1. **Clearer naming**: "Payment Method" better represents what the API actually handles
2. **Better maintainability**: Code is easier to understand and maintain
3. **Flexibility**: Better supports both "BANK" and "PAY" types conceptually
4. **Consistency**: Naming now matches the actual functionality
5. **Future-proof**: Easier to add new payment types in the future

## Next Steps

1. **Frontend**: Gradually migrate components to use the new payment method APIs
2. **Backend**: Update your API endpoints to use `/payment-methods` instead of `/banks`
3. **Database**: Consider renaming database tables/models for consistency
4. **Documentation**: Update API documentation to reflect the new naming
5. **Testing**: Update tests to use the new naming conventions

## Timeline

- **Phase 1** (Completed): Frontend refactoring with backward compatibility
- **Phase 2** (Recommended): Backend API endpoint migration
- **Phase 3** (Future): Remove deprecated APIs and types
- **Phase 4** (Future): Database schema migration

Remember: Take your time with this migration. The backward compatibility ensures nothing will break while you transition to the new naming convention.
