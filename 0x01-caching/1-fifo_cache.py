#!/usr/bin/python3
''' fifo cache module '''
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    ''' FIFO cache class '''
    def __init__(self):
        ''' class constructor '''
        super().__init__()
        self.fifo = []

    def put(self, key, item):
        ''' puts an item into the cache '''
        if key is None or item is None:
            return
        if key in self.cache_data:
            self.fifo.remove(key)
        if len(self.fifo) == self.MAX_ITEMS:
            k = self.fifo.pop()
            del self.cache_data[k]
            print('DISCARD: {}'.format(k))
        self.fifo.insert(0, key)
        self.cache_data[key] = item

    def get(self, key):
        ''' gets an item from the cache '''
        return self.cache_data.get(key) if key is not None else None
