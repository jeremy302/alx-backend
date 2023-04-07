#!/usr/bin/python3
''' lifo cache module '''
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    ''' LIFO cache class '''
    def __init__(self):
        ''' class constructor '''
        super().__init__()
        self.lifo = []

    def put(self, key, item):
        ''' puts an item into the cache '''
        if key is None or item is None:
            return
        if key in self.cache_data:
            self.lifo.remove(key)
        if len(self.lifo) == self.MAX_ITEMS:
            k = self.lifo.pop()
            del self.cache_data[k]
            print('DISCARD: {}'.format(k))
        self.lifo.append(key)
        self.cache_data[key] = item

    def get(self, key):
        ''' gets an item from the cache '''
        return self.cache_data.get(key) if key is not None else None
