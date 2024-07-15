# AuthController

The `AuthController` handles user authentication and profile management, including user registration, login, and profile updates.

## Methods

### `register(req: Request, res: Response, next: NextFunction): Promise<void>`

Handles user registration.

- **Request**: 
  - `POST /register`
  - Body: 
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **Response**:
  - Success: 
    ```json
    {
      "message": "User created successfully"
    }
    ```
  - Errors:
    - `ExistException`: Email already exists.
    - Validation errors.

### `login(req: Request, res: Response, next: NextFunction): Promise<void>`

Handles user login.

- **Request**:
  - `POST /login`
  - Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **Response**:
  - Success:
    ```json
    {
      "message": "User login successfully",
      "token": "string"
    }
    ```
  - Errors:
    - `NotFoundException`: User not found.
    - `InvalidException`: Password is incorrect.
    - Validation errors.

### `updateProfile(req: Request, res: Response, next: NextFunction): Promise<void>`

Handles user profile updates.

- **Request**:
  - `PUT /profile`
  - Headers:
    - `Authorization: Bearer <token>`
  - Body:
    ```json
    {
      "gender": "string",
      "DOB": "string",
      "fullName": "string",
      "phoneNumber": "string"
    }
    ```

- **Response**:
  - Success:
    ```json
    {
      "message": "User profile updated successfully",
      "user": {
        "email": "string",
        "gender": "string",
        "DOB": "string",
        "fullName": "string",
        "phoneNumber": "string"
      }
    }
    ```
  - Errors:
    - `NotFoundException`: User not found.
    - Validation errors.

## Validators

- **authValidator**: Validates registration data.
- **loginValidator**: Validates login data.
- **profileValidator**: Validates profile update data.

## Utilities

- **bcrypt**: Used for hashing and comparing passwords.
- **generateToken**: Generates a JWT for authenticated users.

## Error Handling

- **ExistException**: Thrown when an email is already registered.
- **InvalidException**: Thrown when provided credentials are invalid.
- **NotFoundException**: Thrown when a user is not found in the database.

# CategoriesController

The `CategoriesController` handles CRUD operations for categories, including creating, retrieving, updating, and deleting categories.

## Methods

### `createCategory(req: Request, res: Response, next: NextFunction): Promise<void>`

Creates a new category.

- **Request**: 
  - `POST /categories`
  - Body: 
    ```json
    {
      "name": "string",
      "type": "string",
      "status": "string",
      "order": "number"
    }
    ```

