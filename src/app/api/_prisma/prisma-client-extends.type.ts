import { Prisma } from '@prisma/client';
import { DynamicClientExtensionThis, InternalArgs } from '@prisma/runtime/library';

export type TPrismaClientExtends = DynamicClientExtensionThis<
  Prisma.TypeMap<
    InternalArgs & {
      result: object;
      model: object;
      query: object;
      client: object;
    },
    object
  >,
  Prisma.TypeMapCb<Prisma.PrismaClientOptions>,
  {
    result: object;
    model: object;
    query: object;
    client: object;
  }
>;
