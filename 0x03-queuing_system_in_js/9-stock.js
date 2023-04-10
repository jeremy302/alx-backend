import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

const listProducts = [
    {itemId: 1, itemName: 'Suitcase 250', price: 50,  initialAvailableQuantity: 4},
    {itemId: 2, itemName: 'Suitcase 450', price: 100,  initialAvailableQuantity: 10},
    {itemId: 3, itemName: 'Suitcase 650', price: 350,  initialAvailableQuantity: 2},
    {itemId: 4, itemName: 'Suitcase 1050', price: 550,  initialAvailableQuantity: 5},
]

function getItemById(id){
    return listProducts.find(v => v.itemId === id);
}

const app = express();
const port = 1245;

app.get('/list_products', (req, res) => {
    res.json(listProducts);
});

app.listen(port);

const client = createClient();

function reserveStockById(itemId, stock){
    client.SET(`item.${itemId}`, stock);
}
async function getCurrentReservedStockById(itemId){
    const p = promisify(client.get).bind(client);
    return await p(`item.${itemId}`);
}

app.get('/list_products/:itemId', async (req, res) => {
    const id = Number(req.params.itemId);
    const obj = getItemById(id);
    if (!obj)
    {
        res.json({status: "Product not found"});
        return;
    }
    const currentQuantity = obj.initialAvailableQuantity - (await getCurrentReservedStockById(id) || 0);
    res.json({...obj, currentQuantity});
});

app.get('/reserve_product/:itemId', async (req, res) => {
    const id = Number(req.params.itemId);
    const obj = getItemById(id);
    if (!obj)
    {
        res.json({status: "Product not found"});
        return;
    }
    const currentQuantity = obj.initialAvailableQuantity - (await getCurrentReservedStockById(id) || 0);
    if (currentQuantity <= 0)
    {
        res.json({status:"Not enough stock available", itemId: id});
        return;
    }
    reserveStockById(id, 1);
    res.json({status:"Reservation confirmed",itemId:1});
});
