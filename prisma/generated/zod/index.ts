import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','createdAt','updatedAt']);

export const UserProfileScalarFieldEnumSchema = z.enum(['id','personalId','displayName','imageUrl','description','userId','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  profile?: UserProfileWithRelations | null;
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  profile: z.lazy(() => UserProfileWithRelationsSchema).nullable(),
}))

/////////////////////////////////////////
// USER PROFILE SCHEMA
/////////////////////////////////////////

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  personalId: z.string(),
  displayName: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type UserProfile = z.infer<typeof UserProfileSchema>

// USER PROFILE RELATION SCHEMA
//------------------------------------------------------

export type UserProfileRelations = {
  user: UserWithRelations;
};

export type UserProfileWithRelations = z.infer<typeof UserProfileSchema> & UserProfileRelations

export const UserProfileWithRelationsSchema: z.ZodType<UserProfileWithRelations> = UserProfileSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  profile: z.union([z.boolean(),z.lazy(() => UserProfileArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  profile: z.union([z.boolean(),z.lazy(() => UserProfileArgsSchema)]).optional(),
}).strict()

// USER PROFILE
//------------------------------------------------------

export const UserProfileIncludeSchema: z.ZodType<Prisma.UserProfileInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UserProfileArgsSchema: z.ZodType<Prisma.UserProfileDefaultArgs> = z.object({
  select: z.lazy(() => UserProfileSelectSchema).optional(),
  include: z.lazy(() => UserProfileIncludeSchema).optional(),
}).strict();

export const UserProfileSelectSchema: z.ZodType<Prisma.UserProfileSelect> = z.object({
  id: z.boolean().optional(),
  personalId: z.boolean().optional(),
  displayName: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  description: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  profile: z.union([ z.lazy(() => UserProfileNullableScalarRelationFilterSchema),z.lazy(() => UserProfileWhereInputSchema) ]).optional().nullable(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  profile: z.lazy(() => UserProfileOrderByWithRelationInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  profile: z.union([ z.lazy(() => UserProfileNullableScalarRelationFilterSchema),z.lazy(() => UserProfileWhereInputSchema) ]).optional().nullable(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserProfileWhereInputSchema: z.ZodType<Prisma.UserProfileWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserProfileWhereInputSchema),z.lazy(() => UserProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProfileWhereInputSchema),z.lazy(() => UserProfileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  personalId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  displayName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const UserProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.UserProfileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personalId: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const UserProfileWhereUniqueInputSchema: z.ZodType<Prisma.UserProfileWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    personalId: z.string(),
    userId: z.string()
  }),
  z.object({
    id: z.string().uuid(),
    personalId: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
    userId: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    personalId: z.string(),
    userId: z.string(),
  }),
  z.object({
    personalId: z.string(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  personalId: z.string().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => UserProfileWhereInputSchema),z.lazy(() => UserProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProfileWhereInputSchema),z.lazy(() => UserProfileWhereInputSchema).array() ]).optional(),
  displayName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const UserProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserProfileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personalId: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserProfileCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserProfileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserProfileMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserProfileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserProfileScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => UserProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProfileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => UserProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  personalId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  displayName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  profile: z.lazy(() => UserProfileCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  profile: z.lazy(() => UserProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => UserProfileUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => UserProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProfileCreateInputSchema: z.ZodType<Prisma.UserProfileCreateInput> = z.object({
  id: z.string().uuid().optional(),
  personalId: z.string(),
  displayName: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema)
}).strict();

export const UserProfileUncheckedCreateInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  personalId: z.string(),
  displayName: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserProfileUpdateInputSchema: z.ZodType<Prisma.UserProfileUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  personalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional()
}).strict();

export const UserProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  personalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProfileCreateManyInputSchema: z.ZodType<Prisma.UserProfileCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  personalId: z.string(),
  displayName: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.UserProfileUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  personalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  personalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const UserProfileNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserProfileNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UserProfileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserProfileWhereInputSchema).optional().nullable()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserProfileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personalId: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserProfileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personalId: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserProfileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personalId: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProfileCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.UserProfileCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional()
}).strict();

export const UserProfileUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserProfileUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.UserProfileUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => UserProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserProfileUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => UserProfileUpdateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UserProfileUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => UserProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserProfileUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => UserProfileUpdateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutProfileNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutProfileInputSchema),z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UserProfileCreateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  personalId: z.string(),
  displayName: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  personalId: z.string(),
  displayName: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserProfileCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserProfileCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserProfileUpsertWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => UserProfileUpdateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserProfileCreateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => UserProfileWhereInputSchema).optional()
}).strict();

