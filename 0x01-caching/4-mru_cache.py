#!/usr/bin/python3
''' mru cache module '''
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    ''' mRU cache class '''
    def __init__(self):
        ''' class constructor '''
        super().__init__()
        self.info = []
        self.index = 0

    def touch(self, key):
        ''' increment an key's index '''
        if key not in self.cache_data:
            return
        for v in self.info:
            if v[1] == key:
                v[0] = self.index
                self.index += 1
                break

    def put(self, key, item):
        ''' puts an item into the cache '''
        if key is None or item is None:
            return
        if key not in self.cache_data:
            if len(self.info) < self.MAX_ITEMS:
                self.info.append([0, key])
            else:
                obj = max(self.info, key=lambda v: v[0])
                del self.cache_data[obj[1]]
                print('DISCARD: {}'.format(obj[1]))
                obj[1] = key
        self.cache_data[key] = item
        self.touch(key)

    def get(self, key):
        ''' gets an item from the cache '''
        self.touch(key)
        return self.cache_data.get(key) if key is not None else None
