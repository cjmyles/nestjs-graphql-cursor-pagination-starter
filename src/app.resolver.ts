import { Resolver, Query, Args } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';

import AppService from './app.service';

import ConnectionArgs from './connection.args';
import Zip from './entities/zip/zip.entity';
import ZipResponse from './zip.response';

@Resolver(() => Zip)
@Resolver()
export default class AppResolver {
  private readonly service: AppService;

  public constructor(service: AppService) {
    this.service = service;
  }

  @Query(() => String)
  public test() {
    return 'here';
  }

  @Query(() => ZipResponse)
  public async getZips(@Args() args: ConnectionArgs): Promise<ZipResponse> {
    const { limit, offset } = args.pagingParams();
    const [zips, count] = await this.service.getZips(limit, offset);
    const page = connectionFromArraySlice(zips, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }
}