- **Response**:
  - Success: 
    ```json
    {
      "data": {
        "name": "string",
        "type": "string",
        "status": "string",
        "order": "number",
        "_id": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Errors:
    - `ExistException`: Category already exists.
    - Validation errors.

### `getAllCategory(req: Request, res: Response, next: NextFunction): Promise<void>`

Retrieves all categories.

- **Request**: 
  - `GET /categories`

- **Response**:
  - Success:
    ```json
    {
      "data": [
        {
          "name": "string",
          "type": "string",
          "status": "string",
          "order": "number",
          "_id": "string",
          "createdAt": "date",
          "updatedAt": "date"
        }
      ]
    }
    ```
  - Errors:
    - `NotFoundException`: No categories found.

### `getSingleCategory(req: Request, res: Response, next: NextFunction): Promise<void>`

Retrieves a single category by ID.

- **Request**: 
  - `GET /categories/:id`
  - Params:
    - `id`: `string`

- **Response**:
  - Success:
    ```json
    {
      "data": {
        "name": "string",
        "type": "string",
        "status": "string",
        "order": "number",
        "_id": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Errors:
    - `NotFoundException`: Category not found.

### `updateCategory(req: Request, res: Response, next: NextFunction): Promise<void>`

Updates an existing category by ID.

- **Request**:
  - `PUT /categories/:id`
  - Params:
    - `id`: `string`
  - Body:
    ```json
    {
      "name": "string",
      "type": "string",
      "status": "string",
      "order": "number"
    }
    ```

- **Response**:
  - Success:
    ```json
    {
      "data": {
        "name": "string",
        "type": "string",
        "status": "string",
        "order": "number",
        "_id": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Errors:
    - `NotFoundException`: Category not found.
    - Validation errors.

### `deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void>`

Deletes a category by ID.

- **Request**:
  - `DELETE /categories/:id`
  - Params:
    - `id`: `string`

- **Response**:
  - Success:
    ```json
    {
      "message": "Delete Category Successfully"
    }
    ```
  - Errors:
    - `NotFoundException`: Category not found.

# BudgetController

The `BudgetController` handles CRUD operations for budgets, including creating, retrieving, updating, and deleting budgets.

## Methods

### `createBudget(req: Request, res: Response, next: NextFunction): Promise<void>`

Creates a new budget.

- **Request**: 
  - `POST /budgets`
  - Body: 
    ```json
    {
      "category_id": "string",
      "budget": "number"
    }
    ```

- **Response**:
  - Success: 
    ```json
    {
      "data": {
        "_id": "string",
        "user_id": "string",
        "category_id": "string",
        "budget": "number",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Errors:
    - `ExistException`: Budget already exists for the category.
    - `NotFoundException`: Category not found.
    - Validation errors.

### `getAllBudget(req: Request, res: Response, next: NextFunction): Promise<void>`

Retrieves all budgets.

- **Request**: 
  - `GET /budgets`

- **Response**:
  - Success:
    ```json
    {
      "data": [
        {
          "_id": "string",
          "user_id": "string",
          "category_id": "string",
          "budget": "number",
          "createdAt": "date",
          "updatedAt": "date"
        }
      ]
    }
    ```
  - Errors:
    - `NotFoundException`: No budgets found.

### `getSingleBudget(req: Request, res: Response, next: NextFunction): Promise<void>`

Retrieves a single budget by ID.

- **Request**: 
  - `GET /budgets/:id`
  - Params:
    - `id`: `string`

- **Response**:
  - Success:
    ```json
    {
      "data": {
        "_id": "string",
        "user_id": "string",
        "category_id": "string",
        "budget": "number",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Errors:
    - `NotFoundException`: Budget not found.

### `updateBudget(req: Request, res: Response, next: NextFunction): Promise<void>`

Updates an existing budget by ID.

- **Request**:
  - `PUT /budgets/:id`
  - Params:
    - `id`: `string`
  - Body:
    ```json
    {
      "category_id": "string",
      "budget": "number"
    }
    ```

- **Response**:
  - Success:
    ```json
    {
      "data": {
        "_id": "string",
        "user_id": "string",
        "category_id": "string",
        "budget": "number",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Errors:
    - `NotFoundException`: Budget not found.
    - Validation errors.

### `deleteBudget(req: Request, res: Response, next: NextFunction): Promise<void>`

Deletes a budget by ID.

- **Request**:
  - `DELETE /budgets/:id`
  - Params:
    - `id`: `string`

- **Response**:
  - Success:
    ```json
    {
      "message": "Delete Budget Successfully"
    }
    ```
  - Errors:
    - `NotFoundException`: Budget not found.

# PaymentsController

The `PaymentsController` handles CRUD operations for payments, including creating, retrieving, updating, and deleting payments.

## Methods

### `createPayment(req: Request, res: Response, next: NextFunction): Promise<void>`

Creates a new payment.

- **Request**: 
  - `POST /payments`
  - Body: 
    ```json
    {
      "name": "string",
      "status": "string",
      "order": "number"
    }
    ```

- **Response**:
  - Success: 
    ```json
    {
      "data": {
        "_id": "string",
        "name": "string",
        "status": "string",
        "order": "number",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Errors:
    - `ExistException`: Payment already exists.
    - Validation errors.

### `getAllPayment(req: Request, res: Response, next: NextFunction): Promise<void>`

Retrieves all payments.

- **Request**: 
  - `GET /payments`

- **Response**:
  - Success:
    ```json
    {
      "data": [
        {
          "_id": "string",
          "name": "string",
          "status": "string",
          "order": "number",
          "createdAt": "date",
          "updatedAt": "date"
        }
      ]
    }
    ```
  - Errors:
    - `NotFoundException`: No payments found.

### `getSinglePayment(req: Request, res: Response, next: NextFunction): Promise<void>`

Retrieves a single payment by ID.

- **Request**: 
  - `GET /payments/:id`
  - Params:
    - `id`: `string`

- **Response**:
  - Success:
    ```json
    {
      "data": {
        "_id": "string",
        "name": "string",
        "status": "string",
        "order": "number",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Errors:
    - `NotFoundException`: Payment not found.

### `updatePayment(req: Request, res: Response, next: NextFunction): Promise<void>`

Updates an existing payment by ID.

- **Request**:
  - `PUT /payments/:id`
  - Params:
    - `id`: `string`
  - Body:
    ```json
    {
      "name": "string",
      "status": "string",
      "order": "number"
    }
    ```

- **Response**:
  - Success:
    ```json
    {
      "data": {
        "_id": "string",
        "name": "string",
        "status": "string",
        "order": "number",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Errors:
    - `NotFoundException`: Payment not found.
    - Validation errors.

### `deletePayment(req: Request, res: Response, next: NextFunction): Promise<void>`

Deletes a payment by ID.

- **Request**:
  - `DELETE /payments/:id`
  - Params:
    - `id`: `string`

- **Response**:
  - Success:
    ```json
    {
      "message": "Delete Payment Successfully"
    }
    ```
  - Errors:
    - `NotFoundException`: Payment not found.


# TagController

The `TagController` handles CRUD operations for tags, including creating, retrieving, updating, and deleting tags.

## Methods

### `createTag(req: Request, res: Response, next: NextFunction): Promise<void>`

Creates a new tag.

- **Request**: 
  - `POST /tags`
  - Body: 
    ```json
    {
      "name": "string",
      "status": "string",
      "order": "number"
    }
    ```

- **Response**:
  - Success: 
    ```json
    {
      "data": {
        "_id": "string",
        "name": "string",
        "status": "string",
        "order": "number",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Errors:
    - `ExistException`: Tag already exists.
    - Validation errors.

### `getAllTag(req: Request, res: Response, next: NextFunction): Promise<void>`

Retrieves all tags.

- **Request**: 
  - `GET /tags`

- **Response**:
  - Success:
    ```json
    {
      "data": [
        {
          "_id": "string",
          "name": "string",
          "status": "string",
          "order": "number",
          "createdAt": "date",
          "updatedAt": "date"
        }
      ]
    }
    ```
  - Errors:
    - `NotFoundException`: No tags found.

### `getTag(req: Request, res: Response, next: NextFunction): Promise<void>`

Retrieves a single tag by ID.

- **Request**: 
  - `GET /tags/:id`
  - Params:
    - `id`: `string`

- **Response**:
  - Success:
    ```json
    {
      "data": {
        "_id": "string",
        "name": "string",
        "status": "string",
        "order": "number",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Errors:
    - `NotFoundException`: Tag not found.

### `updateTag(req: Request, res: Response, next: NextFunction): Promise<void>`

Updates an existing tag by ID.

- **Request**:
  - `PUT /tags/:id`
  - Params:
    - `id`: `string`
  - Body:
    ```json
    {
      "name": "string",
      "status": "string",
      "order": "number"
    }
    ```

- **Response**:
  - Success:
    ```json
    {
      "data": {
        "_id": "string",
        "name": "string",
        "status": "string",
        "order": "number",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Errors:
    - `NotFoundException`: Tag not found.
    - Validation errors.

### `deleteTag(req: Request, res: Response, next: NextFunction): Promise<void>`

Deletes a tag by ID.

- **Request**:
  - `DELETE /tags/:id`
  - Params:
    - `id`: `string`

- **Response**:
  - Success:
    ```json
    {
      "message": "Delete Tag Successfully"
    }
    ```
  - Errors:
    - `NotFoundException`: Tag not found.


# TransactionController

The `TransactionController` handles CRUD operations for transactions, including creating, retrieving, updating, and deleting transactions.

## Methods

### `createTransaction(req: Request, res: Response, next: NextFunction): Promise<void>`

Creates a new transaction.

- **Request**: 
  - `POST /transactions`
  - Body: 
    ```json
    {
      "category_id": "string",
      "tag_id": "string",
      "payment_id": "string",
      "amount": "number"
    }
    ```

- **Response**:
  - Success: 
    ```json
    {
      "data": {
        "_id": "string",
        "user_id": "string",
        "category_id": "string",
        "tag_id": "string",
        "payment_id": "string",
        "amount": "number",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Errors:
    - `NotFoundException`: Category, Payment, or Tag not found.
    - Validation errors.

### `getAllTransaction(req: Request, res: Response, next: NextFunction): Promise<void>`

Retrieves all transactions within a date range.

- **Request**: 
  - `GET /transactions`
  - Query Params:
    - `start`: `date`
    - `end`: `date`

- **Response**:
  - Success:
    ```json
    {
      "data": [
        {
          "_id": "string",
          "user_id": "string",
          "category_id": "string",
          "tag_id": "string",
          "payment_id": "string",
          "amount": "number",
          "createdAt": "date",
          "updatedAt": "date"
        }
      ]
    }
    ```
  - Errors:
    - `NotFoundException`: No transactions found.

### `getSingleTransaction(req: Request, res: Response, next: NextFunction): Promise<void>`

Retrieves a single transaction by ID.

- **Request**: 
  - `GET /transactions/:id`
  - Params:
    - `id`: `string`

- **Response**:
  - Success:
    ```json
    {
      "data": {
        "_id": "string",
        "user_id": "string",
        "category_id": "string",
        "tag_id": "string",
        "payment_id": "string",
        "amount": "number",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Errors:
    - `NotFoundException`: Transaction not found.

### `updateTransaction(req: Request, res: Response, next: NextFunction): Promise<void>`

Updates an existing transaction by ID.

- **Request**:
  - `PUT /transactions/:id`
  - Params:
    - `id`: `string`
  - Body:
    ```json
    {
      "category_id": "string",
      "tag_id": "string",
      "payment_id": "string",
      "amount": "number"
    }
    ```

- **Response**:
  - Success:
    ```json
    {
      "data": {
        "_id": "string",
        "user_id": "string",
        "category_id": "string",
        "tag_id": "string",
        "payment_id": "string",
        "amount": "number",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Errors:
    - `NotFoundException`: Transaction, Category, Payment, or Tag not found.
    - Validation errors.

### `deleteTransaction(req: Request, res: Response, next: NextFunction): Promise<void>`

Deletes a transaction by ID.

- **Request**:
  - `DELETE /transactions/:id`
  - Params:
    - `id`: `string`

- **Response**:
  - Success:
    ```json
    {
      "message": "Delete Transaction Successfully"
    }
    ```
  - Errors:
    - `NotFoundException`: Transaction not found.

### `getTransactionsCategoriesVise(req: Request, res: Response, next: NextFunction): Promise<void>`

Retrieves transactions grouped by categories within a date range.

- **Request**:
  - `POST /transactions/categories`
  - Body:
    ```json
    {
      "start": "date",
      "end": "date"
    }
    ```

- **Response**:
  - Success:
    ```json
    {
      "data": [
        {
          "category": {
            "_id": "string",
            "name": "string",
            "type": "string",
            "status": "string",
            "order": "number",
            "createdAt": "date",
            "updatedAt": "date"
          },
          "totalAmount": "number"
        }
      ]
    }
    ```
  - Errors:
    - Validation errors.