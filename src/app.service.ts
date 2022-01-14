import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import Zip from './entities/zip/zip.entity';

@Injectable()
export default class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private readonly repo: EntityRepository<Zip>;

  public async getZips(
    limit: number,
    offset: number,
  ): Promise<[Zip[], number]> {
    const zips = await this.repo.findAndCount({}, { limit, offset });
    return zips;
  }

  public constructor(@InjectRepository(Zip) repo: EntityRepository<Zip>) {
    this.repo = repo;
  }
}
