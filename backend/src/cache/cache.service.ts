import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Nullish } from 'src/types';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async retriveData<T>(key: string): Promise<Nullish<T>> {
    const value = await this.cacheManager.get(key);
    return value as Nullish<T>;
  }

  async storeData<T>(key: string, value: T): Promise<void> {
    await this.cacheManager.set(key, value, 600000);
  }
}