export const UserProfileUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserProfileUpdateWithoutUserInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserProfileUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  personalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProfileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  personalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateWithoutProfileInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const UserUpsertWithoutProfileInputSchema: z.ZodType<Prisma.UserUpsertWithoutProfileInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProfileInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]),
}).strict();

export const UserUpdateWithoutProfileInputSchema: z.ZodType<Prisma.UserUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserProfileFindFirstArgsSchema: z.ZodType<Prisma.UserProfileFindFirstArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  where: UserProfileWhereInputSchema.optional(),
  orderBy: z.union([ UserProfileOrderByWithRelationInputSchema.array(),UserProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProfileScalarFieldEnumSchema,UserProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserProfileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserProfileFindFirstOrThrowArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  where: UserProfileWhereInputSchema.optional(),
  orderBy: z.union([ UserProfileOrderByWithRelationInputSchema.array(),UserProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProfileScalarFieldEnumSchema,UserProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserProfileFindManyArgsSchema: z.ZodType<Prisma.UserProfileFindManyArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  where: UserProfileWhereInputSchema.optional(),
  orderBy: z.union([ UserProfileOrderByWithRelationInputSchema.array(),UserProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProfileScalarFieldEnumSchema,UserProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserProfileAggregateArgsSchema: z.ZodType<Prisma.UserProfileAggregateArgs> = z.object({
  where: UserProfileWhereInputSchema.optional(),
  orderBy: z.union([ UserProfileOrderByWithRelationInputSchema.array(),UserProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserProfileGroupByArgsSchema: z.ZodType<Prisma.UserProfileGroupByArgs> = z.object({
  where: UserProfileWhereInputSchema.optional(),
  orderBy: z.union([ UserProfileOrderByWithAggregationInputSchema.array(),UserProfileOrderByWithAggregationInputSchema ]).optional(),
  by: UserProfileScalarFieldEnumSchema.array(),
  having: UserProfileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserProfileFindUniqueArgsSchema: z.ZodType<Prisma.UserProfileFindUniqueArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  where: UserProfileWhereUniqueInputSchema,
}).strict() ;

export const UserProfileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserProfileFindUniqueOrThrowArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  where: UserProfileWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserProfileCreateArgsSchema: z.ZodType<Prisma.UserProfileCreateArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  data: z.union([ UserProfileCreateInputSchema,UserProfileUncheckedCreateInputSchema ]),
}).strict() ;

export const UserProfileUpsertArgsSchema: z.ZodType<Prisma.UserProfileUpsertArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  where: UserProfileWhereUniqueInputSchema,
  create: z.union([ UserProfileCreateInputSchema,UserProfileUncheckedCreateInputSchema ]),
  update: z.union([ UserProfileUpdateInputSchema,UserProfileUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserProfileCreateManyArgsSchema: z.ZodType<Prisma.UserProfileCreateManyArgs> = z.object({
  data: z.union([ UserProfileCreateManyInputSchema,UserProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserProfileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserProfileCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserProfileCreateManyInputSchema,UserProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserProfileDeleteArgsSchema: z.ZodType<Prisma.UserProfileDeleteArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  where: UserProfileWhereUniqueInputSchema,
}).strict() ;

export const UserProfileUpdateArgsSchema: z.ZodType<Prisma.UserProfileUpdateArgs> = z.object({
  select: UserProfileSelectSchema.optional(),
  include: UserProfileIncludeSchema.optional(),
  data: z.union([ UserProfileUpdateInputSchema,UserProfileUncheckedUpdateInputSchema ]),
  where: UserProfileWhereUniqueInputSchema,
}).strict() ;

export const UserProfileUpdateManyArgsSchema: z.ZodType<Prisma.UserProfileUpdateManyArgs> = z.object({
  data: z.union([ UserProfileUpdateManyMutationInputSchema,UserProfileUncheckedUpdateManyInputSchema ]),
  where: UserProfileWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserProfileUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserProfileUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserProfileUpdateManyMutationInputSchema,UserProfileUncheckedUpdateManyInputSchema ]),
  where: UserProfileWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserProfileDeleteManyArgsSchema: z.ZodType<Prisma.UserProfileDeleteManyArgs> = z.object({
  where: UserProfileWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;