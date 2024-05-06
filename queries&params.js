const express = require('express');
const app = express();
const {products} = require('./data')

app.get('/', (req, res)=>{
    res.send('<h1>Home Page!</h1><a href = "/api/products">products</a>');
})

// This is for to return multiple Products in the server!
app.get('/api/products', (req, res)=>{
    const newProducts = products.map((product)=>{
        const {id, name, image} = product;
        return {id, name, image};
    })
    res.json(newProducts);
})

// This for a single product show casing in the Server 
app.get('/api/products/:productID', (req, res)=>{
    const {productID} = req.params;
    const singleProduct = products.find((product)=> product.id === Number(productID));

    if(!singleProduct){
        return res.status(404).send('Product Does Not Exist U niggar!');
    }
    return res.json(singleProduct);
})
// to get a review on that product on the server when we give the server-route
app.get('/api/products/:productID/reviews/:reviewID', (req, res)=>{
    console.log(req.params);
    const {reviewID} = req.params
    res.status(200).send('This is the required review for the id: ' + {reviewID})
    const reviewProduct = products.find((product)=> product.desc === reviewID)

    if(!reviewProduct){
        return res.status(404).send("The review of this product does not exist!")
    }
    return res.json(products)
})

app.get('/api/v1/query', (req, res)=>{
    // console.log(req.query);
    const {search, limit} = req.query;
    let sortedProducts = [...products];

    if (search){
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search);
        })
    }

    if (limit){
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }

    if (sortedProducts.length<1){
        //res.send('The search was successful but we couldnt find any data');
        res.status(200).json({success: 'Searched the dat but coulnt find one!', data: []})
    }
    res.status(200).json(sortedProducts);
    // res.send(`The name of the user is {name} and {id} is the user's id!`)
})

app.listen(5006, ()=>{
    console.log("Server is listening in the server 5006....");
});