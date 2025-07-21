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

export const UserProfileScalarFieldEnumSchema = z.enum(['id','personalId','displayName','imageUrl','description','createdAt','updatedAt','userId']);

export const PrefectureScalarFieldEnumSchema = z.enum(['id','name']);

export const AreaScalarFieldEnumSchema = z.enum(['id','name','prefectureId']);

export const CityScalarFieldEnumSchema = z.enum(['id','name','prefectureId','areaId']);

export const EventMediaScalarFieldEnumSchema = z.enum(['id','url','eventId']);

export const EventTagScalarFieldEnumSchema = z.enum(['id','name']);

export const EventScalarFieldEnumSchema = z.enum(['id','title','description','startDateTime','endDateTime','locationDetail','onlineLocationDetail','conditions','maxCapacity','overview','contact','eventType','eventStatus','ownerId','prefectureId','areaId','cityId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const EventTypeSchema = z.enum(['OFFLINE','ONLINE','HYBRID']);

export type EventTypeType = `${z.infer<typeof EventTypeSchema>}`

export const EventStatusSchema = z.enum(['SCHEDULED','COMPLETED','CANCELLED']);

export type EventStatusType = `${z.infer<typeof EventStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
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
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
})

export type UserProfile = z.infer<typeof UserProfileSchema>

// USER PROFILE RELATION SCHEMA
//------------------------------------------------------

export type UserProfileRelations = {
  user: UserWithRelations;
  ownedEvents: EventWithRelations[];
  attendingEvents: EventWithRelations[];
};

export type UserProfileWithRelations = z.infer<typeof UserProfileSchema> & UserProfileRelations

export const UserProfileWithRelationsSchema: z.ZodType<UserProfileWithRelations> = UserProfileSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  ownedEvents: z.lazy(() => EventWithRelationsSchema).array(),
  attendingEvents: z.lazy(() => EventWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// PREFECTURE SCHEMA
/////////////////////////////////////////

export const PrefectureSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type Prefecture = z.infer<typeof PrefectureSchema>

// PREFECTURE RELATION SCHEMA
//------------------------------------------------------

export type PrefectureRelations = {
  areas: AreaWithRelations[];
  events: EventWithRelations[];
  cities: CityWithRelations[];
};

export type PrefectureWithRelations = z.infer<typeof PrefectureSchema> & PrefectureRelations

export const PrefectureWithRelationsSchema: z.ZodType<PrefectureWithRelations> = PrefectureSchema.merge(z.object({
  areas: z.lazy(() => AreaWithRelationsSchema).array(),
  events: z.lazy(() => EventWithRelationsSchema).array(),
  cities: z.lazy(() => CityWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// AREA SCHEMA
/////////////////////////////////////////

export const AreaSchema = z.object({
  id: z.string(),
  name: z.string(),
  prefectureId: z.string(),
})

export type Area = z.infer<typeof AreaSchema>

// AREA RELATION SCHEMA
//------------------------------------------------------

export type AreaRelations = {
  cities: CityWithRelations[];
  prefecture: PrefectureWithRelations;
  events: EventWithRelations[];
};

export type AreaWithRelations = z.infer<typeof AreaSchema> & AreaRelations

export const AreaWithRelationsSchema: z.ZodType<AreaWithRelations> = AreaSchema.merge(z.object({
  cities: z.lazy(() => CityWithRelationsSchema).array(),
  prefecture: z.lazy(() => PrefectureWithRelationsSchema),
  events: z.lazy(() => EventWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// CITY SCHEMA
/////////////////////////////////////////

export const CitySchema = z.object({
  id: z.string(),
  name: z.string(),
  prefectureId: z.string(),
  areaId: z.string(),
})

export type City = z.infer<typeof CitySchema>

// CITY RELATION SCHEMA
//------------------------------------------------------

export type CityRelations = {
  area: AreaWithRelations;
  prefecture: PrefectureWithRelations;
  events: EventWithRelations[];
};

export type CityWithRelations = z.infer<typeof CitySchema> & CityRelations

export const CityWithRelationsSchema: z.ZodType<CityWithRelations> = CitySchema.merge(z.object({
  area: z.lazy(() => AreaWithRelationsSchema),
  prefecture: z.lazy(() => PrefectureWithRelationsSchema),
  events: z.lazy(() => EventWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// EVENT MEDIA SCHEMA
/////////////////////////////////////////

export const EventMediaSchema = z.object({
  id: z.string().uuid(),
  url: z.string(),
  eventId: z.string(),
})

export type EventMedia = z.infer<typeof EventMediaSchema>

// EVENT MEDIA RELATION SCHEMA
//------------------------------------------------------

export type EventMediaRelations = {
  event: EventWithRelations;
};

export type EventMediaWithRelations = z.infer<typeof EventMediaSchema> & EventMediaRelations

export const EventMediaWithRelationsSchema: z.ZodType<EventMediaWithRelations> = EventMediaSchema.merge(z.object({
  event: z.lazy(() => EventWithRelationsSchema),
}))

/////////////////////////////////////////
// EVENT TAG SCHEMA
/////////////////////////////////////////

export const EventTagSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

export type EventTag = z.infer<typeof EventTagSchema>

// EVENT TAG RELATION SCHEMA
//------------------------------------------------------

export type EventTagRelations = {
  events: EventWithRelations[];
};

export type EventTagWithRelations = z.infer<typeof EventTagSchema> & EventTagRelations

export const EventTagWithRelationsSchema: z.ZodType<EventTagWithRelations> = EventTagSchema.merge(z.object({
  events: z.lazy(() => EventWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  eventType: EventTypeSchema,
  eventStatus: EventStatusSchema,
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().nullable(),
  onlineLocationDetail: z.string().nullable(),
  conditions: z.string().nullable(),
  maxCapacity: z.string().nullable(),
  overview: z.string().nullable(),
  contact: z.string().nullable(),
  ownerId: z.string(),
  prefectureId: z.string().nullable(),
  areaId: z.string().nullable(),
  cityId: z.string().nullable(),
})

export type Event = z.infer<typeof EventSchema>

// EVENT RELATION SCHEMA
//------------------------------------------------------

export type EventRelations = {
  owner: UserProfileWithRelations;
  attendees: UserProfileWithRelations[];
  medias: EventMediaWithRelations[];
  tags: EventTagWithRelations[];
  prefecture?: PrefectureWithRelations | null;
  area?: AreaWithRelations | null;
  city?: CityWithRelations | null;
};

export type EventWithRelations = z.infer<typeof EventSchema> & EventRelations

export const EventWithRelationsSchema: z.ZodType<EventWithRelations> = EventSchema.merge(z.object({
  owner: z.lazy(() => UserProfileWithRelationsSchema),
  attendees: z.lazy(() => UserProfileWithRelationsSchema).array(),
  medias: z.lazy(() => EventMediaWithRelationsSchema).array(),
  tags: z.lazy(() => EventTagWithRelationsSchema).array(),
  prefecture: z.lazy(() => PrefectureWithRelationsSchema).nullable(),
  area: z.lazy(() => AreaWithRelationsSchema).nullable(),
  city: z.lazy(() => CityWithRelationsSchema).nullable(),
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
  ownedEvents: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  attendingEvents: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserProfileCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserProfileArgsSchema: z.ZodType<Prisma.UserProfileDefaultArgs> = z.object({
  select: z.lazy(() => UserProfileSelectSchema).optional(),
  include: z.lazy(() => UserProfileIncludeSchema).optional(),
}).strict();

export const UserProfileCountOutputTypeArgsSchema: z.ZodType<Prisma.UserProfileCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserProfileCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserProfileCountOutputTypeSelectSchema: z.ZodType<Prisma.UserProfileCountOutputTypeSelect> = z.object({
  ownedEvents: z.boolean().optional(),
  attendingEvents: z.boolean().optional(),
}).strict();

export const UserProfileSelectSchema: z.ZodType<Prisma.UserProfileSelect> = z.object({
  id: z.boolean().optional(),
  personalId: z.boolean().optional(),
  displayName: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  ownedEvents: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  attendingEvents: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserProfileCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PREFECTURE
//------------------------------------------------------

export const PrefectureIncludeSchema: z.ZodType<Prisma.PrefectureInclude> = z.object({
  areas: z.union([z.boolean(),z.lazy(() => AreaFindManyArgsSchema)]).optional(),
  events: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  cities: z.union([z.boolean(),z.lazy(() => CityFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PrefectureCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PrefectureArgsSchema: z.ZodType<Prisma.PrefectureDefaultArgs> = z.object({
  select: z.lazy(() => PrefectureSelectSchema).optional(),
  include: z.lazy(() => PrefectureIncludeSchema).optional(),
}).strict();

export const PrefectureCountOutputTypeArgsSchema: z.ZodType<Prisma.PrefectureCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PrefectureCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PrefectureCountOutputTypeSelectSchema: z.ZodType<Prisma.PrefectureCountOutputTypeSelect> = z.object({
  areas: z.boolean().optional(),
  events: z.boolean().optional(),
  cities: z.boolean().optional(),
}).strict();

export const PrefectureSelectSchema: z.ZodType<Prisma.PrefectureSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  areas: z.union([z.boolean(),z.lazy(() => AreaFindManyArgsSchema)]).optional(),
  events: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  cities: z.union([z.boolean(),z.lazy(() => CityFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PrefectureCountOutputTypeArgsSchema)]).optional(),
}).strict()

// AREA
//------------------------------------------------------

export const AreaIncludeSchema: z.ZodType<Prisma.AreaInclude> = z.object({
  cities: z.union([z.boolean(),z.lazy(() => CityFindManyArgsSchema)]).optional(),
  prefecture: z.union([z.boolean(),z.lazy(() => PrefectureArgsSchema)]).optional(),
  events: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AreaCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AreaArgsSchema: z.ZodType<Prisma.AreaDefaultArgs> = z.object({
  select: z.lazy(() => AreaSelectSchema).optional(),
  include: z.lazy(() => AreaIncludeSchema).optional(),
}).strict();

export const AreaCountOutputTypeArgsSchema: z.ZodType<Prisma.AreaCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AreaCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AreaCountOutputTypeSelectSchema: z.ZodType<Prisma.AreaCountOutputTypeSelect> = z.object({
  cities: z.boolean().optional(),
  events: z.boolean().optional(),
}).strict();

export const AreaSelectSchema: z.ZodType<Prisma.AreaSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  prefectureId: z.boolean().optional(),
  cities: z.union([z.boolean(),z.lazy(() => CityFindManyArgsSchema)]).optional(),
  prefecture: z.union([z.boolean(),z.lazy(() => PrefectureArgsSchema)]).optional(),
  events: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AreaCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CITY
//------------------------------------------------------

export const CityIncludeSchema: z.ZodType<Prisma.CityInclude> = z.object({
  area: z.union([z.boolean(),z.lazy(() => AreaArgsSchema)]).optional(),
  prefecture: z.union([z.boolean(),z.lazy(() => PrefectureArgsSchema)]).optional(),
  events: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CityCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CityArgsSchema: z.ZodType<Prisma.CityDefaultArgs> = z.object({
  select: z.lazy(() => CitySelectSchema).optional(),
  include: z.lazy(() => CityIncludeSchema).optional(),
}).strict();

export const CityCountOutputTypeArgsSchema: z.ZodType<Prisma.CityCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CityCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CityCountOutputTypeSelectSchema: z.ZodType<Prisma.CityCountOutputTypeSelect> = z.object({
  events: z.boolean().optional(),
}).strict();

export const CitySelectSchema: z.ZodType<Prisma.CitySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  prefectureId: z.boolean().optional(),
  areaId: z.boolean().optional(),
  area: z.union([z.boolean(),z.lazy(() => AreaArgsSchema)]).optional(),
  prefecture: z.union([z.boolean(),z.lazy(() => PrefectureArgsSchema)]).optional(),
  events: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CityCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EVENT MEDIA
//------------------------------------------------------

export const EventMediaIncludeSchema: z.ZodType<Prisma.EventMediaInclude> = z.object({
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
}).strict()

export const EventMediaArgsSchema: z.ZodType<Prisma.EventMediaDefaultArgs> = z.object({
  select: z.lazy(() => EventMediaSelectSchema).optional(),
  include: z.lazy(() => EventMediaIncludeSchema).optional(),
}).strict();

export const EventMediaSelectSchema: z.ZodType<Prisma.EventMediaSelect> = z.object({
  id: z.boolean().optional(),
  url: z.boolean().optional(),
  eventId: z.boolean().optional(),
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
}).strict()

// EVENT TAG
//------------------------------------------------------

export const EventTagIncludeSchema: z.ZodType<Prisma.EventTagInclude> = z.object({
  events: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventTagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EventTagArgsSchema: z.ZodType<Prisma.EventTagDefaultArgs> = z.object({
  select: z.lazy(() => EventTagSelectSchema).optional(),
  include: z.lazy(() => EventTagIncludeSchema).optional(),
}).strict();

export const EventTagCountOutputTypeArgsSchema: z.ZodType<Prisma.EventTagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EventTagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EventTagCountOutputTypeSelectSchema: z.ZodType<Prisma.EventTagCountOutputTypeSelect> = z.object({
  events: z.boolean().optional(),
}).strict();

export const EventTagSelectSchema: z.ZodType<Prisma.EventTagSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  events: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventTagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EVENT
//------------------------------------------------------

export const EventIncludeSchema: z.ZodType<Prisma.EventInclude> = z.object({
  owner: z.union([z.boolean(),z.lazy(() => UserProfileArgsSchema)]).optional(),
  attendees: z.union([z.boolean(),z.lazy(() => UserProfileFindManyArgsSchema)]).optional(),
  medias: z.union([z.boolean(),z.lazy(() => EventMediaFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => EventTagFindManyArgsSchema)]).optional(),
  prefecture: z.union([z.boolean(),z.lazy(() => PrefectureArgsSchema)]).optional(),
  area: z.union([z.boolean(),z.lazy(() => AreaArgsSchema)]).optional(),
  city: z.union([z.boolean(),z.lazy(() => CityArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EventArgsSchema: z.ZodType<Prisma.EventDefaultArgs> = z.object({
  select: z.lazy(() => EventSelectSchema).optional(),
  include: z.lazy(() => EventIncludeSchema).optional(),
}).strict();

export const EventCountOutputTypeArgsSchema: z.ZodType<Prisma.EventCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EventCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EventCountOutputTypeSelectSchema: z.ZodType<Prisma.EventCountOutputTypeSelect> = z.object({
  attendees: z.boolean().optional(),
  medias: z.boolean().optional(),
  tags: z.boolean().optional(),
}).strict();

export const EventSelectSchema: z.ZodType<Prisma.EventSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  startDateTime: z.boolean().optional(),
  endDateTime: z.boolean().optional(),
  locationDetail: z.boolean().optional(),
  onlineLocationDetail: z.boolean().optional(),
  conditions: z.boolean().optional(),
  maxCapacity: z.boolean().optional(),
  overview: z.boolean().optional(),
  contact: z.boolean().optional(),
  eventType: z.boolean().optional(),
  eventStatus: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  prefectureId: z.boolean().optional(),
  areaId: z.boolean().optional(),
  cityId: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => UserProfileArgsSchema)]).optional(),
  attendees: z.union([z.boolean(),z.lazy(() => UserProfileFindManyArgsSchema)]).optional(),
  medias: z.union([z.boolean(),z.lazy(() => EventMediaFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => EventTagFindManyArgsSchema)]).optional(),
  prefecture: z.union([z.boolean(),z.lazy(() => PrefectureArgsSchema)]).optional(),
  area: z.union([z.boolean(),z.lazy(() => AreaArgsSchema)]).optional(),
  city: z.union([z.boolean(),z.lazy(() => CityArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventCountOutputTypeArgsSchema)]).optional(),
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
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
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
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  ownedEvents: z.lazy(() => EventListRelationFilterSchema).optional(),
  attendingEvents: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict();

export const UserProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.UserProfileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personalId: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  ownedEvents: z.lazy(() => EventOrderByRelationAggregateInputSchema).optional(),
  attendingEvents: z.lazy(() => EventOrderByRelationAggregateInputSchema).optional()
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
  ownedEvents: z.lazy(() => EventListRelationFilterSchema).optional(),
  attendingEvents: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict());

export const UserProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserProfileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personalId: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
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
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PrefectureWhereInputSchema: z.ZodType<Prisma.PrefectureWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PrefectureWhereInputSchema),z.lazy(() => PrefectureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PrefectureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PrefectureWhereInputSchema),z.lazy(() => PrefectureWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  areas: z.lazy(() => AreaListRelationFilterSchema).optional(),
  events: z.lazy(() => EventListRelationFilterSchema).optional(),
  cities: z.lazy(() => CityListRelationFilterSchema).optional()
}).strict();

export const PrefectureOrderByWithRelationInputSchema: z.ZodType<Prisma.PrefectureOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  areas: z.lazy(() => AreaOrderByRelationAggregateInputSchema).optional(),
  events: z.lazy(() => EventOrderByRelationAggregateInputSchema).optional(),
  cities: z.lazy(() => CityOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PrefectureWhereUniqueInputSchema: z.ZodType<Prisma.PrefectureWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => PrefectureWhereInputSchema),z.lazy(() => PrefectureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PrefectureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PrefectureWhereInputSchema),z.lazy(() => PrefectureWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  areas: z.lazy(() => AreaListRelationFilterSchema).optional(),
  events: z.lazy(() => EventListRelationFilterSchema).optional(),
  cities: z.lazy(() => CityListRelationFilterSchema).optional()
}).strict());

export const PrefectureOrderByWithAggregationInputSchema: z.ZodType<Prisma.PrefectureOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PrefectureCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PrefectureMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PrefectureMinOrderByAggregateInputSchema).optional()
}).strict();

export const PrefectureScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PrefectureScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PrefectureScalarWhereWithAggregatesInputSchema),z.lazy(() => PrefectureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PrefectureScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PrefectureScalarWhereWithAggregatesInputSchema),z.lazy(() => PrefectureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AreaWhereInputSchema: z.ZodType<Prisma.AreaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AreaWhereInputSchema),z.lazy(() => AreaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AreaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AreaWhereInputSchema),z.lazy(() => AreaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prefectureId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cities: z.lazy(() => CityListRelationFilterSchema).optional(),
  prefecture: z.union([ z.lazy(() => PrefectureScalarRelationFilterSchema),z.lazy(() => PrefectureWhereInputSchema) ]).optional(),
  events: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict();

export const AreaOrderByWithRelationInputSchema: z.ZodType<Prisma.AreaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  prefectureId: z.lazy(() => SortOrderSchema).optional(),
  cities: z.lazy(() => CityOrderByRelationAggregateInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureOrderByWithRelationInputSchema).optional(),
  events: z.lazy(() => EventOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AreaWhereUniqueInputSchema: z.ZodType<Prisma.AreaWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AreaWhereInputSchema),z.lazy(() => AreaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AreaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AreaWhereInputSchema),z.lazy(() => AreaWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prefectureId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cities: z.lazy(() => CityListRelationFilterSchema).optional(),
  prefecture: z.union([ z.lazy(() => PrefectureScalarRelationFilterSchema),z.lazy(() => PrefectureWhereInputSchema) ]).optional(),
  events: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict());

export const AreaOrderByWithAggregationInputSchema: z.ZodType<Prisma.AreaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  prefectureId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AreaCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AreaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AreaMinOrderByAggregateInputSchema).optional()
}).strict();

export const AreaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AreaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AreaScalarWhereWithAggregatesInputSchema),z.lazy(() => AreaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AreaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AreaScalarWhereWithAggregatesInputSchema),z.lazy(() => AreaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  prefectureId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CityWhereInputSchema: z.ZodType<Prisma.CityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prefectureId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  areaId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  area: z.union([ z.lazy(() => AreaScalarRelationFilterSchema),z.lazy(() => AreaWhereInputSchema) ]).optional(),
  prefecture: z.union([ z.lazy(() => PrefectureScalarRelationFilterSchema),z.lazy(() => PrefectureWhereInputSchema) ]).optional(),
  events: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict();

export const CityOrderByWithRelationInputSchema: z.ZodType<Prisma.CityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  prefectureId: z.lazy(() => SortOrderSchema).optional(),
  areaId: z.lazy(() => SortOrderSchema).optional(),
  area: z.lazy(() => AreaOrderByWithRelationInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureOrderByWithRelationInputSchema).optional(),
  events: z.lazy(() => EventOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CityWhereUniqueInputSchema: z.ZodType<Prisma.CityWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityWhereInputSchema),z.lazy(() => CityWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prefectureId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  areaId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  area: z.union([ z.lazy(() => AreaScalarRelationFilterSchema),z.lazy(() => AreaWhereInputSchema) ]).optional(),
  prefecture: z.union([ z.lazy(() => PrefectureScalarRelationFilterSchema),z.lazy(() => PrefectureWhereInputSchema) ]).optional(),
  events: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict());

export const CityOrderByWithAggregationInputSchema: z.ZodType<Prisma.CityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  prefectureId: z.lazy(() => SortOrderSchema).optional(),
  areaId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CityCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CityMinOrderByAggregateInputSchema).optional()
}).strict();

export const CityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CityScalarWhereWithAggregatesInputSchema),z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityScalarWhereWithAggregatesInputSchema),z.lazy(() => CityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  prefectureId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  areaId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const EventMediaWhereInputSchema: z.ZodType<Prisma.EventMediaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventMediaWhereInputSchema),z.lazy(() => EventMediaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventMediaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventMediaWhereInputSchema),z.lazy(() => EventMediaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  event: z.union([ z.lazy(() => EventScalarRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
}).strict();

export const EventMediaOrderByWithRelationInputSchema: z.ZodType<Prisma.EventMediaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  event: z.lazy(() => EventOrderByWithRelationInputSchema).optional()
}).strict();

export const EventMediaWhereUniqueInputSchema: z.ZodType<Prisma.EventMediaWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => EventMediaWhereInputSchema),z.lazy(() => EventMediaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventMediaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventMediaWhereInputSchema),z.lazy(() => EventMediaWhereInputSchema).array() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  event: z.union([ z.lazy(() => EventScalarRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
}).strict());

export const EventMediaOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventMediaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EventMediaCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventMediaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventMediaMinOrderByAggregateInputSchema).optional()
}).strict();

export const EventMediaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventMediaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventMediaScalarWhereWithAggregatesInputSchema),z.lazy(() => EventMediaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventMediaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventMediaScalarWhereWithAggregatesInputSchema),z.lazy(() => EventMediaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const EventTagWhereInputSchema: z.ZodType<Prisma.EventTagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventTagWhereInputSchema),z.lazy(() => EventTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventTagWhereInputSchema),z.lazy(() => EventTagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  events: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict();

export const EventTagOrderByWithRelationInputSchema: z.ZodType<Prisma.EventTagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  events: z.lazy(() => EventOrderByRelationAggregateInputSchema).optional()
}).strict();

export const EventTagWhereUniqueInputSchema: z.ZodType<Prisma.EventTagWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => EventTagWhereInputSchema),z.lazy(() => EventTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventTagWhereInputSchema),z.lazy(() => EventTagWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  events: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict());

export const EventTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventTagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EventTagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventTagMinOrderByAggregateInputSchema).optional()
}).strict();

export const EventTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventTagScalarWhereWithAggregatesInputSchema),z.lazy(() => EventTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventTagScalarWhereWithAggregatesInputSchema),z.lazy(() => EventTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const EventWhereInputSchema: z.ZodType<Prisma.EventWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDateTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDateTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  locationDetail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  conditions: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  maxCapacity: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  overview: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contact: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EnumEventTypeFilterSchema),z.lazy(() => EventTypeSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EnumEventStatusFilterSchema),z.lazy(() => EventStatusSchema) ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prefectureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  areaId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cityId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  owner: z.union([ z.lazy(() => UserProfileScalarRelationFilterSchema),z.lazy(() => UserProfileWhereInputSchema) ]).optional(),
  attendees: z.lazy(() => UserProfileListRelationFilterSchema).optional(),
  medias: z.lazy(() => EventMediaListRelationFilterSchema).optional(),
  tags: z.lazy(() => EventTagListRelationFilterSchema).optional(),
  prefecture: z.union([ z.lazy(() => PrefectureNullableScalarRelationFilterSchema),z.lazy(() => PrefectureWhereInputSchema) ]).optional().nullable(),
  area: z.union([ z.lazy(() => AreaNullableScalarRelationFilterSchema),z.lazy(() => AreaWhereInputSchema) ]).optional().nullable(),
  city: z.union([ z.lazy(() => CityNullableScalarRelationFilterSchema),z.lazy(() => CityWhereInputSchema) ]).optional().nullable(),
}).strict();

export const EventOrderByWithRelationInputSchema: z.ZodType<Prisma.EventOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDateTime: z.lazy(() => SortOrderSchema).optional(),
  endDateTime: z.lazy(() => SortOrderSchema).optional(),
  locationDetail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  onlineLocationDetail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  conditions: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  maxCapacity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  overview: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contact: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  eventType: z.lazy(() => SortOrderSchema).optional(),
  eventStatus: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  prefectureId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  areaId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cityId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  owner: z.lazy(() => UserProfileOrderByWithRelationInputSchema).optional(),
  attendees: z.lazy(() => UserProfileOrderByRelationAggregateInputSchema).optional(),
  medias: z.lazy(() => EventMediaOrderByRelationAggregateInputSchema).optional(),
  tags: z.lazy(() => EventTagOrderByRelationAggregateInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureOrderByWithRelationInputSchema).optional(),
  area: z.lazy(() => AreaOrderByWithRelationInputSchema).optional(),
  city: z.lazy(() => CityOrderByWithRelationInputSchema).optional()
}).strict();

export const EventWhereUniqueInputSchema: z.ZodType<Prisma.EventWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDateTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDateTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  locationDetail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  conditions: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  maxCapacity: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  overview: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contact: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EnumEventTypeFilterSchema),z.lazy(() => EventTypeSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EnumEventStatusFilterSchema),z.lazy(() => EventStatusSchema) ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prefectureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  areaId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cityId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  owner: z.union([ z.lazy(() => UserProfileScalarRelationFilterSchema),z.lazy(() => UserProfileWhereInputSchema) ]).optional(),
  attendees: z.lazy(() => UserProfileListRelationFilterSchema).optional(),
  medias: z.lazy(() => EventMediaListRelationFilterSchema).optional(),
  tags: z.lazy(() => EventTagListRelationFilterSchema).optional(),
  prefecture: z.union([ z.lazy(() => PrefectureNullableScalarRelationFilterSchema),z.lazy(() => PrefectureWhereInputSchema) ]).optional().nullable(),
  area: z.union([ z.lazy(() => AreaNullableScalarRelationFilterSchema),z.lazy(() => AreaWhereInputSchema) ]).optional().nullable(),
  city: z.union([ z.lazy(() => CityNullableScalarRelationFilterSchema),z.lazy(() => CityWhereInputSchema) ]).optional().nullable(),
}).strict());

export const EventOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDateTime: z.lazy(() => SortOrderSchema).optional(),
  endDateTime: z.lazy(() => SortOrderSchema).optional(),
  locationDetail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  onlineLocationDetail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  conditions: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  maxCapacity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  overview: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contact: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  eventType: z.lazy(() => SortOrderSchema).optional(),
  eventStatus: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  prefectureId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  areaId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cityId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => EventCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventMinOrderByAggregateInputSchema).optional()
}).strict();

export const EventScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  startDateTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endDateTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  locationDetail: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  conditions: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  maxCapacity: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  overview: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  contact: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EnumEventTypeWithAggregatesFilterSchema),z.lazy(() => EventTypeSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EnumEventStatusWithAggregatesFilterSchema),z.lazy(() => EventStatusSchema) ]).optional(),
  ownerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  prefectureId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  areaId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  cityId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  profile: z.lazy(() => UserProfileCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  profile: z.lazy(() => UserProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => UserProfileUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => UserProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  ownedEvents: z.lazy(() => EventCreateNestedManyWithoutOwnerInputSchema).optional(),
  attendingEvents: z.lazy(() => EventCreateNestedManyWithoutAttendeesInputSchema).optional()
}).strict();

export const UserProfileUncheckedCreateInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  personalId: z.string(),
  displayName: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  ownedEvents: z.lazy(() => EventUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  attendingEvents: z.lazy(() => EventUncheckedCreateNestedManyWithoutAttendeesInputSchema).optional()
}).strict();

export const UserProfileUpdateInputSchema: z.ZodType<Prisma.UserProfileUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  personalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  ownedEvents: z.lazy(() => EventUpdateManyWithoutOwnerNestedInputSchema).optional(),
  attendingEvents: z.lazy(() => EventUpdateManyWithoutAttendeesNestedInputSchema).optional()
}).strict();

export const UserProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  personalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownedEvents: z.lazy(() => EventUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  attendingEvents: z.lazy(() => EventUncheckedUpdateManyWithoutAttendeesNestedInputSchema).optional()
}).strict();

export const UserProfileCreateManyInputSchema: z.ZodType<Prisma.UserProfileCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  personalId: z.string(),
  displayName: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
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
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PrefectureCreateInputSchema: z.ZodType<Prisma.PrefectureCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  areas: z.lazy(() => AreaCreateNestedManyWithoutPrefectureInputSchema).optional(),
  events: z.lazy(() => EventCreateNestedManyWithoutPrefectureInputSchema).optional(),
  cities: z.lazy(() => CityCreateNestedManyWithoutPrefectureInputSchema).optional()
}).strict();

export const PrefectureUncheckedCreateInputSchema: z.ZodType<Prisma.PrefectureUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  areas: z.lazy(() => AreaUncheckedCreateNestedManyWithoutPrefectureInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutPrefectureInputSchema).optional(),
  cities: z.lazy(() => CityUncheckedCreateNestedManyWithoutPrefectureInputSchema).optional()
}).strict();

export const PrefectureUpdateInputSchema: z.ZodType<Prisma.PrefectureUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  areas: z.lazy(() => AreaUpdateManyWithoutPrefectureNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutPrefectureNestedInputSchema).optional(),
  cities: z.lazy(() => CityUpdateManyWithoutPrefectureNestedInputSchema).optional()
}).strict();

export const PrefectureUncheckedUpdateInputSchema: z.ZodType<Prisma.PrefectureUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  areas: z.lazy(() => AreaUncheckedUpdateManyWithoutPrefectureNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutPrefectureNestedInputSchema).optional(),
  cities: z.lazy(() => CityUncheckedUpdateManyWithoutPrefectureNestedInputSchema).optional()
}).strict();

export const PrefectureCreateManyInputSchema: z.ZodType<Prisma.PrefectureCreateManyInput> = z.object({
  id: z.string(),
  name: z.string()
}).strict();

export const PrefectureUpdateManyMutationInputSchema: z.ZodType<Prisma.PrefectureUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PrefectureUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PrefectureUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AreaCreateInputSchema: z.ZodType<Prisma.AreaCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  cities: z.lazy(() => CityCreateNestedManyWithoutAreaInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureCreateNestedOneWithoutAreasInputSchema),
  events: z.lazy(() => EventCreateNestedManyWithoutAreaInputSchema).optional()
}).strict();

export const AreaUncheckedCreateInputSchema: z.ZodType<Prisma.AreaUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  prefectureId: z.string(),
  cities: z.lazy(() => CityUncheckedCreateNestedManyWithoutAreaInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutAreaInputSchema).optional()
}).strict();

export const AreaUpdateInputSchema: z.ZodType<Prisma.AreaUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cities: z.lazy(() => CityUpdateManyWithoutAreaNestedInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureUpdateOneRequiredWithoutAreasNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutAreaNestedInputSchema).optional()
}).strict();

export const AreaUncheckedUpdateInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cities: z.lazy(() => CityUncheckedUpdateManyWithoutAreaNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutAreaNestedInputSchema).optional()
}).strict();

export const AreaCreateManyInputSchema: z.ZodType<Prisma.AreaCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  prefectureId: z.string()
}).strict();

export const AreaUpdateManyMutationInputSchema: z.ZodType<Prisma.AreaUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AreaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CityCreateInputSchema: z.ZodType<Prisma.CityCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  area: z.lazy(() => AreaCreateNestedOneWithoutCitiesInputSchema),
  prefecture: z.lazy(() => PrefectureCreateNestedOneWithoutCitiesInputSchema),
  events: z.lazy(() => EventCreateNestedManyWithoutCityInputSchema).optional()
}).strict();

export const CityUncheckedCreateInputSchema: z.ZodType<Prisma.CityUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  prefectureId: z.string(),
  areaId: z.string(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutCityInputSchema).optional()
}).strict();

export const CityUpdateInputSchema: z.ZodType<Prisma.CityUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  area: z.lazy(() => AreaUpdateOneRequiredWithoutCitiesNestedInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureUpdateOneRequiredWithoutCitiesNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutCityNestedInputSchema).optional()
}).strict();

export const CityUncheckedUpdateInputSchema: z.ZodType<Prisma.CityUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  areaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutCityNestedInputSchema).optional()
}).strict();

export const CityCreateManyInputSchema: z.ZodType<Prisma.CityCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  prefectureId: z.string(),
  areaId: z.string()
}).strict();

export const CityUpdateManyMutationInputSchema: z.ZodType<Prisma.CityUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  areaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventMediaCreateInputSchema: z.ZodType<Prisma.EventMediaCreateInput> = z.object({
  id: z.string().uuid().optional(),
  url: z.string(),
  event: z.lazy(() => EventCreateNestedOneWithoutMediasInputSchema)
}).strict();

export const EventMediaUncheckedCreateInputSchema: z.ZodType<Prisma.EventMediaUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  url: z.string(),
  eventId: z.string()
}).strict();

export const EventMediaUpdateInputSchema: z.ZodType<Prisma.EventMediaUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutMediasNestedInputSchema).optional()
}).strict();

export const EventMediaUncheckedUpdateInputSchema: z.ZodType<Prisma.EventMediaUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventMediaCreateManyInputSchema: z.ZodType<Prisma.EventMediaCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  url: z.string(),
  eventId: z.string()
}).strict();

export const EventMediaUpdateManyMutationInputSchema: z.ZodType<Prisma.EventMediaUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventMediaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventMediaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventTagCreateInputSchema: z.ZodType<Prisma.EventTagCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  events: z.lazy(() => EventCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export const EventTagUncheckedCreateInputSchema: z.ZodType<Prisma.EventTagUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export const EventTagUpdateInputSchema: z.ZodType<Prisma.EventTagUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  events: z.lazy(() => EventUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export const EventTagUncheckedUpdateInputSchema: z.ZodType<Prisma.EventTagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export const EventTagCreateManyInputSchema: z.ZodType<Prisma.EventTagCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string()
}).strict();

export const EventTagUpdateManyMutationInputSchema: z.ZodType<Prisma.EventTagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventTagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventCreateInputSchema: z.ZodType<Prisma.EventCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  owner: z.lazy(() => UserProfileCreateNestedOneWithoutOwnedEventsInputSchema),
  attendees: z.lazy(() => UserProfileCreateNestedManyWithoutAttendingEventsInputSchema).optional(),
  medias: z.lazy(() => EventMediaCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagCreateNestedManyWithoutEventsInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureCreateNestedOneWithoutEventsInputSchema).optional(),
  area: z.lazy(() => AreaCreateNestedOneWithoutEventsInputSchema).optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutEventsInputSchema).optional()
}).strict();

export const EventUncheckedCreateInputSchema: z.ZodType<Prisma.EventUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  ownerId: z.string(),
  prefectureId: z.string().optional().nullable(),
  areaId: z.string().optional().nullable(),
  cityId: z.string().optional().nullable(),
  attendees: z.lazy(() => UserProfileUncheckedCreateNestedManyWithoutAttendingEventsInputSchema).optional(),
  medias: z.lazy(() => EventMediaUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedCreateNestedManyWithoutEventsInputSchema).optional()
}).strict();

export const EventUpdateInputSchema: z.ZodType<Prisma.EventUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserProfileUpdateOneRequiredWithoutOwnedEventsNestedInputSchema).optional(),
  attendees: z.lazy(() => UserProfileUpdateManyWithoutAttendingEventsNestedInputSchema).optional(),
  medias: z.lazy(() => EventMediaUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUpdateManyWithoutEventsNestedInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureUpdateOneWithoutEventsNestedInputSchema).optional(),
  area: z.lazy(() => AreaUpdateOneWithoutEventsNestedInputSchema).optional(),
  city: z.lazy(() => CityUpdateOneWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateInputSchema: z.ZodType<Prisma.EventUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cityId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  attendees: z.lazy(() => UserProfileUncheckedUpdateManyWithoutAttendingEventsNestedInputSchema).optional(),
  medias: z.lazy(() => EventMediaUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedUpdateManyWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventCreateManyInputSchema: z.ZodType<Prisma.EventCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  ownerId: z.string(),
  prefectureId: z.string().optional().nullable(),
  areaId: z.string().optional().nullable(),
  cityId: z.string().optional().nullable()
}).strict();

export const EventUpdateManyMutationInputSchema: z.ZodType<Prisma.EventUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cityId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const EventListRelationFilterSchema: z.ZodType<Prisma.EventListRelationFilter> = z.object({
  every: z.lazy(() => EventWhereInputSchema).optional(),
  some: z.lazy(() => EventWhereInputSchema).optional(),
  none: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const EventOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EventOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserProfileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personalId: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserProfileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personalId: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserProfileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  personalId: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AreaListRelationFilterSchema: z.ZodType<Prisma.AreaListRelationFilter> = z.object({
  every: z.lazy(() => AreaWhereInputSchema).optional(),
  some: z.lazy(() => AreaWhereInputSchema).optional(),
  none: z.lazy(() => AreaWhereInputSchema).optional()
}).strict();

export const CityListRelationFilterSchema: z.ZodType<Prisma.CityListRelationFilter> = z.object({
  every: z.lazy(() => CityWhereInputSchema).optional(),
  some: z.lazy(() => CityWhereInputSchema).optional(),
  none: z.lazy(() => CityWhereInputSchema).optional()
}).strict();

export const AreaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AreaOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CityOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CityOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PrefectureCountOrderByAggregateInputSchema: z.ZodType<Prisma.PrefectureCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PrefectureMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PrefectureMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PrefectureMinOrderByAggregateInputSchema: z.ZodType<Prisma.PrefectureMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PrefectureScalarRelationFilterSchema: z.ZodType<Prisma.PrefectureScalarRelationFilter> = z.object({
  is: z.lazy(() => PrefectureWhereInputSchema).optional(),
  isNot: z.lazy(() => PrefectureWhereInputSchema).optional()
}).strict();

export const AreaCountOrderByAggregateInputSchema: z.ZodType<Prisma.AreaCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  prefectureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AreaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AreaMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  prefectureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AreaMinOrderByAggregateInputSchema: z.ZodType<Prisma.AreaMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  prefectureId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AreaScalarRelationFilterSchema: z.ZodType<Prisma.AreaScalarRelationFilter> = z.object({
  is: z.lazy(() => AreaWhereInputSchema).optional(),
  isNot: z.lazy(() => AreaWhereInputSchema).optional()
}).strict();

export const CityCountOrderByAggregateInputSchema: z.ZodType<Prisma.CityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  prefectureId: z.lazy(() => SortOrderSchema).optional(),
  areaId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  prefectureId: z.lazy(() => SortOrderSchema).optional(),
  areaId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CityMinOrderByAggregateInputSchema: z.ZodType<Prisma.CityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  prefectureId: z.lazy(() => SortOrderSchema).optional(),
  areaId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventScalarRelationFilterSchema: z.ZodType<Prisma.EventScalarRelationFilter> = z.object({
  is: z.lazy(() => EventWhereInputSchema).optional(),
  isNot: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const EventMediaCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventMediaCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMediaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventMediaMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMediaMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventMediaMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventTagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventTagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventTagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumEventTypeFilterSchema: z.ZodType<Prisma.EnumEventTypeFilter> = z.object({
  equals: z.lazy(() => EventTypeSchema).optional(),
  in: z.lazy(() => EventTypeSchema).array().optional(),
  notIn: z.lazy(() => EventTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => NestedEnumEventTypeFilterSchema) ]).optional(),
}).strict();

export const EnumEventStatusFilterSchema: z.ZodType<Prisma.EnumEventStatusFilter> = z.object({
  equals: z.lazy(() => EventStatusSchema).optional(),
  in: z.lazy(() => EventStatusSchema).array().optional(),
  notIn: z.lazy(() => EventStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => NestedEnumEventStatusFilterSchema) ]).optional(),
}).strict();

export const UserProfileScalarRelationFilterSchema: z.ZodType<Prisma.UserProfileScalarRelationFilter> = z.object({
  is: z.lazy(() => UserProfileWhereInputSchema).optional(),
  isNot: z.lazy(() => UserProfileWhereInputSchema).optional()
}).strict();

export const UserProfileListRelationFilterSchema: z.ZodType<Prisma.UserProfileListRelationFilter> = z.object({
  every: z.lazy(() => UserProfileWhereInputSchema).optional(),
  some: z.lazy(() => UserProfileWhereInputSchema).optional(),
  none: z.lazy(() => UserProfileWhereInputSchema).optional()
}).strict();

export const EventMediaListRelationFilterSchema: z.ZodType<Prisma.EventMediaListRelationFilter> = z.object({
  every: z.lazy(() => EventMediaWhereInputSchema).optional(),
  some: z.lazy(() => EventMediaWhereInputSchema).optional(),
  none: z.lazy(() => EventMediaWhereInputSchema).optional()
}).strict();

export const EventTagListRelationFilterSchema: z.ZodType<Prisma.EventTagListRelationFilter> = z.object({
  every: z.lazy(() => EventTagWhereInputSchema).optional(),
  some: z.lazy(() => EventTagWhereInputSchema).optional(),
  none: z.lazy(() => EventTagWhereInputSchema).optional()
}).strict();

export const PrefectureNullableScalarRelationFilterSchema: z.ZodType<Prisma.PrefectureNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PrefectureWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PrefectureWhereInputSchema).optional().nullable()
}).strict();

export const AreaNullableScalarRelationFilterSchema: z.ZodType<Prisma.AreaNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => AreaWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AreaWhereInputSchema).optional().nullable()
}).strict();

export const CityNullableScalarRelationFilterSchema: z.ZodType<Prisma.CityNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => CityWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CityWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UserProfileOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserProfileOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMediaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EventMediaOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EventTagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDateTime: z.lazy(() => SortOrderSchema).optional(),
  endDateTime: z.lazy(() => SortOrderSchema).optional(),
  locationDetail: z.lazy(() => SortOrderSchema).optional(),
  onlineLocationDetail: z.lazy(() => SortOrderSchema).optional(),
  conditions: z.lazy(() => SortOrderSchema).optional(),
  maxCapacity: z.lazy(() => SortOrderSchema).optional(),
  overview: z.lazy(() => SortOrderSchema).optional(),
  contact: z.lazy(() => SortOrderSchema).optional(),
  eventType: z.lazy(() => SortOrderSchema).optional(),
  eventStatus: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  prefectureId: z.lazy(() => SortOrderSchema).optional(),
  areaId: z.lazy(() => SortOrderSchema).optional(),
  cityId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDateTime: z.lazy(() => SortOrderSchema).optional(),
  endDateTime: z.lazy(() => SortOrderSchema).optional(),
  locationDetail: z.lazy(() => SortOrderSchema).optional(),
  onlineLocationDetail: z.lazy(() => SortOrderSchema).optional(),
  conditions: z.lazy(() => SortOrderSchema).optional(),
  maxCapacity: z.lazy(() => SortOrderSchema).optional(),
  overview: z.lazy(() => SortOrderSchema).optional(),
  contact: z.lazy(() => SortOrderSchema).optional(),
  eventType: z.lazy(() => SortOrderSchema).optional(),
  eventStatus: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  prefectureId: z.lazy(() => SortOrderSchema).optional(),
  areaId: z.lazy(() => SortOrderSchema).optional(),
  cityId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDateTime: z.lazy(() => SortOrderSchema).optional(),
  endDateTime: z.lazy(() => SortOrderSchema).optional(),
  locationDetail: z.lazy(() => SortOrderSchema).optional(),
  onlineLocationDetail: z.lazy(() => SortOrderSchema).optional(),
  conditions: z.lazy(() => SortOrderSchema).optional(),
  maxCapacity: z.lazy(() => SortOrderSchema).optional(),
  overview: z.lazy(() => SortOrderSchema).optional(),
  contact: z.lazy(() => SortOrderSchema).optional(),
  eventType: z.lazy(() => SortOrderSchema).optional(),
  eventStatus: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  prefectureId: z.lazy(() => SortOrderSchema).optional(),
  areaId: z.lazy(() => SortOrderSchema).optional(),
  cityId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const EnumEventTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEventTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EventTypeSchema).optional(),
  in: z.lazy(() => EventTypeSchema).array().optional(),
  notIn: z.lazy(() => EventTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => NestedEnumEventTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEventTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEventTypeFilterSchema).optional()
}).strict();

export const EnumEventStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEventStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EventStatusSchema).optional(),
  in: z.lazy(() => EventStatusSchema).array().optional(),
  notIn: z.lazy(() => EventStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => NestedEnumEventStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEventStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEventStatusFilterSchema).optional()
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

export const EventCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.EventCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutOwnerInputSchema),z.lazy(() => EventCreateWithoutOwnerInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => EventUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => EventCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventCreateNestedManyWithoutAttendeesInputSchema: z.ZodType<Prisma.EventCreateNestedManyWithoutAttendeesInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutAttendeesInputSchema),z.lazy(() => EventCreateWithoutAttendeesInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutAttendeesInputSchema),z.lazy(() => EventUncheckedCreateWithoutAttendeesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutAttendeesInputSchema),z.lazy(() => EventCreateOrConnectWithoutAttendeesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.EventUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutOwnerInputSchema),z.lazy(() => EventCreateWithoutOwnerInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => EventUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => EventCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedCreateNestedManyWithoutAttendeesInputSchema: z.ZodType<Prisma.EventUncheckedCreateNestedManyWithoutAttendeesInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutAttendeesInputSchema),z.lazy(() => EventCreateWithoutAttendeesInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutAttendeesInputSchema),z.lazy(() => EventUncheckedCreateWithoutAttendeesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutAttendeesInputSchema),z.lazy(() => EventCreateOrConnectWithoutAttendeesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutProfileNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutProfileInputSchema),z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]).optional(),
}).strict();

export const EventUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.EventUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutOwnerInputSchema),z.lazy(() => EventCreateWithoutOwnerInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => EventUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => EventCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUpdateManyWithoutAttendeesNestedInputSchema: z.ZodType<Prisma.EventUpdateManyWithoutAttendeesNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutAttendeesInputSchema),z.lazy(() => EventCreateWithoutAttendeesInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutAttendeesInputSchema),z.lazy(() => EventUncheckedCreateWithoutAttendeesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutAttendeesInputSchema),z.lazy(() => EventCreateOrConnectWithoutAttendeesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutAttendeesInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutAttendeesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutAttendeesInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutAttendeesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutAttendeesInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutAttendeesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutOwnerInputSchema),z.lazy(() => EventCreateWithoutOwnerInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => EventUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => EventCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedUpdateManyWithoutAttendeesNestedInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutAttendeesNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutAttendeesInputSchema),z.lazy(() => EventCreateWithoutAttendeesInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutAttendeesInputSchema),z.lazy(() => EventUncheckedCreateWithoutAttendeesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutAttendeesInputSchema),z.lazy(() => EventCreateOrConnectWithoutAttendeesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutAttendeesInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutAttendeesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutAttendeesInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutAttendeesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutAttendeesInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutAttendeesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AreaCreateNestedManyWithoutPrefectureInputSchema: z.ZodType<Prisma.AreaCreateNestedManyWithoutPrefectureInput> = z.object({
  create: z.union([ z.lazy(() => AreaCreateWithoutPrefectureInputSchema),z.lazy(() => AreaCreateWithoutPrefectureInputSchema).array(),z.lazy(() => AreaUncheckedCreateWithoutPrefectureInputSchema),z.lazy(() => AreaUncheckedCreateWithoutPrefectureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AreaCreateOrConnectWithoutPrefectureInputSchema),z.lazy(() => AreaCreateOrConnectWithoutPrefectureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AreaCreateManyPrefectureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventCreateNestedManyWithoutPrefectureInputSchema: z.ZodType<Prisma.EventCreateNestedManyWithoutPrefectureInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutPrefectureInputSchema),z.lazy(() => EventCreateWithoutPrefectureInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutPrefectureInputSchema),z.lazy(() => EventUncheckedCreateWithoutPrefectureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutPrefectureInputSchema),z.lazy(() => EventCreateOrConnectWithoutPrefectureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyPrefectureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CityCreateNestedManyWithoutPrefectureInputSchema: z.ZodType<Prisma.CityCreateNestedManyWithoutPrefectureInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutPrefectureInputSchema),z.lazy(() => CityCreateWithoutPrefectureInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutPrefectureInputSchema),z.lazy(() => CityUncheckedCreateWithoutPrefectureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutPrefectureInputSchema),z.lazy(() => CityCreateOrConnectWithoutPrefectureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyPrefectureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AreaUncheckedCreateNestedManyWithoutPrefectureInputSchema: z.ZodType<Prisma.AreaUncheckedCreateNestedManyWithoutPrefectureInput> = z.object({
  create: z.union([ z.lazy(() => AreaCreateWithoutPrefectureInputSchema),z.lazy(() => AreaCreateWithoutPrefectureInputSchema).array(),z.lazy(() => AreaUncheckedCreateWithoutPrefectureInputSchema),z.lazy(() => AreaUncheckedCreateWithoutPrefectureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AreaCreateOrConnectWithoutPrefectureInputSchema),z.lazy(() => AreaCreateOrConnectWithoutPrefectureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AreaCreateManyPrefectureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedCreateNestedManyWithoutPrefectureInputSchema: z.ZodType<Prisma.EventUncheckedCreateNestedManyWithoutPrefectureInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutPrefectureInputSchema),z.lazy(() => EventCreateWithoutPrefectureInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutPrefectureInputSchema),z.lazy(() => EventUncheckedCreateWithoutPrefectureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutPrefectureInputSchema),z.lazy(() => EventCreateOrConnectWithoutPrefectureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyPrefectureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CityUncheckedCreateNestedManyWithoutPrefectureInputSchema: z.ZodType<Prisma.CityUncheckedCreateNestedManyWithoutPrefectureInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutPrefectureInputSchema),z.lazy(() => CityCreateWithoutPrefectureInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutPrefectureInputSchema),z.lazy(() => CityUncheckedCreateWithoutPrefectureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutPrefectureInputSchema),z.lazy(() => CityCreateOrConnectWithoutPrefectureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyPrefectureInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AreaUpdateManyWithoutPrefectureNestedInputSchema: z.ZodType<Prisma.AreaUpdateManyWithoutPrefectureNestedInput> = z.object({
  create: z.union([ z.lazy(() => AreaCreateWithoutPrefectureInputSchema),z.lazy(() => AreaCreateWithoutPrefectureInputSchema).array(),z.lazy(() => AreaUncheckedCreateWithoutPrefectureInputSchema),z.lazy(() => AreaUncheckedCreateWithoutPrefectureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AreaCreateOrConnectWithoutPrefectureInputSchema),z.lazy(() => AreaCreateOrConnectWithoutPrefectureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AreaUpsertWithWhereUniqueWithoutPrefectureInputSchema),z.lazy(() => AreaUpsertWithWhereUniqueWithoutPrefectureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AreaCreateManyPrefectureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AreaUpdateWithWhereUniqueWithoutPrefectureInputSchema),z.lazy(() => AreaUpdateWithWhereUniqueWithoutPrefectureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AreaUpdateManyWithWhereWithoutPrefectureInputSchema),z.lazy(() => AreaUpdateManyWithWhereWithoutPrefectureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AreaScalarWhereInputSchema),z.lazy(() => AreaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUpdateManyWithoutPrefectureNestedInputSchema: z.ZodType<Prisma.EventUpdateManyWithoutPrefectureNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutPrefectureInputSchema),z.lazy(() => EventCreateWithoutPrefectureInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutPrefectureInputSchema),z.lazy(() => EventUncheckedCreateWithoutPrefectureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutPrefectureInputSchema),z.lazy(() => EventCreateOrConnectWithoutPrefectureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutPrefectureInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutPrefectureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyPrefectureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutPrefectureInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutPrefectureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutPrefectureInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutPrefectureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CityUpdateManyWithoutPrefectureNestedInputSchema: z.ZodType<Prisma.CityUpdateManyWithoutPrefectureNestedInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutPrefectureInputSchema),z.lazy(() => CityCreateWithoutPrefectureInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutPrefectureInputSchema),z.lazy(() => CityUncheckedCreateWithoutPrefectureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutPrefectureInputSchema),z.lazy(() => CityCreateOrConnectWithoutPrefectureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CityUpsertWithWhereUniqueWithoutPrefectureInputSchema),z.lazy(() => CityUpsertWithWhereUniqueWithoutPrefectureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyPrefectureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CityUpdateWithWhereUniqueWithoutPrefectureInputSchema),z.lazy(() => CityUpdateWithWhereUniqueWithoutPrefectureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CityUpdateManyWithWhereWithoutPrefectureInputSchema),z.lazy(() => CityUpdateManyWithWhereWithoutPrefectureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CityScalarWhereInputSchema),z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AreaUncheckedUpdateManyWithoutPrefectureNestedInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateManyWithoutPrefectureNestedInput> = z.object({
  create: z.union([ z.lazy(() => AreaCreateWithoutPrefectureInputSchema),z.lazy(() => AreaCreateWithoutPrefectureInputSchema).array(),z.lazy(() => AreaUncheckedCreateWithoutPrefectureInputSchema),z.lazy(() => AreaUncheckedCreateWithoutPrefectureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AreaCreateOrConnectWithoutPrefectureInputSchema),z.lazy(() => AreaCreateOrConnectWithoutPrefectureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AreaUpsertWithWhereUniqueWithoutPrefectureInputSchema),z.lazy(() => AreaUpsertWithWhereUniqueWithoutPrefectureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AreaCreateManyPrefectureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AreaUpdateWithWhereUniqueWithoutPrefectureInputSchema),z.lazy(() => AreaUpdateWithWhereUniqueWithoutPrefectureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AreaUpdateManyWithWhereWithoutPrefectureInputSchema),z.lazy(() => AreaUpdateManyWithWhereWithoutPrefectureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AreaScalarWhereInputSchema),z.lazy(() => AreaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedUpdateManyWithoutPrefectureNestedInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutPrefectureNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutPrefectureInputSchema),z.lazy(() => EventCreateWithoutPrefectureInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutPrefectureInputSchema),z.lazy(() => EventUncheckedCreateWithoutPrefectureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutPrefectureInputSchema),z.lazy(() => EventCreateOrConnectWithoutPrefectureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutPrefectureInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutPrefectureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyPrefectureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutPrefectureInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutPrefectureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutPrefectureInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutPrefectureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CityUncheckedUpdateManyWithoutPrefectureNestedInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyWithoutPrefectureNestedInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutPrefectureInputSchema),z.lazy(() => CityCreateWithoutPrefectureInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutPrefectureInputSchema),z.lazy(() => CityUncheckedCreateWithoutPrefectureInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutPrefectureInputSchema),z.lazy(() => CityCreateOrConnectWithoutPrefectureInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CityUpsertWithWhereUniqueWithoutPrefectureInputSchema),z.lazy(() => CityUpsertWithWhereUniqueWithoutPrefectureInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyPrefectureInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CityUpdateWithWhereUniqueWithoutPrefectureInputSchema),z.lazy(() => CityUpdateWithWhereUniqueWithoutPrefectureInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CityUpdateManyWithWhereWithoutPrefectureInputSchema),z.lazy(() => CityUpdateManyWithWhereWithoutPrefectureInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CityScalarWhereInputSchema),z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CityCreateNestedManyWithoutAreaInputSchema: z.ZodType<Prisma.CityCreateNestedManyWithoutAreaInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutAreaInputSchema),z.lazy(() => CityCreateWithoutAreaInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutAreaInputSchema),z.lazy(() => CityUncheckedCreateWithoutAreaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutAreaInputSchema),z.lazy(() => CityCreateOrConnectWithoutAreaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyAreaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PrefectureCreateNestedOneWithoutAreasInputSchema: z.ZodType<Prisma.PrefectureCreateNestedOneWithoutAreasInput> = z.object({
  create: z.union([ z.lazy(() => PrefectureCreateWithoutAreasInputSchema),z.lazy(() => PrefectureUncheckedCreateWithoutAreasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PrefectureCreateOrConnectWithoutAreasInputSchema).optional(),
  connect: z.lazy(() => PrefectureWhereUniqueInputSchema).optional()
}).strict();

export const EventCreateNestedManyWithoutAreaInputSchema: z.ZodType<Prisma.EventCreateNestedManyWithoutAreaInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutAreaInputSchema),z.lazy(() => EventCreateWithoutAreaInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutAreaInputSchema),z.lazy(() => EventUncheckedCreateWithoutAreaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutAreaInputSchema),z.lazy(() => EventCreateOrConnectWithoutAreaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyAreaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CityUncheckedCreateNestedManyWithoutAreaInputSchema: z.ZodType<Prisma.CityUncheckedCreateNestedManyWithoutAreaInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutAreaInputSchema),z.lazy(() => CityCreateWithoutAreaInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutAreaInputSchema),z.lazy(() => CityUncheckedCreateWithoutAreaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutAreaInputSchema),z.lazy(() => CityCreateOrConnectWithoutAreaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyAreaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedCreateNestedManyWithoutAreaInputSchema: z.ZodType<Prisma.EventUncheckedCreateNestedManyWithoutAreaInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutAreaInputSchema),z.lazy(() => EventCreateWithoutAreaInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutAreaInputSchema),z.lazy(() => EventUncheckedCreateWithoutAreaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutAreaInputSchema),z.lazy(() => EventCreateOrConnectWithoutAreaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyAreaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CityUpdateManyWithoutAreaNestedInputSchema: z.ZodType<Prisma.CityUpdateManyWithoutAreaNestedInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutAreaInputSchema),z.lazy(() => CityCreateWithoutAreaInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutAreaInputSchema),z.lazy(() => CityUncheckedCreateWithoutAreaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutAreaInputSchema),z.lazy(() => CityCreateOrConnectWithoutAreaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CityUpsertWithWhereUniqueWithoutAreaInputSchema),z.lazy(() => CityUpsertWithWhereUniqueWithoutAreaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyAreaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CityUpdateWithWhereUniqueWithoutAreaInputSchema),z.lazy(() => CityUpdateWithWhereUniqueWithoutAreaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CityUpdateManyWithWhereWithoutAreaInputSchema),z.lazy(() => CityUpdateManyWithWhereWithoutAreaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CityScalarWhereInputSchema),z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PrefectureUpdateOneRequiredWithoutAreasNestedInputSchema: z.ZodType<Prisma.PrefectureUpdateOneRequiredWithoutAreasNestedInput> = z.object({
  create: z.union([ z.lazy(() => PrefectureCreateWithoutAreasInputSchema),z.lazy(() => PrefectureUncheckedCreateWithoutAreasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PrefectureCreateOrConnectWithoutAreasInputSchema).optional(),
  upsert: z.lazy(() => PrefectureUpsertWithoutAreasInputSchema).optional(),
  connect: z.lazy(() => PrefectureWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PrefectureUpdateToOneWithWhereWithoutAreasInputSchema),z.lazy(() => PrefectureUpdateWithoutAreasInputSchema),z.lazy(() => PrefectureUncheckedUpdateWithoutAreasInputSchema) ]).optional(),
}).strict();

export const EventUpdateManyWithoutAreaNestedInputSchema: z.ZodType<Prisma.EventUpdateManyWithoutAreaNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutAreaInputSchema),z.lazy(() => EventCreateWithoutAreaInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutAreaInputSchema),z.lazy(() => EventUncheckedCreateWithoutAreaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutAreaInputSchema),z.lazy(() => EventCreateOrConnectWithoutAreaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutAreaInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutAreaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyAreaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutAreaInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutAreaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutAreaInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutAreaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CityUncheckedUpdateManyWithoutAreaNestedInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyWithoutAreaNestedInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutAreaInputSchema),z.lazy(() => CityCreateWithoutAreaInputSchema).array(),z.lazy(() => CityUncheckedCreateWithoutAreaInputSchema),z.lazy(() => CityUncheckedCreateWithoutAreaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CityCreateOrConnectWithoutAreaInputSchema),z.lazy(() => CityCreateOrConnectWithoutAreaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CityUpsertWithWhereUniqueWithoutAreaInputSchema),z.lazy(() => CityUpsertWithWhereUniqueWithoutAreaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CityCreateManyAreaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CityWhereUniqueInputSchema),z.lazy(() => CityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CityUpdateWithWhereUniqueWithoutAreaInputSchema),z.lazy(() => CityUpdateWithWhereUniqueWithoutAreaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CityUpdateManyWithWhereWithoutAreaInputSchema),z.lazy(() => CityUpdateManyWithWhereWithoutAreaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CityScalarWhereInputSchema),z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedUpdateManyWithoutAreaNestedInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutAreaNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutAreaInputSchema),z.lazy(() => EventCreateWithoutAreaInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutAreaInputSchema),z.lazy(() => EventUncheckedCreateWithoutAreaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutAreaInputSchema),z.lazy(() => EventCreateOrConnectWithoutAreaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutAreaInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutAreaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyAreaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutAreaInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutAreaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutAreaInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutAreaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AreaCreateNestedOneWithoutCitiesInputSchema: z.ZodType<Prisma.AreaCreateNestedOneWithoutCitiesInput> = z.object({
  create: z.union([ z.lazy(() => AreaCreateWithoutCitiesInputSchema),z.lazy(() => AreaUncheckedCreateWithoutCitiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AreaCreateOrConnectWithoutCitiesInputSchema).optional(),
  connect: z.lazy(() => AreaWhereUniqueInputSchema).optional()
}).strict();

export const PrefectureCreateNestedOneWithoutCitiesInputSchema: z.ZodType<Prisma.PrefectureCreateNestedOneWithoutCitiesInput> = z.object({
  create: z.union([ z.lazy(() => PrefectureCreateWithoutCitiesInputSchema),z.lazy(() => PrefectureUncheckedCreateWithoutCitiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PrefectureCreateOrConnectWithoutCitiesInputSchema).optional(),
  connect: z.lazy(() => PrefectureWhereUniqueInputSchema).optional()
}).strict();

export const EventCreateNestedManyWithoutCityInputSchema: z.ZodType<Prisma.EventCreateNestedManyWithoutCityInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutCityInputSchema),z.lazy(() => EventCreateWithoutCityInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutCityInputSchema),z.lazy(() => EventUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutCityInputSchema),z.lazy(() => EventCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyCityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedCreateNestedManyWithoutCityInputSchema: z.ZodType<Prisma.EventUncheckedCreateNestedManyWithoutCityInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutCityInputSchema),z.lazy(() => EventCreateWithoutCityInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutCityInputSchema),z.lazy(() => EventUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutCityInputSchema),z.lazy(() => EventCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyCityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AreaUpdateOneRequiredWithoutCitiesNestedInputSchema: z.ZodType<Prisma.AreaUpdateOneRequiredWithoutCitiesNestedInput> = z.object({
  create: z.union([ z.lazy(() => AreaCreateWithoutCitiesInputSchema),z.lazy(() => AreaUncheckedCreateWithoutCitiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AreaCreateOrConnectWithoutCitiesInputSchema).optional(),
  upsert: z.lazy(() => AreaUpsertWithoutCitiesInputSchema).optional(),
  connect: z.lazy(() => AreaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AreaUpdateToOneWithWhereWithoutCitiesInputSchema),z.lazy(() => AreaUpdateWithoutCitiesInputSchema),z.lazy(() => AreaUncheckedUpdateWithoutCitiesInputSchema) ]).optional(),
}).strict();

export const PrefectureUpdateOneRequiredWithoutCitiesNestedInputSchema: z.ZodType<Prisma.PrefectureUpdateOneRequiredWithoutCitiesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PrefectureCreateWithoutCitiesInputSchema),z.lazy(() => PrefectureUncheckedCreateWithoutCitiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PrefectureCreateOrConnectWithoutCitiesInputSchema).optional(),
  upsert: z.lazy(() => PrefectureUpsertWithoutCitiesInputSchema).optional(),
  connect: z.lazy(() => PrefectureWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PrefectureUpdateToOneWithWhereWithoutCitiesInputSchema),z.lazy(() => PrefectureUpdateWithoutCitiesInputSchema),z.lazy(() => PrefectureUncheckedUpdateWithoutCitiesInputSchema) ]).optional(),
}).strict();

export const EventUpdateManyWithoutCityNestedInputSchema: z.ZodType<Prisma.EventUpdateManyWithoutCityNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutCityInputSchema),z.lazy(() => EventCreateWithoutCityInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutCityInputSchema),z.lazy(() => EventUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutCityInputSchema),z.lazy(() => EventCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutCityInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyCityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutCityInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutCityInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutCityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedUpdateManyWithoutCityNestedInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutCityNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutCityInputSchema),z.lazy(() => EventCreateWithoutCityInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutCityInputSchema),z.lazy(() => EventUncheckedCreateWithoutCityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutCityInputSchema),z.lazy(() => EventCreateOrConnectWithoutCityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutCityInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyCityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutCityInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutCityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutCityInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutCityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventCreateNestedOneWithoutMediasInputSchema: z.ZodType<Prisma.EventCreateNestedOneWithoutMediasInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutMediasInputSchema),z.lazy(() => EventUncheckedCreateWithoutMediasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutMediasInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional()
}).strict();

export const EventUpdateOneRequiredWithoutMediasNestedInputSchema: z.ZodType<Prisma.EventUpdateOneRequiredWithoutMediasNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutMediasInputSchema),z.lazy(() => EventUncheckedCreateWithoutMediasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutMediasInputSchema).optional(),
  upsert: z.lazy(() => EventUpsertWithoutMediasInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EventUpdateToOneWithWhereWithoutMediasInputSchema),z.lazy(() => EventUpdateWithoutMediasInputSchema),z.lazy(() => EventUncheckedUpdateWithoutMediasInputSchema) ]).optional(),
}).strict();

export const EventCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.EventCreateNestedManyWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutTagsInputSchema),z.lazy(() => EventCreateWithoutTagsInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutTagsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutTagsInputSchema),z.lazy(() => EventCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.EventUncheckedCreateNestedManyWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutTagsInputSchema),z.lazy(() => EventCreateWithoutTagsInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutTagsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutTagsInputSchema),z.lazy(() => EventCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.EventUpdateManyWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutTagsInputSchema),z.lazy(() => EventCreateWithoutTagsInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutTagsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutTagsInputSchema),z.lazy(() => EventCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutTagsInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutTagsInputSchema),z.lazy(() => EventCreateWithoutTagsInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutTagsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutTagsInputSchema),z.lazy(() => EventCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutTagsInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserProfileCreateNestedOneWithoutOwnedEventsInputSchema: z.ZodType<Prisma.UserProfileCreateNestedOneWithoutOwnedEventsInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutOwnedEventsInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutOwnedEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProfileCreateOrConnectWithoutOwnedEventsInputSchema).optional(),
  connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional()
}).strict();

export const UserProfileCreateNestedManyWithoutAttendingEventsInputSchema: z.ZodType<Prisma.UserProfileCreateNestedManyWithoutAttendingEventsInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileCreateWithoutAttendingEventsInputSchema).array(),z.lazy(() => UserProfileUncheckedCreateWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutAttendingEventsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProfileCreateOrConnectWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileCreateOrConnectWithoutAttendingEventsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProfileWhereUniqueInputSchema),z.lazy(() => UserProfileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventMediaCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.EventMediaCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => EventMediaCreateWithoutEventInputSchema),z.lazy(() => EventMediaCreateWithoutEventInputSchema).array(),z.lazy(() => EventMediaUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventMediaUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventMediaCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventMediaCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventMediaCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventMediaWhereUniqueInputSchema),z.lazy(() => EventMediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventTagCreateNestedManyWithoutEventsInputSchema: z.ZodType<Prisma.EventTagCreateNestedManyWithoutEventsInput> = z.object({
  create: z.union([ z.lazy(() => EventTagCreateWithoutEventsInputSchema),z.lazy(() => EventTagCreateWithoutEventsInputSchema).array(),z.lazy(() => EventTagUncheckedCreateWithoutEventsInputSchema),z.lazy(() => EventTagUncheckedCreateWithoutEventsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventTagCreateOrConnectWithoutEventsInputSchema),z.lazy(() => EventTagCreateOrConnectWithoutEventsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PrefectureCreateNestedOneWithoutEventsInputSchema: z.ZodType<Prisma.PrefectureCreateNestedOneWithoutEventsInput> = z.object({
  create: z.union([ z.lazy(() => PrefectureCreateWithoutEventsInputSchema),z.lazy(() => PrefectureUncheckedCreateWithoutEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PrefectureCreateOrConnectWithoutEventsInputSchema).optional(),
  connect: z.lazy(() => PrefectureWhereUniqueInputSchema).optional()
}).strict();

export const AreaCreateNestedOneWithoutEventsInputSchema: z.ZodType<Prisma.AreaCreateNestedOneWithoutEventsInput> = z.object({
  create: z.union([ z.lazy(() => AreaCreateWithoutEventsInputSchema),z.lazy(() => AreaUncheckedCreateWithoutEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AreaCreateOrConnectWithoutEventsInputSchema).optional(),
  connect: z.lazy(() => AreaWhereUniqueInputSchema).optional()
}).strict();

export const CityCreateNestedOneWithoutEventsInputSchema: z.ZodType<Prisma.CityCreateNestedOneWithoutEventsInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutEventsInputSchema),z.lazy(() => CityUncheckedCreateWithoutEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CityCreateOrConnectWithoutEventsInputSchema).optional(),
  connect: z.lazy(() => CityWhereUniqueInputSchema).optional()
}).strict();

export const UserProfileUncheckedCreateNestedManyWithoutAttendingEventsInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateNestedManyWithoutAttendingEventsInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileCreateWithoutAttendingEventsInputSchema).array(),z.lazy(() => UserProfileUncheckedCreateWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutAttendingEventsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProfileCreateOrConnectWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileCreateOrConnectWithoutAttendingEventsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProfileWhereUniqueInputSchema),z.lazy(() => UserProfileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventMediaUncheckedCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.EventMediaUncheckedCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => EventMediaCreateWithoutEventInputSchema),z.lazy(() => EventMediaCreateWithoutEventInputSchema).array(),z.lazy(() => EventMediaUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventMediaUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventMediaCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventMediaCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventMediaCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventMediaWhereUniqueInputSchema),z.lazy(() => EventMediaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventTagUncheckedCreateNestedManyWithoutEventsInputSchema: z.ZodType<Prisma.EventTagUncheckedCreateNestedManyWithoutEventsInput> = z.object({
  create: z.union([ z.lazy(() => EventTagCreateWithoutEventsInputSchema),z.lazy(() => EventTagCreateWithoutEventsInputSchema).array(),z.lazy(() => EventTagUncheckedCreateWithoutEventsInputSchema),z.lazy(() => EventTagUncheckedCreateWithoutEventsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventTagCreateOrConnectWithoutEventsInputSchema),z.lazy(() => EventTagCreateOrConnectWithoutEventsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const EnumEventTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEventTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EventTypeSchema).optional()
}).strict();

export const EnumEventStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEventStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EventStatusSchema).optional()
}).strict();

export const UserProfileUpdateOneRequiredWithoutOwnedEventsNestedInputSchema: z.ZodType<Prisma.UserProfileUpdateOneRequiredWithoutOwnedEventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutOwnedEventsInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutOwnedEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserProfileCreateOrConnectWithoutOwnedEventsInputSchema).optional(),
  upsert: z.lazy(() => UserProfileUpsertWithoutOwnedEventsInputSchema).optional(),
  connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserProfileUpdateToOneWithWhereWithoutOwnedEventsInputSchema),z.lazy(() => UserProfileUpdateWithoutOwnedEventsInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutOwnedEventsInputSchema) ]).optional(),
}).strict();

export const UserProfileUpdateManyWithoutAttendingEventsNestedInputSchema: z.ZodType<Prisma.UserProfileUpdateManyWithoutAttendingEventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileCreateWithoutAttendingEventsInputSchema).array(),z.lazy(() => UserProfileUncheckedCreateWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutAttendingEventsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProfileCreateOrConnectWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileCreateOrConnectWithoutAttendingEventsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserProfileUpsertWithWhereUniqueWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileUpsertWithWhereUniqueWithoutAttendingEventsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserProfileWhereUniqueInputSchema),z.lazy(() => UserProfileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserProfileWhereUniqueInputSchema),z.lazy(() => UserProfileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserProfileWhereUniqueInputSchema),z.lazy(() => UserProfileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProfileWhereUniqueInputSchema),z.lazy(() => UserProfileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserProfileUpdateWithWhereUniqueWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileUpdateWithWhereUniqueWithoutAttendingEventsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserProfileUpdateManyWithWhereWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileUpdateManyWithWhereWithoutAttendingEventsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserProfileScalarWhereInputSchema),z.lazy(() => UserProfileScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventMediaUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.EventMediaUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventMediaCreateWithoutEventInputSchema),z.lazy(() => EventMediaCreateWithoutEventInputSchema).array(),z.lazy(() => EventMediaUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventMediaUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventMediaCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventMediaCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventMediaUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventMediaUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventMediaCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventMediaWhereUniqueInputSchema),z.lazy(() => EventMediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventMediaWhereUniqueInputSchema),z.lazy(() => EventMediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventMediaWhereUniqueInputSchema),z.lazy(() => EventMediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventMediaWhereUniqueInputSchema),z.lazy(() => EventMediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventMediaUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventMediaUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventMediaUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => EventMediaUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventMediaScalarWhereInputSchema),z.lazy(() => EventMediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventTagUpdateManyWithoutEventsNestedInputSchema: z.ZodType<Prisma.EventTagUpdateManyWithoutEventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventTagCreateWithoutEventsInputSchema),z.lazy(() => EventTagCreateWithoutEventsInputSchema).array(),z.lazy(() => EventTagUncheckedCreateWithoutEventsInputSchema),z.lazy(() => EventTagUncheckedCreateWithoutEventsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventTagCreateOrConnectWithoutEventsInputSchema),z.lazy(() => EventTagCreateOrConnectWithoutEventsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventTagUpsertWithWhereUniqueWithoutEventsInputSchema),z.lazy(() => EventTagUpsertWithWhereUniqueWithoutEventsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventTagUpdateWithWhereUniqueWithoutEventsInputSchema),z.lazy(() => EventTagUpdateWithWhereUniqueWithoutEventsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventTagUpdateManyWithWhereWithoutEventsInputSchema),z.lazy(() => EventTagUpdateManyWithWhereWithoutEventsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventTagScalarWhereInputSchema),z.lazy(() => EventTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PrefectureUpdateOneWithoutEventsNestedInputSchema: z.ZodType<Prisma.PrefectureUpdateOneWithoutEventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PrefectureCreateWithoutEventsInputSchema),z.lazy(() => PrefectureUncheckedCreateWithoutEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PrefectureCreateOrConnectWithoutEventsInputSchema).optional(),
  upsert: z.lazy(() => PrefectureUpsertWithoutEventsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PrefectureWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PrefectureWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PrefectureWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PrefectureUpdateToOneWithWhereWithoutEventsInputSchema),z.lazy(() => PrefectureUpdateWithoutEventsInputSchema),z.lazy(() => PrefectureUncheckedUpdateWithoutEventsInputSchema) ]).optional(),
}).strict();

export const AreaUpdateOneWithoutEventsNestedInputSchema: z.ZodType<Prisma.AreaUpdateOneWithoutEventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AreaCreateWithoutEventsInputSchema),z.lazy(() => AreaUncheckedCreateWithoutEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AreaCreateOrConnectWithoutEventsInputSchema).optional(),
  upsert: z.lazy(() => AreaUpsertWithoutEventsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AreaWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AreaWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AreaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AreaUpdateToOneWithWhereWithoutEventsInputSchema),z.lazy(() => AreaUpdateWithoutEventsInputSchema),z.lazy(() => AreaUncheckedUpdateWithoutEventsInputSchema) ]).optional(),
}).strict();

export const CityUpdateOneWithoutEventsNestedInputSchema: z.ZodType<Prisma.CityUpdateOneWithoutEventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CityCreateWithoutEventsInputSchema),z.lazy(() => CityUncheckedCreateWithoutEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CityCreateOrConnectWithoutEventsInputSchema).optional(),
  upsert: z.lazy(() => CityUpsertWithoutEventsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CityWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CityWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CityUpdateToOneWithWhereWithoutEventsInputSchema),z.lazy(() => CityUpdateWithoutEventsInputSchema),z.lazy(() => CityUncheckedUpdateWithoutEventsInputSchema) ]).optional(),
}).strict();

export const UserProfileUncheckedUpdateManyWithoutAttendingEventsNestedInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateManyWithoutAttendingEventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProfileCreateWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileCreateWithoutAttendingEventsInputSchema).array(),z.lazy(() => UserProfileUncheckedCreateWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutAttendingEventsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProfileCreateOrConnectWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileCreateOrConnectWithoutAttendingEventsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserProfileUpsertWithWhereUniqueWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileUpsertWithWhereUniqueWithoutAttendingEventsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserProfileWhereUniqueInputSchema),z.lazy(() => UserProfileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserProfileWhereUniqueInputSchema),z.lazy(() => UserProfileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserProfileWhereUniqueInputSchema),z.lazy(() => UserProfileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProfileWhereUniqueInputSchema),z.lazy(() => UserProfileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserProfileUpdateWithWhereUniqueWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileUpdateWithWhereUniqueWithoutAttendingEventsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserProfileUpdateManyWithWhereWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileUpdateManyWithWhereWithoutAttendingEventsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserProfileScalarWhereInputSchema),z.lazy(() => UserProfileScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventMediaUncheckedUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.EventMediaUncheckedUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventMediaCreateWithoutEventInputSchema),z.lazy(() => EventMediaCreateWithoutEventInputSchema).array(),z.lazy(() => EventMediaUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventMediaUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventMediaCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventMediaCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventMediaUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventMediaUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventMediaCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventMediaWhereUniqueInputSchema),z.lazy(() => EventMediaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventMediaWhereUniqueInputSchema),z.lazy(() => EventMediaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventMediaWhereUniqueInputSchema),z.lazy(() => EventMediaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventMediaWhereUniqueInputSchema),z.lazy(() => EventMediaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventMediaUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventMediaUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventMediaUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => EventMediaUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventMediaScalarWhereInputSchema),z.lazy(() => EventMediaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventTagUncheckedUpdateManyWithoutEventsNestedInputSchema: z.ZodType<Prisma.EventTagUncheckedUpdateManyWithoutEventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventTagCreateWithoutEventsInputSchema),z.lazy(() => EventTagCreateWithoutEventsInputSchema).array(),z.lazy(() => EventTagUncheckedCreateWithoutEventsInputSchema),z.lazy(() => EventTagUncheckedCreateWithoutEventsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventTagCreateOrConnectWithoutEventsInputSchema),z.lazy(() => EventTagCreateOrConnectWithoutEventsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventTagUpsertWithWhereUniqueWithoutEventsInputSchema),z.lazy(() => EventTagUpsertWithWhereUniqueWithoutEventsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventTagUpdateWithWhereUniqueWithoutEventsInputSchema),z.lazy(() => EventTagUpdateWithWhereUniqueWithoutEventsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventTagUpdateManyWithWhereWithoutEventsInputSchema),z.lazy(() => EventTagUpdateManyWithWhereWithoutEventsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventTagScalarWhereInputSchema),z.lazy(() => EventTagScalarWhereInputSchema).array() ]).optional(),
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

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumEventTypeFilterSchema: z.ZodType<Prisma.NestedEnumEventTypeFilter> = z.object({
  equals: z.lazy(() => EventTypeSchema).optional(),
  in: z.lazy(() => EventTypeSchema).array().optional(),
  notIn: z.lazy(() => EventTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => NestedEnumEventTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumEventStatusFilterSchema: z.ZodType<Prisma.NestedEnumEventStatusFilter> = z.object({
  equals: z.lazy(() => EventStatusSchema).optional(),
  in: z.lazy(() => EventStatusSchema).array().optional(),
  notIn: z.lazy(() => EventStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => NestedEnumEventStatusFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumEventTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEventTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EventTypeSchema).optional(),
  in: z.lazy(() => EventTypeSchema).array().optional(),
  notIn: z.lazy(() => EventTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => NestedEnumEventTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEventTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEventTypeFilterSchema).optional()
}).strict();

export const NestedEnumEventStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEventStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EventStatusSchema).optional(),
  in: z.lazy(() => EventStatusSchema).array().optional(),
  notIn: z.lazy(() => EventStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => NestedEnumEventStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEventStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEventStatusFilterSchema).optional()
}).strict();

export const UserProfileCreateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  personalId: z.string(),
  displayName: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ownedEvents: z.lazy(() => EventCreateNestedManyWithoutOwnerInputSchema).optional(),
  attendingEvents: z.lazy(() => EventCreateNestedManyWithoutAttendeesInputSchema).optional()
}).strict();

export const UserProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  personalId: z.string(),
  displayName: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ownedEvents: z.lazy(() => EventUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  attendingEvents: z.lazy(() => EventUncheckedCreateNestedManyWithoutAttendeesInputSchema).optional()
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
  ownedEvents: z.lazy(() => EventUpdateManyWithoutOwnerNestedInputSchema).optional(),
  attendingEvents: z.lazy(() => EventUpdateManyWithoutAttendeesNestedInputSchema).optional()
}).strict();

export const UserProfileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  personalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ownedEvents: z.lazy(() => EventUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  attendingEvents: z.lazy(() => EventUncheckedUpdateManyWithoutAttendeesNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateWithoutProfileInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const EventCreateWithoutOwnerInputSchema: z.ZodType<Prisma.EventCreateWithoutOwnerInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  attendees: z.lazy(() => UserProfileCreateNestedManyWithoutAttendingEventsInputSchema).optional(),
  medias: z.lazy(() => EventMediaCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagCreateNestedManyWithoutEventsInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureCreateNestedOneWithoutEventsInputSchema).optional(),
  area: z.lazy(() => AreaCreateNestedOneWithoutEventsInputSchema).optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutEventsInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  prefectureId: z.string().optional().nullable(),
  areaId: z.string().optional().nullable(),
  cityId: z.string().optional().nullable(),
  attendees: z.lazy(() => UserProfileUncheckedCreateNestedManyWithoutAttendingEventsInputSchema).optional(),
  medias: z.lazy(() => EventMediaUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedCreateNestedManyWithoutEventsInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutOwnerInputSchema),z.lazy(() => EventUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const EventCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.EventCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventCreateManyOwnerInputSchema),z.lazy(() => EventCreateManyOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EventCreateWithoutAttendeesInputSchema: z.ZodType<Prisma.EventCreateWithoutAttendeesInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  owner: z.lazy(() => UserProfileCreateNestedOneWithoutOwnedEventsInputSchema),
  medias: z.lazy(() => EventMediaCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagCreateNestedManyWithoutEventsInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureCreateNestedOneWithoutEventsInputSchema).optional(),
  area: z.lazy(() => AreaCreateNestedOneWithoutEventsInputSchema).optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutEventsInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutAttendeesInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutAttendeesInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  ownerId: z.string(),
  prefectureId: z.string().optional().nullable(),
  areaId: z.string().optional().nullable(),
  cityId: z.string().optional().nullable(),
  medias: z.lazy(() => EventMediaUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedCreateNestedManyWithoutEventsInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutAttendeesInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutAttendeesInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutAttendeesInputSchema),z.lazy(() => EventUncheckedCreateWithoutAttendeesInputSchema) ]),
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
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventUpdateWithoutOwnerInputSchema),z.lazy(() => EventUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutOwnerInputSchema),z.lazy(() => EventUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const EventUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventUpdateWithoutOwnerInputSchema),z.lazy(() => EventUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict();

export const EventUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => EventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventUpdateManyMutationInputSchema),z.lazy(() => EventUncheckedUpdateManyWithoutOwnerInputSchema) ]),
}).strict();

export const EventScalarWhereInputSchema: z.ZodType<Prisma.EventScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDateTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDateTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  locationDetail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  conditions: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  maxCapacity: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  overview: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contact: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EnumEventTypeFilterSchema),z.lazy(() => EventTypeSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EnumEventStatusFilterSchema),z.lazy(() => EventStatusSchema) ]).optional(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prefectureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  areaId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cityId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const EventUpsertWithWhereUniqueWithoutAttendeesInputSchema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutAttendeesInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventUpdateWithoutAttendeesInputSchema),z.lazy(() => EventUncheckedUpdateWithoutAttendeesInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutAttendeesInputSchema),z.lazy(() => EventUncheckedCreateWithoutAttendeesInputSchema) ]),
}).strict();

export const EventUpdateWithWhereUniqueWithoutAttendeesInputSchema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutAttendeesInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventUpdateWithoutAttendeesInputSchema),z.lazy(() => EventUncheckedUpdateWithoutAttendeesInputSchema) ]),
}).strict();

export const EventUpdateManyWithWhereWithoutAttendeesInputSchema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutAttendeesInput> = z.object({
  where: z.lazy(() => EventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventUpdateManyMutationInputSchema),z.lazy(() => EventUncheckedUpdateManyWithoutAttendeesInputSchema) ]),
}).strict();

export const AreaCreateWithoutPrefectureInputSchema: z.ZodType<Prisma.AreaCreateWithoutPrefectureInput> = z.object({
  id: z.string(),
  name: z.string(),
  cities: z.lazy(() => CityCreateNestedManyWithoutAreaInputSchema).optional(),
  events: z.lazy(() => EventCreateNestedManyWithoutAreaInputSchema).optional()
}).strict();

export const AreaUncheckedCreateWithoutPrefectureInputSchema: z.ZodType<Prisma.AreaUncheckedCreateWithoutPrefectureInput> = z.object({
  id: z.string(),
  name: z.string(),
  cities: z.lazy(() => CityUncheckedCreateNestedManyWithoutAreaInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutAreaInputSchema).optional()
}).strict();

export const AreaCreateOrConnectWithoutPrefectureInputSchema: z.ZodType<Prisma.AreaCreateOrConnectWithoutPrefectureInput> = z.object({
  where: z.lazy(() => AreaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AreaCreateWithoutPrefectureInputSchema),z.lazy(() => AreaUncheckedCreateWithoutPrefectureInputSchema) ]),
}).strict();

export const AreaCreateManyPrefectureInputEnvelopeSchema: z.ZodType<Prisma.AreaCreateManyPrefectureInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AreaCreateManyPrefectureInputSchema),z.lazy(() => AreaCreateManyPrefectureInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EventCreateWithoutPrefectureInputSchema: z.ZodType<Prisma.EventCreateWithoutPrefectureInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  owner: z.lazy(() => UserProfileCreateNestedOneWithoutOwnedEventsInputSchema),
  attendees: z.lazy(() => UserProfileCreateNestedManyWithoutAttendingEventsInputSchema).optional(),
  medias: z.lazy(() => EventMediaCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagCreateNestedManyWithoutEventsInputSchema).optional(),
  area: z.lazy(() => AreaCreateNestedOneWithoutEventsInputSchema).optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutEventsInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutPrefectureInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutPrefectureInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  ownerId: z.string(),
  areaId: z.string().optional().nullable(),
  cityId: z.string().optional().nullable(),
  attendees: z.lazy(() => UserProfileUncheckedCreateNestedManyWithoutAttendingEventsInputSchema).optional(),
  medias: z.lazy(() => EventMediaUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedCreateNestedManyWithoutEventsInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutPrefectureInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutPrefectureInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutPrefectureInputSchema),z.lazy(() => EventUncheckedCreateWithoutPrefectureInputSchema) ]),
}).strict();

export const EventCreateManyPrefectureInputEnvelopeSchema: z.ZodType<Prisma.EventCreateManyPrefectureInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventCreateManyPrefectureInputSchema),z.lazy(() => EventCreateManyPrefectureInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CityCreateWithoutPrefectureInputSchema: z.ZodType<Prisma.CityCreateWithoutPrefectureInput> = z.object({
  id: z.string(),
  name: z.string(),
  area: z.lazy(() => AreaCreateNestedOneWithoutCitiesInputSchema),
  events: z.lazy(() => EventCreateNestedManyWithoutCityInputSchema).optional()
}).strict();

export const CityUncheckedCreateWithoutPrefectureInputSchema: z.ZodType<Prisma.CityUncheckedCreateWithoutPrefectureInput> = z.object({
  id: z.string(),
  name: z.string(),
  areaId: z.string(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutCityInputSchema).optional()
}).strict();

export const CityCreateOrConnectWithoutPrefectureInputSchema: z.ZodType<Prisma.CityCreateOrConnectWithoutPrefectureInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CityCreateWithoutPrefectureInputSchema),z.lazy(() => CityUncheckedCreateWithoutPrefectureInputSchema) ]),
}).strict();

export const CityCreateManyPrefectureInputEnvelopeSchema: z.ZodType<Prisma.CityCreateManyPrefectureInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CityCreateManyPrefectureInputSchema),z.lazy(() => CityCreateManyPrefectureInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AreaUpsertWithWhereUniqueWithoutPrefectureInputSchema: z.ZodType<Prisma.AreaUpsertWithWhereUniqueWithoutPrefectureInput> = z.object({
  where: z.lazy(() => AreaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AreaUpdateWithoutPrefectureInputSchema),z.lazy(() => AreaUncheckedUpdateWithoutPrefectureInputSchema) ]),
  create: z.union([ z.lazy(() => AreaCreateWithoutPrefectureInputSchema),z.lazy(() => AreaUncheckedCreateWithoutPrefectureInputSchema) ]),
}).strict();

export const AreaUpdateWithWhereUniqueWithoutPrefectureInputSchema: z.ZodType<Prisma.AreaUpdateWithWhereUniqueWithoutPrefectureInput> = z.object({
  where: z.lazy(() => AreaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AreaUpdateWithoutPrefectureInputSchema),z.lazy(() => AreaUncheckedUpdateWithoutPrefectureInputSchema) ]),
}).strict();

export const AreaUpdateManyWithWhereWithoutPrefectureInputSchema: z.ZodType<Prisma.AreaUpdateManyWithWhereWithoutPrefectureInput> = z.object({
  where: z.lazy(() => AreaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AreaUpdateManyMutationInputSchema),z.lazy(() => AreaUncheckedUpdateManyWithoutPrefectureInputSchema) ]),
}).strict();

export const AreaScalarWhereInputSchema: z.ZodType<Prisma.AreaScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AreaScalarWhereInputSchema),z.lazy(() => AreaScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AreaScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AreaScalarWhereInputSchema),z.lazy(() => AreaScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prefectureId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const EventUpsertWithWhereUniqueWithoutPrefectureInputSchema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutPrefectureInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventUpdateWithoutPrefectureInputSchema),z.lazy(() => EventUncheckedUpdateWithoutPrefectureInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutPrefectureInputSchema),z.lazy(() => EventUncheckedCreateWithoutPrefectureInputSchema) ]),
}).strict();

export const EventUpdateWithWhereUniqueWithoutPrefectureInputSchema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutPrefectureInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventUpdateWithoutPrefectureInputSchema),z.lazy(() => EventUncheckedUpdateWithoutPrefectureInputSchema) ]),
}).strict();

export const EventUpdateManyWithWhereWithoutPrefectureInputSchema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutPrefectureInput> = z.object({
  where: z.lazy(() => EventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventUpdateManyMutationInputSchema),z.lazy(() => EventUncheckedUpdateManyWithoutPrefectureInputSchema) ]),
}).strict();

export const CityUpsertWithWhereUniqueWithoutPrefectureInputSchema: z.ZodType<Prisma.CityUpsertWithWhereUniqueWithoutPrefectureInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CityUpdateWithoutPrefectureInputSchema),z.lazy(() => CityUncheckedUpdateWithoutPrefectureInputSchema) ]),
  create: z.union([ z.lazy(() => CityCreateWithoutPrefectureInputSchema),z.lazy(() => CityUncheckedCreateWithoutPrefectureInputSchema) ]),
}).strict();

export const CityUpdateWithWhereUniqueWithoutPrefectureInputSchema: z.ZodType<Prisma.CityUpdateWithWhereUniqueWithoutPrefectureInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CityUpdateWithoutPrefectureInputSchema),z.lazy(() => CityUncheckedUpdateWithoutPrefectureInputSchema) ]),
}).strict();

export const CityUpdateManyWithWhereWithoutPrefectureInputSchema: z.ZodType<Prisma.CityUpdateManyWithWhereWithoutPrefectureInput> = z.object({
  where: z.lazy(() => CityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CityUpdateManyMutationInputSchema),z.lazy(() => CityUncheckedUpdateManyWithoutPrefectureInputSchema) ]),
}).strict();

export const CityScalarWhereInputSchema: z.ZodType<Prisma.CityScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CityScalarWhereInputSchema),z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CityScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CityScalarWhereInputSchema),z.lazy(() => CityScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prefectureId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  areaId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const CityCreateWithoutAreaInputSchema: z.ZodType<Prisma.CityCreateWithoutAreaInput> = z.object({
  id: z.string(),
  name: z.string(),
  prefecture: z.lazy(() => PrefectureCreateNestedOneWithoutCitiesInputSchema),
  events: z.lazy(() => EventCreateNestedManyWithoutCityInputSchema).optional()
}).strict();

export const CityUncheckedCreateWithoutAreaInputSchema: z.ZodType<Prisma.CityUncheckedCreateWithoutAreaInput> = z.object({
  id: z.string(),
  name: z.string(),
  prefectureId: z.string(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutCityInputSchema).optional()
}).strict();

export const CityCreateOrConnectWithoutAreaInputSchema: z.ZodType<Prisma.CityCreateOrConnectWithoutAreaInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CityCreateWithoutAreaInputSchema),z.lazy(() => CityUncheckedCreateWithoutAreaInputSchema) ]),
}).strict();

export const CityCreateManyAreaInputEnvelopeSchema: z.ZodType<Prisma.CityCreateManyAreaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CityCreateManyAreaInputSchema),z.lazy(() => CityCreateManyAreaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PrefectureCreateWithoutAreasInputSchema: z.ZodType<Prisma.PrefectureCreateWithoutAreasInput> = z.object({
  id: z.string(),
  name: z.string(),
  events: z.lazy(() => EventCreateNestedManyWithoutPrefectureInputSchema).optional(),
  cities: z.lazy(() => CityCreateNestedManyWithoutPrefectureInputSchema).optional()
}).strict();

export const PrefectureUncheckedCreateWithoutAreasInputSchema: z.ZodType<Prisma.PrefectureUncheckedCreateWithoutAreasInput> = z.object({
  id: z.string(),
  name: z.string(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutPrefectureInputSchema).optional(),
  cities: z.lazy(() => CityUncheckedCreateNestedManyWithoutPrefectureInputSchema).optional()
}).strict();

export const PrefectureCreateOrConnectWithoutAreasInputSchema: z.ZodType<Prisma.PrefectureCreateOrConnectWithoutAreasInput> = z.object({
  where: z.lazy(() => PrefectureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PrefectureCreateWithoutAreasInputSchema),z.lazy(() => PrefectureUncheckedCreateWithoutAreasInputSchema) ]),
}).strict();

export const EventCreateWithoutAreaInputSchema: z.ZodType<Prisma.EventCreateWithoutAreaInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  owner: z.lazy(() => UserProfileCreateNestedOneWithoutOwnedEventsInputSchema),
  attendees: z.lazy(() => UserProfileCreateNestedManyWithoutAttendingEventsInputSchema).optional(),
  medias: z.lazy(() => EventMediaCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagCreateNestedManyWithoutEventsInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureCreateNestedOneWithoutEventsInputSchema).optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutEventsInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutAreaInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutAreaInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  ownerId: z.string(),
  prefectureId: z.string().optional().nullable(),
  cityId: z.string().optional().nullable(),
  attendees: z.lazy(() => UserProfileUncheckedCreateNestedManyWithoutAttendingEventsInputSchema).optional(),
  medias: z.lazy(() => EventMediaUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedCreateNestedManyWithoutEventsInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutAreaInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutAreaInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutAreaInputSchema),z.lazy(() => EventUncheckedCreateWithoutAreaInputSchema) ]),
}).strict();

export const EventCreateManyAreaInputEnvelopeSchema: z.ZodType<Prisma.EventCreateManyAreaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventCreateManyAreaInputSchema),z.lazy(() => EventCreateManyAreaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CityUpsertWithWhereUniqueWithoutAreaInputSchema: z.ZodType<Prisma.CityUpsertWithWhereUniqueWithoutAreaInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CityUpdateWithoutAreaInputSchema),z.lazy(() => CityUncheckedUpdateWithoutAreaInputSchema) ]),
  create: z.union([ z.lazy(() => CityCreateWithoutAreaInputSchema),z.lazy(() => CityUncheckedCreateWithoutAreaInputSchema) ]),
}).strict();

export const CityUpdateWithWhereUniqueWithoutAreaInputSchema: z.ZodType<Prisma.CityUpdateWithWhereUniqueWithoutAreaInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CityUpdateWithoutAreaInputSchema),z.lazy(() => CityUncheckedUpdateWithoutAreaInputSchema) ]),
}).strict();

export const CityUpdateManyWithWhereWithoutAreaInputSchema: z.ZodType<Prisma.CityUpdateManyWithWhereWithoutAreaInput> = z.object({
  where: z.lazy(() => CityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CityUpdateManyMutationInputSchema),z.lazy(() => CityUncheckedUpdateManyWithoutAreaInputSchema) ]),
}).strict();

export const PrefectureUpsertWithoutAreasInputSchema: z.ZodType<Prisma.PrefectureUpsertWithoutAreasInput> = z.object({
  update: z.union([ z.lazy(() => PrefectureUpdateWithoutAreasInputSchema),z.lazy(() => PrefectureUncheckedUpdateWithoutAreasInputSchema) ]),
  create: z.union([ z.lazy(() => PrefectureCreateWithoutAreasInputSchema),z.lazy(() => PrefectureUncheckedCreateWithoutAreasInputSchema) ]),
  where: z.lazy(() => PrefectureWhereInputSchema).optional()
}).strict();

export const PrefectureUpdateToOneWithWhereWithoutAreasInputSchema: z.ZodType<Prisma.PrefectureUpdateToOneWithWhereWithoutAreasInput> = z.object({
  where: z.lazy(() => PrefectureWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PrefectureUpdateWithoutAreasInputSchema),z.lazy(() => PrefectureUncheckedUpdateWithoutAreasInputSchema) ]),
}).strict();

export const PrefectureUpdateWithoutAreasInputSchema: z.ZodType<Prisma.PrefectureUpdateWithoutAreasInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  events: z.lazy(() => EventUpdateManyWithoutPrefectureNestedInputSchema).optional(),
  cities: z.lazy(() => CityUpdateManyWithoutPrefectureNestedInputSchema).optional()
}).strict();

export const PrefectureUncheckedUpdateWithoutAreasInputSchema: z.ZodType<Prisma.PrefectureUncheckedUpdateWithoutAreasInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutPrefectureNestedInputSchema).optional(),
  cities: z.lazy(() => CityUncheckedUpdateManyWithoutPrefectureNestedInputSchema).optional()
}).strict();

export const EventUpsertWithWhereUniqueWithoutAreaInputSchema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutAreaInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventUpdateWithoutAreaInputSchema),z.lazy(() => EventUncheckedUpdateWithoutAreaInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutAreaInputSchema),z.lazy(() => EventUncheckedCreateWithoutAreaInputSchema) ]),
}).strict();

export const EventUpdateWithWhereUniqueWithoutAreaInputSchema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutAreaInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventUpdateWithoutAreaInputSchema),z.lazy(() => EventUncheckedUpdateWithoutAreaInputSchema) ]),
}).strict();

export const EventUpdateManyWithWhereWithoutAreaInputSchema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutAreaInput> = z.object({
  where: z.lazy(() => EventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventUpdateManyMutationInputSchema),z.lazy(() => EventUncheckedUpdateManyWithoutAreaInputSchema) ]),
}).strict();

export const AreaCreateWithoutCitiesInputSchema: z.ZodType<Prisma.AreaCreateWithoutCitiesInput> = z.object({
  id: z.string(),
  name: z.string(),
  prefecture: z.lazy(() => PrefectureCreateNestedOneWithoutAreasInputSchema),
  events: z.lazy(() => EventCreateNestedManyWithoutAreaInputSchema).optional()
}).strict();

export const AreaUncheckedCreateWithoutCitiesInputSchema: z.ZodType<Prisma.AreaUncheckedCreateWithoutCitiesInput> = z.object({
  id: z.string(),
  name: z.string(),
  prefectureId: z.string(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutAreaInputSchema).optional()
}).strict();

export const AreaCreateOrConnectWithoutCitiesInputSchema: z.ZodType<Prisma.AreaCreateOrConnectWithoutCitiesInput> = z.object({
  where: z.lazy(() => AreaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AreaCreateWithoutCitiesInputSchema),z.lazy(() => AreaUncheckedCreateWithoutCitiesInputSchema) ]),
}).strict();

export const PrefectureCreateWithoutCitiesInputSchema: z.ZodType<Prisma.PrefectureCreateWithoutCitiesInput> = z.object({
  id: z.string(),
  name: z.string(),
  areas: z.lazy(() => AreaCreateNestedManyWithoutPrefectureInputSchema).optional(),
  events: z.lazy(() => EventCreateNestedManyWithoutPrefectureInputSchema).optional()
}).strict();

export const PrefectureUncheckedCreateWithoutCitiesInputSchema: z.ZodType<Prisma.PrefectureUncheckedCreateWithoutCitiesInput> = z.object({
  id: z.string(),
  name: z.string(),
  areas: z.lazy(() => AreaUncheckedCreateNestedManyWithoutPrefectureInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutPrefectureInputSchema).optional()
}).strict();

export const PrefectureCreateOrConnectWithoutCitiesInputSchema: z.ZodType<Prisma.PrefectureCreateOrConnectWithoutCitiesInput> = z.object({
  where: z.lazy(() => PrefectureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PrefectureCreateWithoutCitiesInputSchema),z.lazy(() => PrefectureUncheckedCreateWithoutCitiesInputSchema) ]),
}).strict();

export const EventCreateWithoutCityInputSchema: z.ZodType<Prisma.EventCreateWithoutCityInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  owner: z.lazy(() => UserProfileCreateNestedOneWithoutOwnedEventsInputSchema),
  attendees: z.lazy(() => UserProfileCreateNestedManyWithoutAttendingEventsInputSchema).optional(),
  medias: z.lazy(() => EventMediaCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagCreateNestedManyWithoutEventsInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureCreateNestedOneWithoutEventsInputSchema).optional(),
  area: z.lazy(() => AreaCreateNestedOneWithoutEventsInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutCityInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutCityInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  ownerId: z.string(),
  prefectureId: z.string().optional().nullable(),
  areaId: z.string().optional().nullable(),
  attendees: z.lazy(() => UserProfileUncheckedCreateNestedManyWithoutAttendingEventsInputSchema).optional(),
  medias: z.lazy(() => EventMediaUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedCreateNestedManyWithoutEventsInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutCityInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutCityInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutCityInputSchema),z.lazy(() => EventUncheckedCreateWithoutCityInputSchema) ]),
}).strict();

export const EventCreateManyCityInputEnvelopeSchema: z.ZodType<Prisma.EventCreateManyCityInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventCreateManyCityInputSchema),z.lazy(() => EventCreateManyCityInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AreaUpsertWithoutCitiesInputSchema: z.ZodType<Prisma.AreaUpsertWithoutCitiesInput> = z.object({
  update: z.union([ z.lazy(() => AreaUpdateWithoutCitiesInputSchema),z.lazy(() => AreaUncheckedUpdateWithoutCitiesInputSchema) ]),
  create: z.union([ z.lazy(() => AreaCreateWithoutCitiesInputSchema),z.lazy(() => AreaUncheckedCreateWithoutCitiesInputSchema) ]),
  where: z.lazy(() => AreaWhereInputSchema).optional()
}).strict();

export const AreaUpdateToOneWithWhereWithoutCitiesInputSchema: z.ZodType<Prisma.AreaUpdateToOneWithWhereWithoutCitiesInput> = z.object({
  where: z.lazy(() => AreaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AreaUpdateWithoutCitiesInputSchema),z.lazy(() => AreaUncheckedUpdateWithoutCitiesInputSchema) ]),
}).strict();

export const AreaUpdateWithoutCitiesInputSchema: z.ZodType<Prisma.AreaUpdateWithoutCitiesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefecture: z.lazy(() => PrefectureUpdateOneRequiredWithoutAreasNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutAreaNestedInputSchema).optional()
}).strict();

export const AreaUncheckedUpdateWithoutCitiesInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateWithoutCitiesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutAreaNestedInputSchema).optional()
}).strict();

export const PrefectureUpsertWithoutCitiesInputSchema: z.ZodType<Prisma.PrefectureUpsertWithoutCitiesInput> = z.object({
  update: z.union([ z.lazy(() => PrefectureUpdateWithoutCitiesInputSchema),z.lazy(() => PrefectureUncheckedUpdateWithoutCitiesInputSchema) ]),
  create: z.union([ z.lazy(() => PrefectureCreateWithoutCitiesInputSchema),z.lazy(() => PrefectureUncheckedCreateWithoutCitiesInputSchema) ]),
  where: z.lazy(() => PrefectureWhereInputSchema).optional()
}).strict();

export const PrefectureUpdateToOneWithWhereWithoutCitiesInputSchema: z.ZodType<Prisma.PrefectureUpdateToOneWithWhereWithoutCitiesInput> = z.object({
  where: z.lazy(() => PrefectureWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PrefectureUpdateWithoutCitiesInputSchema),z.lazy(() => PrefectureUncheckedUpdateWithoutCitiesInputSchema) ]),
}).strict();

export const PrefectureUpdateWithoutCitiesInputSchema: z.ZodType<Prisma.PrefectureUpdateWithoutCitiesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  areas: z.lazy(() => AreaUpdateManyWithoutPrefectureNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutPrefectureNestedInputSchema).optional()
}).strict();

export const PrefectureUncheckedUpdateWithoutCitiesInputSchema: z.ZodType<Prisma.PrefectureUncheckedUpdateWithoutCitiesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  areas: z.lazy(() => AreaUncheckedUpdateManyWithoutPrefectureNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutPrefectureNestedInputSchema).optional()
}).strict();

export const EventUpsertWithWhereUniqueWithoutCityInputSchema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutCityInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventUpdateWithoutCityInputSchema),z.lazy(() => EventUncheckedUpdateWithoutCityInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutCityInputSchema),z.lazy(() => EventUncheckedCreateWithoutCityInputSchema) ]),
}).strict();

export const EventUpdateWithWhereUniqueWithoutCityInputSchema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutCityInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventUpdateWithoutCityInputSchema),z.lazy(() => EventUncheckedUpdateWithoutCityInputSchema) ]),
}).strict();

export const EventUpdateManyWithWhereWithoutCityInputSchema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutCityInput> = z.object({
  where: z.lazy(() => EventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventUpdateManyMutationInputSchema),z.lazy(() => EventUncheckedUpdateManyWithoutCityInputSchema) ]),
}).strict();

export const EventCreateWithoutMediasInputSchema: z.ZodType<Prisma.EventCreateWithoutMediasInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  owner: z.lazy(() => UserProfileCreateNestedOneWithoutOwnedEventsInputSchema),
  attendees: z.lazy(() => UserProfileCreateNestedManyWithoutAttendingEventsInputSchema).optional(),
  tags: z.lazy(() => EventTagCreateNestedManyWithoutEventsInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureCreateNestedOneWithoutEventsInputSchema).optional(),
  area: z.lazy(() => AreaCreateNestedOneWithoutEventsInputSchema).optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutEventsInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutMediasInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutMediasInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  ownerId: z.string(),
  prefectureId: z.string().optional().nullable(),
  areaId: z.string().optional().nullable(),
  cityId: z.string().optional().nullable(),
  attendees: z.lazy(() => UserProfileUncheckedCreateNestedManyWithoutAttendingEventsInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedCreateNestedManyWithoutEventsInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutMediasInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutMediasInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutMediasInputSchema),z.lazy(() => EventUncheckedCreateWithoutMediasInputSchema) ]),
}).strict();

export const EventUpsertWithoutMediasInputSchema: z.ZodType<Prisma.EventUpsertWithoutMediasInput> = z.object({
  update: z.union([ z.lazy(() => EventUpdateWithoutMediasInputSchema),z.lazy(() => EventUncheckedUpdateWithoutMediasInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutMediasInputSchema),z.lazy(() => EventUncheckedCreateWithoutMediasInputSchema) ]),
  where: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const EventUpdateToOneWithWhereWithoutMediasInputSchema: z.ZodType<Prisma.EventUpdateToOneWithWhereWithoutMediasInput> = z.object({
  where: z.lazy(() => EventWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EventUpdateWithoutMediasInputSchema),z.lazy(() => EventUncheckedUpdateWithoutMediasInputSchema) ]),
}).strict();

export const EventUpdateWithoutMediasInputSchema: z.ZodType<Prisma.EventUpdateWithoutMediasInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserProfileUpdateOneRequiredWithoutOwnedEventsNestedInputSchema).optional(),
  attendees: z.lazy(() => UserProfileUpdateManyWithoutAttendingEventsNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUpdateManyWithoutEventsNestedInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureUpdateOneWithoutEventsNestedInputSchema).optional(),
  area: z.lazy(() => AreaUpdateOneWithoutEventsNestedInputSchema).optional(),
  city: z.lazy(() => CityUpdateOneWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutMediasInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutMediasInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cityId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  attendees: z.lazy(() => UserProfileUncheckedUpdateManyWithoutAttendingEventsNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedUpdateManyWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventCreateWithoutTagsInputSchema: z.ZodType<Prisma.EventCreateWithoutTagsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  owner: z.lazy(() => UserProfileCreateNestedOneWithoutOwnedEventsInputSchema),
  attendees: z.lazy(() => UserProfileCreateNestedManyWithoutAttendingEventsInputSchema).optional(),
  medias: z.lazy(() => EventMediaCreateNestedManyWithoutEventInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureCreateNestedOneWithoutEventsInputSchema).optional(),
  area: z.lazy(() => AreaCreateNestedOneWithoutEventsInputSchema).optional(),
  city: z.lazy(() => CityCreateNestedOneWithoutEventsInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  ownerId: z.string(),
  prefectureId: z.string().optional().nullable(),
  areaId: z.string().optional().nullable(),
  cityId: z.string().optional().nullable(),
  attendees: z.lazy(() => UserProfileUncheckedCreateNestedManyWithoutAttendingEventsInputSchema).optional(),
  medias: z.lazy(() => EventMediaUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutTagsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const EventUpsertWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventUpdateWithoutTagsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutTagsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const EventUpdateWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventUpdateWithoutTagsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const EventUpdateManyWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => EventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventUpdateManyMutationInputSchema),z.lazy(() => EventUncheckedUpdateManyWithoutTagsInputSchema) ]),
}).strict();

export const UserProfileCreateWithoutOwnedEventsInputSchema: z.ZodType<Prisma.UserProfileCreateWithoutOwnedEventsInput> = z.object({
  id: z.string().uuid().optional(),
  personalId: z.string(),
  displayName: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  attendingEvents: z.lazy(() => EventCreateNestedManyWithoutAttendeesInputSchema).optional()
}).strict();

export const UserProfileUncheckedCreateWithoutOwnedEventsInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateWithoutOwnedEventsInput> = z.object({
  id: z.string().uuid().optional(),
  personalId: z.string(),
  displayName: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  attendingEvents: z.lazy(() => EventUncheckedCreateNestedManyWithoutAttendeesInputSchema).optional()
}).strict();

export const UserProfileCreateOrConnectWithoutOwnedEventsInputSchema: z.ZodType<Prisma.UserProfileCreateOrConnectWithoutOwnedEventsInput> = z.object({
  where: z.lazy(() => UserProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserProfileCreateWithoutOwnedEventsInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutOwnedEventsInputSchema) ]),
}).strict();

export const UserProfileCreateWithoutAttendingEventsInputSchema: z.ZodType<Prisma.UserProfileCreateWithoutAttendingEventsInput> = z.object({
  id: z.string().uuid().optional(),
  personalId: z.string(),
  displayName: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  ownedEvents: z.lazy(() => EventCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserProfileUncheckedCreateWithoutAttendingEventsInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateWithoutAttendingEventsInput> = z.object({
  id: z.string().uuid().optional(),
  personalId: z.string(),
  displayName: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  ownedEvents: z.lazy(() => EventUncheckedCreateNestedManyWithoutOwnerInputSchema).optional()
}).strict();

export const UserProfileCreateOrConnectWithoutAttendingEventsInputSchema: z.ZodType<Prisma.UserProfileCreateOrConnectWithoutAttendingEventsInput> = z.object({
  where: z.lazy(() => UserProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserProfileCreateWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutAttendingEventsInputSchema) ]),
}).strict();

export const EventMediaCreateWithoutEventInputSchema: z.ZodType<Prisma.EventMediaCreateWithoutEventInput> = z.object({
  id: z.string().uuid().optional(),
  url: z.string()
}).strict();

export const EventMediaUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.EventMediaUncheckedCreateWithoutEventInput> = z.object({
  id: z.string().uuid().optional(),
  url: z.string()
}).strict();

export const EventMediaCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.EventMediaCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => EventMediaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventMediaCreateWithoutEventInputSchema),z.lazy(() => EventMediaUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const EventMediaCreateManyEventInputEnvelopeSchema: z.ZodType<Prisma.EventMediaCreateManyEventInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventMediaCreateManyEventInputSchema),z.lazy(() => EventMediaCreateManyEventInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EventTagCreateWithoutEventsInputSchema: z.ZodType<Prisma.EventTagCreateWithoutEventsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string()
}).strict();

export const EventTagUncheckedCreateWithoutEventsInputSchema: z.ZodType<Prisma.EventTagUncheckedCreateWithoutEventsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string()
}).strict();

export const EventTagCreateOrConnectWithoutEventsInputSchema: z.ZodType<Prisma.EventTagCreateOrConnectWithoutEventsInput> = z.object({
  where: z.lazy(() => EventTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventTagCreateWithoutEventsInputSchema),z.lazy(() => EventTagUncheckedCreateWithoutEventsInputSchema) ]),
}).strict();

export const PrefectureCreateWithoutEventsInputSchema: z.ZodType<Prisma.PrefectureCreateWithoutEventsInput> = z.object({
  id: z.string(),
  name: z.string(),
  areas: z.lazy(() => AreaCreateNestedManyWithoutPrefectureInputSchema).optional(),
  cities: z.lazy(() => CityCreateNestedManyWithoutPrefectureInputSchema).optional()
}).strict();

export const PrefectureUncheckedCreateWithoutEventsInputSchema: z.ZodType<Prisma.PrefectureUncheckedCreateWithoutEventsInput> = z.object({
  id: z.string(),
  name: z.string(),
  areas: z.lazy(() => AreaUncheckedCreateNestedManyWithoutPrefectureInputSchema).optional(),
  cities: z.lazy(() => CityUncheckedCreateNestedManyWithoutPrefectureInputSchema).optional()
}).strict();

export const PrefectureCreateOrConnectWithoutEventsInputSchema: z.ZodType<Prisma.PrefectureCreateOrConnectWithoutEventsInput> = z.object({
  where: z.lazy(() => PrefectureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PrefectureCreateWithoutEventsInputSchema),z.lazy(() => PrefectureUncheckedCreateWithoutEventsInputSchema) ]),
}).strict();

export const AreaCreateWithoutEventsInputSchema: z.ZodType<Prisma.AreaCreateWithoutEventsInput> = z.object({
  id: z.string(),
  name: z.string(),
  cities: z.lazy(() => CityCreateNestedManyWithoutAreaInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureCreateNestedOneWithoutAreasInputSchema)
}).strict();

export const AreaUncheckedCreateWithoutEventsInputSchema: z.ZodType<Prisma.AreaUncheckedCreateWithoutEventsInput> = z.object({
  id: z.string(),
  name: z.string(),
  prefectureId: z.string(),
  cities: z.lazy(() => CityUncheckedCreateNestedManyWithoutAreaInputSchema).optional()
}).strict();

export const AreaCreateOrConnectWithoutEventsInputSchema: z.ZodType<Prisma.AreaCreateOrConnectWithoutEventsInput> = z.object({
  where: z.lazy(() => AreaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AreaCreateWithoutEventsInputSchema),z.lazy(() => AreaUncheckedCreateWithoutEventsInputSchema) ]),
}).strict();

export const CityCreateWithoutEventsInputSchema: z.ZodType<Prisma.CityCreateWithoutEventsInput> = z.object({
  id: z.string(),
  name: z.string(),
  area: z.lazy(() => AreaCreateNestedOneWithoutCitiesInputSchema),
  prefecture: z.lazy(() => PrefectureCreateNestedOneWithoutCitiesInputSchema)
}).strict();

export const CityUncheckedCreateWithoutEventsInputSchema: z.ZodType<Prisma.CityUncheckedCreateWithoutEventsInput> = z.object({
  id: z.string(),
  name: z.string(),
  prefectureId: z.string(),
  areaId: z.string()
}).strict();

export const CityCreateOrConnectWithoutEventsInputSchema: z.ZodType<Prisma.CityCreateOrConnectWithoutEventsInput> = z.object({
  where: z.lazy(() => CityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CityCreateWithoutEventsInputSchema),z.lazy(() => CityUncheckedCreateWithoutEventsInputSchema) ]),
}).strict();

export const UserProfileUpsertWithoutOwnedEventsInputSchema: z.ZodType<Prisma.UserProfileUpsertWithoutOwnedEventsInput> = z.object({
  update: z.union([ z.lazy(() => UserProfileUpdateWithoutOwnedEventsInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutOwnedEventsInputSchema) ]),
  create: z.union([ z.lazy(() => UserProfileCreateWithoutOwnedEventsInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutOwnedEventsInputSchema) ]),
  where: z.lazy(() => UserProfileWhereInputSchema).optional()
}).strict();

export const UserProfileUpdateToOneWithWhereWithoutOwnedEventsInputSchema: z.ZodType<Prisma.UserProfileUpdateToOneWithWhereWithoutOwnedEventsInput> = z.object({
  where: z.lazy(() => UserProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserProfileUpdateWithoutOwnedEventsInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutOwnedEventsInputSchema) ]),
}).strict();

export const UserProfileUpdateWithoutOwnedEventsInputSchema: z.ZodType<Prisma.UserProfileUpdateWithoutOwnedEventsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  personalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  attendingEvents: z.lazy(() => EventUpdateManyWithoutAttendeesNestedInputSchema).optional()
}).strict();

export const UserProfileUncheckedUpdateWithoutOwnedEventsInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateWithoutOwnedEventsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  personalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  attendingEvents: z.lazy(() => EventUncheckedUpdateManyWithoutAttendeesNestedInputSchema).optional()
}).strict();

export const UserProfileUpsertWithWhereUniqueWithoutAttendingEventsInputSchema: z.ZodType<Prisma.UserProfileUpsertWithWhereUniqueWithoutAttendingEventsInput> = z.object({
  where: z.lazy(() => UserProfileWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserProfileUpdateWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutAttendingEventsInputSchema) ]),
  create: z.union([ z.lazy(() => UserProfileCreateWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileUncheckedCreateWithoutAttendingEventsInputSchema) ]),
}).strict();

export const UserProfileUpdateWithWhereUniqueWithoutAttendingEventsInputSchema: z.ZodType<Prisma.UserProfileUpdateWithWhereUniqueWithoutAttendingEventsInput> = z.object({
  where: z.lazy(() => UserProfileWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserProfileUpdateWithoutAttendingEventsInputSchema),z.lazy(() => UserProfileUncheckedUpdateWithoutAttendingEventsInputSchema) ]),
}).strict();

export const UserProfileUpdateManyWithWhereWithoutAttendingEventsInputSchema: z.ZodType<Prisma.UserProfileUpdateManyWithWhereWithoutAttendingEventsInput> = z.object({
  where: z.lazy(() => UserProfileScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserProfileUpdateManyMutationInputSchema),z.lazy(() => UserProfileUncheckedUpdateManyWithoutAttendingEventsInputSchema) ]),
}).strict();

export const UserProfileScalarWhereInputSchema: z.ZodType<Prisma.UserProfileScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserProfileScalarWhereInputSchema),z.lazy(() => UserProfileScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProfileScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProfileScalarWhereInputSchema),z.lazy(() => UserProfileScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  personalId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  displayName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const EventMediaUpsertWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.EventMediaUpsertWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => EventMediaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventMediaUpdateWithoutEventInputSchema),z.lazy(() => EventMediaUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => EventMediaCreateWithoutEventInputSchema),z.lazy(() => EventMediaUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const EventMediaUpdateWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.EventMediaUpdateWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => EventMediaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventMediaUpdateWithoutEventInputSchema),z.lazy(() => EventMediaUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const EventMediaUpdateManyWithWhereWithoutEventInputSchema: z.ZodType<Prisma.EventMediaUpdateManyWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => EventMediaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventMediaUpdateManyMutationInputSchema),z.lazy(() => EventMediaUncheckedUpdateManyWithoutEventInputSchema) ]),
}).strict();

export const EventMediaScalarWhereInputSchema: z.ZodType<Prisma.EventMediaScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventMediaScalarWhereInputSchema),z.lazy(() => EventMediaScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventMediaScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventMediaScalarWhereInputSchema),z.lazy(() => EventMediaScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const EventTagUpsertWithWhereUniqueWithoutEventsInputSchema: z.ZodType<Prisma.EventTagUpsertWithWhereUniqueWithoutEventsInput> = z.object({
  where: z.lazy(() => EventTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventTagUpdateWithoutEventsInputSchema),z.lazy(() => EventTagUncheckedUpdateWithoutEventsInputSchema) ]),
  create: z.union([ z.lazy(() => EventTagCreateWithoutEventsInputSchema),z.lazy(() => EventTagUncheckedCreateWithoutEventsInputSchema) ]),
}).strict();

export const EventTagUpdateWithWhereUniqueWithoutEventsInputSchema: z.ZodType<Prisma.EventTagUpdateWithWhereUniqueWithoutEventsInput> = z.object({
  where: z.lazy(() => EventTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventTagUpdateWithoutEventsInputSchema),z.lazy(() => EventTagUncheckedUpdateWithoutEventsInputSchema) ]),
}).strict();

export const EventTagUpdateManyWithWhereWithoutEventsInputSchema: z.ZodType<Prisma.EventTagUpdateManyWithWhereWithoutEventsInput> = z.object({
  where: z.lazy(() => EventTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventTagUpdateManyMutationInputSchema),z.lazy(() => EventTagUncheckedUpdateManyWithoutEventsInputSchema) ]),
}).strict();

export const EventTagScalarWhereInputSchema: z.ZodType<Prisma.EventTagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventTagScalarWhereInputSchema),z.lazy(() => EventTagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventTagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventTagScalarWhereInputSchema),z.lazy(() => EventTagScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PrefectureUpsertWithoutEventsInputSchema: z.ZodType<Prisma.PrefectureUpsertWithoutEventsInput> = z.object({
  update: z.union([ z.lazy(() => PrefectureUpdateWithoutEventsInputSchema),z.lazy(() => PrefectureUncheckedUpdateWithoutEventsInputSchema) ]),
  create: z.union([ z.lazy(() => PrefectureCreateWithoutEventsInputSchema),z.lazy(() => PrefectureUncheckedCreateWithoutEventsInputSchema) ]),
  where: z.lazy(() => PrefectureWhereInputSchema).optional()
}).strict();

export const PrefectureUpdateToOneWithWhereWithoutEventsInputSchema: z.ZodType<Prisma.PrefectureUpdateToOneWithWhereWithoutEventsInput> = z.object({
  where: z.lazy(() => PrefectureWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PrefectureUpdateWithoutEventsInputSchema),z.lazy(() => PrefectureUncheckedUpdateWithoutEventsInputSchema) ]),
}).strict();

export const PrefectureUpdateWithoutEventsInputSchema: z.ZodType<Prisma.PrefectureUpdateWithoutEventsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  areas: z.lazy(() => AreaUpdateManyWithoutPrefectureNestedInputSchema).optional(),
  cities: z.lazy(() => CityUpdateManyWithoutPrefectureNestedInputSchema).optional()
}).strict();

export const PrefectureUncheckedUpdateWithoutEventsInputSchema: z.ZodType<Prisma.PrefectureUncheckedUpdateWithoutEventsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  areas: z.lazy(() => AreaUncheckedUpdateManyWithoutPrefectureNestedInputSchema).optional(),
  cities: z.lazy(() => CityUncheckedUpdateManyWithoutPrefectureNestedInputSchema).optional()
}).strict();

export const AreaUpsertWithoutEventsInputSchema: z.ZodType<Prisma.AreaUpsertWithoutEventsInput> = z.object({
  update: z.union([ z.lazy(() => AreaUpdateWithoutEventsInputSchema),z.lazy(() => AreaUncheckedUpdateWithoutEventsInputSchema) ]),
  create: z.union([ z.lazy(() => AreaCreateWithoutEventsInputSchema),z.lazy(() => AreaUncheckedCreateWithoutEventsInputSchema) ]),
  where: z.lazy(() => AreaWhereInputSchema).optional()
}).strict();

export const AreaUpdateToOneWithWhereWithoutEventsInputSchema: z.ZodType<Prisma.AreaUpdateToOneWithWhereWithoutEventsInput> = z.object({
  where: z.lazy(() => AreaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AreaUpdateWithoutEventsInputSchema),z.lazy(() => AreaUncheckedUpdateWithoutEventsInputSchema) ]),
}).strict();

export const AreaUpdateWithoutEventsInputSchema: z.ZodType<Prisma.AreaUpdateWithoutEventsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cities: z.lazy(() => CityUpdateManyWithoutAreaNestedInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureUpdateOneRequiredWithoutAreasNestedInputSchema).optional()
}).strict();

export const AreaUncheckedUpdateWithoutEventsInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateWithoutEventsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cities: z.lazy(() => CityUncheckedUpdateManyWithoutAreaNestedInputSchema).optional()
}).strict();

export const CityUpsertWithoutEventsInputSchema: z.ZodType<Prisma.CityUpsertWithoutEventsInput> = z.object({
  update: z.union([ z.lazy(() => CityUpdateWithoutEventsInputSchema),z.lazy(() => CityUncheckedUpdateWithoutEventsInputSchema) ]),
  create: z.union([ z.lazy(() => CityCreateWithoutEventsInputSchema),z.lazy(() => CityUncheckedCreateWithoutEventsInputSchema) ]),
  where: z.lazy(() => CityWhereInputSchema).optional()
}).strict();

export const CityUpdateToOneWithWhereWithoutEventsInputSchema: z.ZodType<Prisma.CityUpdateToOneWithWhereWithoutEventsInput> = z.object({
  where: z.lazy(() => CityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CityUpdateWithoutEventsInputSchema),z.lazy(() => CityUncheckedUpdateWithoutEventsInputSchema) ]),
}).strict();

export const CityUpdateWithoutEventsInputSchema: z.ZodType<Prisma.CityUpdateWithoutEventsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  area: z.lazy(() => AreaUpdateOneRequiredWithoutCitiesNestedInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureUpdateOneRequiredWithoutCitiesNestedInputSchema).optional()
}).strict();

export const CityUncheckedUpdateWithoutEventsInputSchema: z.ZodType<Prisma.CityUncheckedUpdateWithoutEventsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  areaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventCreateManyOwnerInputSchema: z.ZodType<Prisma.EventCreateManyOwnerInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  prefectureId: z.string().optional().nullable(),
  areaId: z.string().optional().nullable(),
  cityId: z.string().optional().nullable()
}).strict();

export const EventUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.EventUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  attendees: z.lazy(() => UserProfileUpdateManyWithoutAttendingEventsNestedInputSchema).optional(),
  medias: z.lazy(() => EventMediaUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUpdateManyWithoutEventsNestedInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureUpdateOneWithoutEventsNestedInputSchema).optional(),
  area: z.lazy(() => AreaUpdateOneWithoutEventsNestedInputSchema).optional(),
  city: z.lazy(() => CityUpdateOneWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cityId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  attendees: z.lazy(() => UserProfileUncheckedUpdateManyWithoutAttendingEventsNestedInputSchema).optional(),
  medias: z.lazy(() => EventMediaUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedUpdateManyWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateManyWithoutOwnerInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutOwnerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cityId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventUpdateWithoutAttendeesInputSchema: z.ZodType<Prisma.EventUpdateWithoutAttendeesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserProfileUpdateOneRequiredWithoutOwnedEventsNestedInputSchema).optional(),
  medias: z.lazy(() => EventMediaUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUpdateManyWithoutEventsNestedInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureUpdateOneWithoutEventsNestedInputSchema).optional(),
  area: z.lazy(() => AreaUpdateOneWithoutEventsNestedInputSchema).optional(),
  city: z.lazy(() => CityUpdateOneWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutAttendeesInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutAttendeesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cityId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  medias: z.lazy(() => EventMediaUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedUpdateManyWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateManyWithoutAttendeesInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutAttendeesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cityId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AreaCreateManyPrefectureInputSchema: z.ZodType<Prisma.AreaCreateManyPrefectureInput> = z.object({
  id: z.string(),
  name: z.string()
}).strict();

export const EventCreateManyPrefectureInputSchema: z.ZodType<Prisma.EventCreateManyPrefectureInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  ownerId: z.string(),
  areaId: z.string().optional().nullable(),
  cityId: z.string().optional().nullable()
}).strict();

export const CityCreateManyPrefectureInputSchema: z.ZodType<Prisma.CityCreateManyPrefectureInput> = z.object({
  id: z.string(),
  name: z.string(),
  areaId: z.string()
}).strict();

export const AreaUpdateWithoutPrefectureInputSchema: z.ZodType<Prisma.AreaUpdateWithoutPrefectureInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cities: z.lazy(() => CityUpdateManyWithoutAreaNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutAreaNestedInputSchema).optional()
}).strict();

export const AreaUncheckedUpdateWithoutPrefectureInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateWithoutPrefectureInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cities: z.lazy(() => CityUncheckedUpdateManyWithoutAreaNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutAreaNestedInputSchema).optional()
}).strict();

export const AreaUncheckedUpdateManyWithoutPrefectureInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateManyWithoutPrefectureInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUpdateWithoutPrefectureInputSchema: z.ZodType<Prisma.EventUpdateWithoutPrefectureInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserProfileUpdateOneRequiredWithoutOwnedEventsNestedInputSchema).optional(),
  attendees: z.lazy(() => UserProfileUpdateManyWithoutAttendingEventsNestedInputSchema).optional(),
  medias: z.lazy(() => EventMediaUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUpdateManyWithoutEventsNestedInputSchema).optional(),
  area: z.lazy(() => AreaUpdateOneWithoutEventsNestedInputSchema).optional(),
  city: z.lazy(() => CityUpdateOneWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutPrefectureInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutPrefectureInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  areaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cityId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  attendees: z.lazy(() => UserProfileUncheckedUpdateManyWithoutAttendingEventsNestedInputSchema).optional(),
  medias: z.lazy(() => EventMediaUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedUpdateManyWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateManyWithoutPrefectureInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutPrefectureInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  areaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cityId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CityUpdateWithoutPrefectureInputSchema: z.ZodType<Prisma.CityUpdateWithoutPrefectureInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  area: z.lazy(() => AreaUpdateOneRequiredWithoutCitiesNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutCityNestedInputSchema).optional()
}).strict();

export const CityUncheckedUpdateWithoutPrefectureInputSchema: z.ZodType<Prisma.CityUncheckedUpdateWithoutPrefectureInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  areaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutCityNestedInputSchema).optional()
}).strict();

export const CityUncheckedUpdateManyWithoutPrefectureInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyWithoutPrefectureInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  areaId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CityCreateManyAreaInputSchema: z.ZodType<Prisma.CityCreateManyAreaInput> = z.object({
  id: z.string(),
  name: z.string(),
  prefectureId: z.string()
}).strict();

export const EventCreateManyAreaInputSchema: z.ZodType<Prisma.EventCreateManyAreaInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  ownerId: z.string(),
  prefectureId: z.string().optional().nullable(),
  cityId: z.string().optional().nullable()
}).strict();

export const CityUpdateWithoutAreaInputSchema: z.ZodType<Prisma.CityUpdateWithoutAreaInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefecture: z.lazy(() => PrefectureUpdateOneRequiredWithoutCitiesNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutCityNestedInputSchema).optional()
}).strict();

export const CityUncheckedUpdateWithoutAreaInputSchema: z.ZodType<Prisma.CityUncheckedUpdateWithoutAreaInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutCityNestedInputSchema).optional()
}).strict();

export const CityUncheckedUpdateManyWithoutAreaInputSchema: z.ZodType<Prisma.CityUncheckedUpdateManyWithoutAreaInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUpdateWithoutAreaInputSchema: z.ZodType<Prisma.EventUpdateWithoutAreaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserProfileUpdateOneRequiredWithoutOwnedEventsNestedInputSchema).optional(),
  attendees: z.lazy(() => UserProfileUpdateManyWithoutAttendingEventsNestedInputSchema).optional(),
  medias: z.lazy(() => EventMediaUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUpdateManyWithoutEventsNestedInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureUpdateOneWithoutEventsNestedInputSchema).optional(),
  city: z.lazy(() => CityUpdateOneWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutAreaInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutAreaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cityId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  attendees: z.lazy(() => UserProfileUncheckedUpdateManyWithoutAttendingEventsNestedInputSchema).optional(),
  medias: z.lazy(() => EventMediaUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedUpdateManyWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateManyWithoutAreaInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutAreaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cityId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventCreateManyCityInputSchema: z.ZodType<Prisma.EventCreateManyCityInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  locationDetail: z.string().optional().nullable(),
  onlineLocationDetail: z.string().optional().nullable(),
  conditions: z.string().optional().nullable(),
  maxCapacity: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  eventType: z.lazy(() => EventTypeSchema).optional(),
  eventStatus: z.lazy(() => EventStatusSchema).optional(),
  ownerId: z.string(),
  prefectureId: z.string().optional().nullable(),
  areaId: z.string().optional().nullable()
}).strict();

export const EventUpdateWithoutCityInputSchema: z.ZodType<Prisma.EventUpdateWithoutCityInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserProfileUpdateOneRequiredWithoutOwnedEventsNestedInputSchema).optional(),
  attendees: z.lazy(() => UserProfileUpdateManyWithoutAttendingEventsNestedInputSchema).optional(),
  medias: z.lazy(() => EventMediaUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUpdateManyWithoutEventsNestedInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureUpdateOneWithoutEventsNestedInputSchema).optional(),
  area: z.lazy(() => AreaUpdateOneWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutCityInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutCityInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  attendees: z.lazy(() => UserProfileUncheckedUpdateManyWithoutAttendingEventsNestedInputSchema).optional(),
  medias: z.lazy(() => EventMediaUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedUpdateManyWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateManyWithoutCityInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutCityInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventUpdateWithoutTagsInputSchema: z.ZodType<Prisma.EventUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserProfileUpdateOneRequiredWithoutOwnedEventsNestedInputSchema).optional(),
  attendees: z.lazy(() => UserProfileUpdateManyWithoutAttendingEventsNestedInputSchema).optional(),
  medias: z.lazy(() => EventMediaUpdateManyWithoutEventNestedInputSchema).optional(),
  prefecture: z.lazy(() => PrefectureUpdateOneWithoutEventsNestedInputSchema).optional(),
  area: z.lazy(() => AreaUpdateOneWithoutEventsNestedInputSchema).optional(),
  city: z.lazy(() => CityUpdateOneWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cityId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  attendees: z.lazy(() => UserProfileUncheckedUpdateManyWithoutAttendingEventsNestedInputSchema).optional(),
  medias: z.lazy(() => EventMediaUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateManyWithoutTagsInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutTagsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDateTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  locationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onlineLocationDetail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conditions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxCapacity: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  overview: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contact: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventType: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventStatus: z.union([ z.lazy(() => EventStatusSchema),z.lazy(() => EnumEventStatusFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prefectureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cityId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventMediaCreateManyEventInputSchema: z.ZodType<Prisma.EventMediaCreateManyEventInput> = z.object({
  id: z.string().uuid().optional(),
  url: z.string()
}).strict();

export const UserProfileUpdateWithoutAttendingEventsInputSchema: z.ZodType<Prisma.UserProfileUpdateWithoutAttendingEventsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  personalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  ownedEvents: z.lazy(() => EventUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserProfileUncheckedUpdateWithoutAttendingEventsInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateWithoutAttendingEventsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  personalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownedEvents: z.lazy(() => EventUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional()
}).strict();

export const UserProfileUncheckedUpdateManyWithoutAttendingEventsInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateManyWithoutAttendingEventsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  personalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventMediaUpdateWithoutEventInputSchema: z.ZodType<Prisma.EventMediaUpdateWithoutEventInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventMediaUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.EventMediaUncheckedUpdateWithoutEventInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventMediaUncheckedUpdateManyWithoutEventInputSchema: z.ZodType<Prisma.EventMediaUncheckedUpdateManyWithoutEventInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventTagUpdateWithoutEventsInputSchema: z.ZodType<Prisma.EventTagUpdateWithoutEventsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventTagUncheckedUpdateWithoutEventsInputSchema: z.ZodType<Prisma.EventTagUncheckedUpdateWithoutEventsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventTagUncheckedUpdateManyWithoutEventsInputSchema: z.ZodType<Prisma.EventTagUncheckedUpdateManyWithoutEventsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const PrefectureFindFirstArgsSchema: z.ZodType<Prisma.PrefectureFindFirstArgs> = z.object({
  select: PrefectureSelectSchema.optional(),
  include: PrefectureIncludeSchema.optional(),
  where: PrefectureWhereInputSchema.optional(),
  orderBy: z.union([ PrefectureOrderByWithRelationInputSchema.array(),PrefectureOrderByWithRelationInputSchema ]).optional(),
  cursor: PrefectureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PrefectureScalarFieldEnumSchema,PrefectureScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PrefectureFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PrefectureFindFirstOrThrowArgs> = z.object({
  select: PrefectureSelectSchema.optional(),
  include: PrefectureIncludeSchema.optional(),
  where: PrefectureWhereInputSchema.optional(),
  orderBy: z.union([ PrefectureOrderByWithRelationInputSchema.array(),PrefectureOrderByWithRelationInputSchema ]).optional(),
  cursor: PrefectureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PrefectureScalarFieldEnumSchema,PrefectureScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PrefectureFindManyArgsSchema: z.ZodType<Prisma.PrefectureFindManyArgs> = z.object({
  select: PrefectureSelectSchema.optional(),
  include: PrefectureIncludeSchema.optional(),
  where: PrefectureWhereInputSchema.optional(),
  orderBy: z.union([ PrefectureOrderByWithRelationInputSchema.array(),PrefectureOrderByWithRelationInputSchema ]).optional(),
  cursor: PrefectureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PrefectureScalarFieldEnumSchema,PrefectureScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PrefectureAggregateArgsSchema: z.ZodType<Prisma.PrefectureAggregateArgs> = z.object({
  where: PrefectureWhereInputSchema.optional(),
  orderBy: z.union([ PrefectureOrderByWithRelationInputSchema.array(),PrefectureOrderByWithRelationInputSchema ]).optional(),
  cursor: PrefectureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PrefectureGroupByArgsSchema: z.ZodType<Prisma.PrefectureGroupByArgs> = z.object({
  where: PrefectureWhereInputSchema.optional(),
  orderBy: z.union([ PrefectureOrderByWithAggregationInputSchema.array(),PrefectureOrderByWithAggregationInputSchema ]).optional(),
  by: PrefectureScalarFieldEnumSchema.array(),
  having: PrefectureScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PrefectureFindUniqueArgsSchema: z.ZodType<Prisma.PrefectureFindUniqueArgs> = z.object({
  select: PrefectureSelectSchema.optional(),
  include: PrefectureIncludeSchema.optional(),
  where: PrefectureWhereUniqueInputSchema,
}).strict() ;

export const PrefectureFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PrefectureFindUniqueOrThrowArgs> = z.object({
  select: PrefectureSelectSchema.optional(),
  include: PrefectureIncludeSchema.optional(),
  where: PrefectureWhereUniqueInputSchema,
}).strict() ;

export const AreaFindFirstArgsSchema: z.ZodType<Prisma.AreaFindFirstArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  where: AreaWhereInputSchema.optional(),
  orderBy: z.union([ AreaOrderByWithRelationInputSchema.array(),AreaOrderByWithRelationInputSchema ]).optional(),
  cursor: AreaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AreaScalarFieldEnumSchema,AreaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AreaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AreaFindFirstOrThrowArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  where: AreaWhereInputSchema.optional(),
  orderBy: z.union([ AreaOrderByWithRelationInputSchema.array(),AreaOrderByWithRelationInputSchema ]).optional(),
  cursor: AreaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AreaScalarFieldEnumSchema,AreaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AreaFindManyArgsSchema: z.ZodType<Prisma.AreaFindManyArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  where: AreaWhereInputSchema.optional(),
  orderBy: z.union([ AreaOrderByWithRelationInputSchema.array(),AreaOrderByWithRelationInputSchema ]).optional(),
  cursor: AreaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AreaScalarFieldEnumSchema,AreaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AreaAggregateArgsSchema: z.ZodType<Prisma.AreaAggregateArgs> = z.object({
  where: AreaWhereInputSchema.optional(),
  orderBy: z.union([ AreaOrderByWithRelationInputSchema.array(),AreaOrderByWithRelationInputSchema ]).optional(),
  cursor: AreaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AreaGroupByArgsSchema: z.ZodType<Prisma.AreaGroupByArgs> = z.object({
  where: AreaWhereInputSchema.optional(),
  orderBy: z.union([ AreaOrderByWithAggregationInputSchema.array(),AreaOrderByWithAggregationInputSchema ]).optional(),
  by: AreaScalarFieldEnumSchema.array(),
  having: AreaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AreaFindUniqueArgsSchema: z.ZodType<Prisma.AreaFindUniqueArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  where: AreaWhereUniqueInputSchema,
}).strict() ;

export const AreaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AreaFindUniqueOrThrowArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  where: AreaWhereUniqueInputSchema,
}).strict() ;

export const CityFindFirstArgsSchema: z.ZodType<Prisma.CityFindFirstArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema,CityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CityFindFirstOrThrowArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema,CityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CityFindManyArgsSchema: z.ZodType<Prisma.CityFindManyArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CityScalarFieldEnumSchema,CityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CityAggregateArgsSchema: z.ZodType<Prisma.CityAggregateArgs> = z.object({
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithRelationInputSchema.array(),CityOrderByWithRelationInputSchema ]).optional(),
  cursor: CityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CityGroupByArgsSchema: z.ZodType<Prisma.CityGroupByArgs> = z.object({
  where: CityWhereInputSchema.optional(),
  orderBy: z.union([ CityOrderByWithAggregationInputSchema.array(),CityOrderByWithAggregationInputSchema ]).optional(),
  by: CityScalarFieldEnumSchema.array(),
  having: CityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CityFindUniqueArgsSchema: z.ZodType<Prisma.CityFindUniqueArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
}).strict() ;

export const CityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CityFindUniqueOrThrowArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
}).strict() ;

export const EventMediaFindFirstArgsSchema: z.ZodType<Prisma.EventMediaFindFirstArgs> = z.object({
  select: EventMediaSelectSchema.optional(),
  include: EventMediaIncludeSchema.optional(),
  where: EventMediaWhereInputSchema.optional(),
  orderBy: z.union([ EventMediaOrderByWithRelationInputSchema.array(),EventMediaOrderByWithRelationInputSchema ]).optional(),
  cursor: EventMediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventMediaScalarFieldEnumSchema,EventMediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventMediaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventMediaFindFirstOrThrowArgs> = z.object({
  select: EventMediaSelectSchema.optional(),
  include: EventMediaIncludeSchema.optional(),
  where: EventMediaWhereInputSchema.optional(),
  orderBy: z.union([ EventMediaOrderByWithRelationInputSchema.array(),EventMediaOrderByWithRelationInputSchema ]).optional(),
  cursor: EventMediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventMediaScalarFieldEnumSchema,EventMediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventMediaFindManyArgsSchema: z.ZodType<Prisma.EventMediaFindManyArgs> = z.object({
  select: EventMediaSelectSchema.optional(),
  include: EventMediaIncludeSchema.optional(),
  where: EventMediaWhereInputSchema.optional(),
  orderBy: z.union([ EventMediaOrderByWithRelationInputSchema.array(),EventMediaOrderByWithRelationInputSchema ]).optional(),
  cursor: EventMediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventMediaScalarFieldEnumSchema,EventMediaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventMediaAggregateArgsSchema: z.ZodType<Prisma.EventMediaAggregateArgs> = z.object({
  where: EventMediaWhereInputSchema.optional(),
  orderBy: z.union([ EventMediaOrderByWithRelationInputSchema.array(),EventMediaOrderByWithRelationInputSchema ]).optional(),
  cursor: EventMediaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventMediaGroupByArgsSchema: z.ZodType<Prisma.EventMediaGroupByArgs> = z.object({
  where: EventMediaWhereInputSchema.optional(),
  orderBy: z.union([ EventMediaOrderByWithAggregationInputSchema.array(),EventMediaOrderByWithAggregationInputSchema ]).optional(),
  by: EventMediaScalarFieldEnumSchema.array(),
  having: EventMediaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventMediaFindUniqueArgsSchema: z.ZodType<Prisma.EventMediaFindUniqueArgs> = z.object({
  select: EventMediaSelectSchema.optional(),
  include: EventMediaIncludeSchema.optional(),
  where: EventMediaWhereUniqueInputSchema,
}).strict() ;

export const EventMediaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventMediaFindUniqueOrThrowArgs> = z.object({
  select: EventMediaSelectSchema.optional(),
  include: EventMediaIncludeSchema.optional(),
  where: EventMediaWhereUniqueInputSchema,
}).strict() ;

export const EventTagFindFirstArgsSchema: z.ZodType<Prisma.EventTagFindFirstArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  where: EventTagWhereInputSchema.optional(),
  orderBy: z.union([ EventTagOrderByWithRelationInputSchema.array(),EventTagOrderByWithRelationInputSchema ]).optional(),
  cursor: EventTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventTagScalarFieldEnumSchema,EventTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventTagFindFirstOrThrowArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  where: EventTagWhereInputSchema.optional(),
  orderBy: z.union([ EventTagOrderByWithRelationInputSchema.array(),EventTagOrderByWithRelationInputSchema ]).optional(),
  cursor: EventTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventTagScalarFieldEnumSchema,EventTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventTagFindManyArgsSchema: z.ZodType<Prisma.EventTagFindManyArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  where: EventTagWhereInputSchema.optional(),
  orderBy: z.union([ EventTagOrderByWithRelationInputSchema.array(),EventTagOrderByWithRelationInputSchema ]).optional(),
  cursor: EventTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventTagScalarFieldEnumSchema,EventTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventTagAggregateArgsSchema: z.ZodType<Prisma.EventTagAggregateArgs> = z.object({
  where: EventTagWhereInputSchema.optional(),
  orderBy: z.union([ EventTagOrderByWithRelationInputSchema.array(),EventTagOrderByWithRelationInputSchema ]).optional(),
  cursor: EventTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventTagGroupByArgsSchema: z.ZodType<Prisma.EventTagGroupByArgs> = z.object({
  where: EventTagWhereInputSchema.optional(),
  orderBy: z.union([ EventTagOrderByWithAggregationInputSchema.array(),EventTagOrderByWithAggregationInputSchema ]).optional(),
  by: EventTagScalarFieldEnumSchema.array(),
  having: EventTagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventTagFindUniqueArgsSchema: z.ZodType<Prisma.EventTagFindUniqueArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  where: EventTagWhereUniqueInputSchema,
}).strict() ;

export const EventTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventTagFindUniqueOrThrowArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  where: EventTagWhereUniqueInputSchema,
}).strict() ;

export const EventFindFirstArgsSchema: z.ZodType<Prisma.EventFindFirstArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventFindFirstOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindManyArgsSchema: z.ZodType<Prisma.EventFindManyArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventAggregateArgsSchema: z.ZodType<Prisma.EventAggregateArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventGroupByArgsSchema: z.ZodType<Prisma.EventGroupByArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithAggregationInputSchema.array(),EventOrderByWithAggregationInputSchema ]).optional(),
  by: EventScalarFieldEnumSchema.array(),
  having: EventScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventFindUniqueArgsSchema: z.ZodType<Prisma.EventFindUniqueArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventFindUniqueOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
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

export const PrefectureCreateArgsSchema: z.ZodType<Prisma.PrefectureCreateArgs> = z.object({
  select: PrefectureSelectSchema.optional(),
  include: PrefectureIncludeSchema.optional(),
  data: z.union([ PrefectureCreateInputSchema,PrefectureUncheckedCreateInputSchema ]),
}).strict() ;

export const PrefectureUpsertArgsSchema: z.ZodType<Prisma.PrefectureUpsertArgs> = z.object({
  select: PrefectureSelectSchema.optional(),
  include: PrefectureIncludeSchema.optional(),
  where: PrefectureWhereUniqueInputSchema,
  create: z.union([ PrefectureCreateInputSchema,PrefectureUncheckedCreateInputSchema ]),
  update: z.union([ PrefectureUpdateInputSchema,PrefectureUncheckedUpdateInputSchema ]),
}).strict() ;

export const PrefectureCreateManyArgsSchema: z.ZodType<Prisma.PrefectureCreateManyArgs> = z.object({
  data: z.union([ PrefectureCreateManyInputSchema,PrefectureCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PrefectureCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PrefectureCreateManyAndReturnArgs> = z.object({
  data: z.union([ PrefectureCreateManyInputSchema,PrefectureCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PrefectureDeleteArgsSchema: z.ZodType<Prisma.PrefectureDeleteArgs> = z.object({
  select: PrefectureSelectSchema.optional(),
  include: PrefectureIncludeSchema.optional(),
  where: PrefectureWhereUniqueInputSchema,
}).strict() ;

export const PrefectureUpdateArgsSchema: z.ZodType<Prisma.PrefectureUpdateArgs> = z.object({
  select: PrefectureSelectSchema.optional(),
  include: PrefectureIncludeSchema.optional(),
  data: z.union([ PrefectureUpdateInputSchema,PrefectureUncheckedUpdateInputSchema ]),
  where: PrefectureWhereUniqueInputSchema,
}).strict() ;

export const PrefectureUpdateManyArgsSchema: z.ZodType<Prisma.PrefectureUpdateManyArgs> = z.object({
  data: z.union([ PrefectureUpdateManyMutationInputSchema,PrefectureUncheckedUpdateManyInputSchema ]),
  where: PrefectureWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PrefectureUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PrefectureUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PrefectureUpdateManyMutationInputSchema,PrefectureUncheckedUpdateManyInputSchema ]),
  where: PrefectureWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PrefectureDeleteManyArgsSchema: z.ZodType<Prisma.PrefectureDeleteManyArgs> = z.object({
  where: PrefectureWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AreaCreateArgsSchema: z.ZodType<Prisma.AreaCreateArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  data: z.union([ AreaCreateInputSchema,AreaUncheckedCreateInputSchema ]),
}).strict() ;

export const AreaUpsertArgsSchema: z.ZodType<Prisma.AreaUpsertArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  where: AreaWhereUniqueInputSchema,
  create: z.union([ AreaCreateInputSchema,AreaUncheckedCreateInputSchema ]),
  update: z.union([ AreaUpdateInputSchema,AreaUncheckedUpdateInputSchema ]),
}).strict() ;

export const AreaCreateManyArgsSchema: z.ZodType<Prisma.AreaCreateManyArgs> = z.object({
  data: z.union([ AreaCreateManyInputSchema,AreaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AreaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AreaCreateManyAndReturnArgs> = z.object({
  data: z.union([ AreaCreateManyInputSchema,AreaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AreaDeleteArgsSchema: z.ZodType<Prisma.AreaDeleteArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  where: AreaWhereUniqueInputSchema,
}).strict() ;

export const AreaUpdateArgsSchema: z.ZodType<Prisma.AreaUpdateArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  data: z.union([ AreaUpdateInputSchema,AreaUncheckedUpdateInputSchema ]),
  where: AreaWhereUniqueInputSchema,
}).strict() ;

export const AreaUpdateManyArgsSchema: z.ZodType<Prisma.AreaUpdateManyArgs> = z.object({
  data: z.union([ AreaUpdateManyMutationInputSchema,AreaUncheckedUpdateManyInputSchema ]),
  where: AreaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AreaUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AreaUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AreaUpdateManyMutationInputSchema,AreaUncheckedUpdateManyInputSchema ]),
  where: AreaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AreaDeleteManyArgsSchema: z.ZodType<Prisma.AreaDeleteManyArgs> = z.object({
  where: AreaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CityCreateArgsSchema: z.ZodType<Prisma.CityCreateArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  data: z.union([ CityCreateInputSchema,CityUncheckedCreateInputSchema ]),
}).strict() ;

export const CityUpsertArgsSchema: z.ZodType<Prisma.CityUpsertArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
  create: z.union([ CityCreateInputSchema,CityUncheckedCreateInputSchema ]),
  update: z.union([ CityUpdateInputSchema,CityUncheckedUpdateInputSchema ]),
}).strict() ;

export const CityCreateManyArgsSchema: z.ZodType<Prisma.CityCreateManyArgs> = z.object({
  data: z.union([ CityCreateManyInputSchema,CityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CityCreateManyAndReturnArgs> = z.object({
  data: z.union([ CityCreateManyInputSchema,CityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CityDeleteArgsSchema: z.ZodType<Prisma.CityDeleteArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  where: CityWhereUniqueInputSchema,
}).strict() ;

export const CityUpdateArgsSchema: z.ZodType<Prisma.CityUpdateArgs> = z.object({
  select: CitySelectSchema.optional(),
  include: CityIncludeSchema.optional(),
  data: z.union([ CityUpdateInputSchema,CityUncheckedUpdateInputSchema ]),
  where: CityWhereUniqueInputSchema,
}).strict() ;

export const CityUpdateManyArgsSchema: z.ZodType<Prisma.CityUpdateManyArgs> = z.object({
  data: z.union([ CityUpdateManyMutationInputSchema,CityUncheckedUpdateManyInputSchema ]),
  where: CityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CityUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CityUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CityUpdateManyMutationInputSchema,CityUncheckedUpdateManyInputSchema ]),
  where: CityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CityDeleteManyArgsSchema: z.ZodType<Prisma.CityDeleteManyArgs> = z.object({
  where: CityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EventMediaCreateArgsSchema: z.ZodType<Prisma.EventMediaCreateArgs> = z.object({
  select: EventMediaSelectSchema.optional(),
  include: EventMediaIncludeSchema.optional(),
  data: z.union([ EventMediaCreateInputSchema,EventMediaUncheckedCreateInputSchema ]),
}).strict() ;

export const EventMediaUpsertArgsSchema: z.ZodType<Prisma.EventMediaUpsertArgs> = z.object({
  select: EventMediaSelectSchema.optional(),
  include: EventMediaIncludeSchema.optional(),
  where: EventMediaWhereUniqueInputSchema,
  create: z.union([ EventMediaCreateInputSchema,EventMediaUncheckedCreateInputSchema ]),
  update: z.union([ EventMediaUpdateInputSchema,EventMediaUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventMediaCreateManyArgsSchema: z.ZodType<Prisma.EventMediaCreateManyArgs> = z.object({
  data: z.union([ EventMediaCreateManyInputSchema,EventMediaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventMediaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EventMediaCreateManyAndReturnArgs> = z.object({
  data: z.union([ EventMediaCreateManyInputSchema,EventMediaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventMediaDeleteArgsSchema: z.ZodType<Prisma.EventMediaDeleteArgs> = z.object({
  select: EventMediaSelectSchema.optional(),
  include: EventMediaIncludeSchema.optional(),
  where: EventMediaWhereUniqueInputSchema,
}).strict() ;

export const EventMediaUpdateArgsSchema: z.ZodType<Prisma.EventMediaUpdateArgs> = z.object({
  select: EventMediaSelectSchema.optional(),
  include: EventMediaIncludeSchema.optional(),
  data: z.union([ EventMediaUpdateInputSchema,EventMediaUncheckedUpdateInputSchema ]),
  where: EventMediaWhereUniqueInputSchema,
}).strict() ;

export const EventMediaUpdateManyArgsSchema: z.ZodType<Prisma.EventMediaUpdateManyArgs> = z.object({
  data: z.union([ EventMediaUpdateManyMutationInputSchema,EventMediaUncheckedUpdateManyInputSchema ]),
  where: EventMediaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EventMediaUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EventMediaUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EventMediaUpdateManyMutationInputSchema,EventMediaUncheckedUpdateManyInputSchema ]),
  where: EventMediaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EventMediaDeleteManyArgsSchema: z.ZodType<Prisma.EventMediaDeleteManyArgs> = z.object({
  where: EventMediaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EventTagCreateArgsSchema: z.ZodType<Prisma.EventTagCreateArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  data: z.union([ EventTagCreateInputSchema,EventTagUncheckedCreateInputSchema ]),
}).strict() ;

export const EventTagUpsertArgsSchema: z.ZodType<Prisma.EventTagUpsertArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  where: EventTagWhereUniqueInputSchema,
  create: z.union([ EventTagCreateInputSchema,EventTagUncheckedCreateInputSchema ]),
  update: z.union([ EventTagUpdateInputSchema,EventTagUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventTagCreateManyArgsSchema: z.ZodType<Prisma.EventTagCreateManyArgs> = z.object({
  data: z.union([ EventTagCreateManyInputSchema,EventTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventTagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EventTagCreateManyAndReturnArgs> = z.object({
  data: z.union([ EventTagCreateManyInputSchema,EventTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventTagDeleteArgsSchema: z.ZodType<Prisma.EventTagDeleteArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  where: EventTagWhereUniqueInputSchema,
}).strict() ;

export const EventTagUpdateArgsSchema: z.ZodType<Prisma.EventTagUpdateArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  data: z.union([ EventTagUpdateInputSchema,EventTagUncheckedUpdateInputSchema ]),
  where: EventTagWhereUniqueInputSchema,
}).strict() ;

export const EventTagUpdateManyArgsSchema: z.ZodType<Prisma.EventTagUpdateManyArgs> = z.object({
  data: z.union([ EventTagUpdateManyMutationInputSchema,EventTagUncheckedUpdateManyInputSchema ]),
  where: EventTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EventTagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EventTagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EventTagUpdateManyMutationInputSchema,EventTagUncheckedUpdateManyInputSchema ]),
  where: EventTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EventTagDeleteManyArgsSchema: z.ZodType<Prisma.EventTagDeleteManyArgs> = z.object({
  where: EventTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EventCreateArgsSchema: z.ZodType<Prisma.EventCreateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
}).strict() ;

export const EventUpsertArgsSchema: z.ZodType<Prisma.EventUpsertArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
  create: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
  update: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventCreateManyArgsSchema: z.ZodType<Prisma.EventCreateManyArgs> = z.object({
  data: z.union([ EventCreateManyInputSchema,EventCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EventCreateManyAndReturnArgs> = z.object({
  data: z.union([ EventCreateManyInputSchema,EventCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventDeleteArgsSchema: z.ZodType<Prisma.EventDeleteArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateArgsSchema: z.ZodType<Prisma.EventUpdateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateManyArgsSchema: z.ZodType<Prisma.EventUpdateManyArgs> = z.object({
  data: z.union([ EventUpdateManyMutationInputSchema,EventUncheckedUpdateManyInputSchema ]),
  where: EventWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EventUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EventUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EventUpdateManyMutationInputSchema,EventUncheckedUpdateManyInputSchema ]),
  where: EventWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EventDeleteManyArgsSchema: z.ZodType<Prisma.EventDeleteManyArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;