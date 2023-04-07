#!/usr/bin/python3
''' basic cache module '''
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    ''' basic cache class '''
    def put(self, key, item):
        ''' puts an item into the cache '''
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        ''' gets an item from the cache '''
        return self.cache_data.get(key) if key is not None else None
