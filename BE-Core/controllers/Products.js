const { Product, Category, User, Order } = require('../models')

const cloudinary = require('cloudinary').v2
const axios = require('axios')
const midtransClient = require("midtrans-client");
const gemini = require('../helpers/gemini.js')

class controllerProducts {
    static async getProducts(req, res, next) {
        try {
           // Extract query parameters
        const { filter, sort, page } = req.query;
        let limit = 8;
        let pageNumber = 1;
        const apiUrl = 'https://api.escuelajs.co/api/v1/products';

        // Prepare query parameters for the API request
        let apiParams = {};

        if (filter) {
            apiParams.categoryId = filter; // Assuming filter refers to categoryId in the external API
        }

        if (sort) {
            const sortBy = sort[0] === '-' ? 'desc' : 'asc';
            const sortByField = sort[0] === '-' ? sort.slice(1) : sort;
            apiParams.sort = `${sortByField}:${sortBy}`;
        }

        if (page?.size) {
            limit = parseInt(page.size);
        }

        if (page?.number) {
            pageNumber = parseInt(page.number);
        }

        // Fetch data from the external API with pagination
        const { data } = await axios.get(apiUrl
            // , {
            // params: {
            //     ...apiParams,
            //     limit: limit,
            //     offset: (pageNumber - 1) * limit,
            // },
        // }
    );
        // console.log(data)

        // Return the response in the expected format
        res.status(200).json({
            page: pageNumber,
            data: data,
            totalData: data.length,
            totalPages: Math.ceil(data.length / limit), // If needed, fetch the total count from the external API or estimate
            dataPerPage: limit,
        });
        
        } catch (err) {
            console.error('Error fetching data from the API:', err);
            if (err.response) {
                // API responded with an error
                console.error('API error response:', err.response.data);
            } else if (err.request) {
                // Request was made but no response received
                console.error('API request error:', err.request);
            } else {
                // Something else happened
                console.error('Error:', err.message);
            }
            next(err)
        }
    }
    static async  postProducts(req, res, next) {
        try {
            const { name, description, price, stock, imgUrl, categoryId } = req.body
            // console.log(req.body, '<<< req.body')
            if (!name || !description || !price || !stock || !imgUrl || !categoryId) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const user = req.user
            // console.log(user, '<<< user')
            const products = await Product.create({
                name,
                description,
                price,
                stock,
                imgUrl,
                categoryId,
                authorId: user.id
            })
            res.status(201).json(products)
        } catch (err) {
           next(err)
        }
    }
    static async getProductsId(req, res, next) {
        try {
            const { id } = req.params;
        
            // Make a GET request to the external API to fetch the product data
            const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
            
            // If the product exists, it will be returned in the response
            const product = response.data;

            if (!product) {
                throw { name: 'NotFound' };
            }

            res.status(200).json(product);  // Return the product data as JSON
        } catch (err) {
            next(err)
        }
    }
    static async putProductsId(req, res, next) {
        try {
            const { id } = req.params
            const productID = await Product.findByPk(id);
            if (!productID) {
                throw { name: "NotFound" };
            }

            const { name, description, price, stock, imgUrl, categoryId } = req.body

            const updatedProducts = await Product.update({
                name,
                description,
                price,
                stock,
                imgUrl,
                categoryId
            }, {
                where: {
                    id
                }
            })
            const updatedId = await Product.findByPk(id);
            res.status(200).json(updatedId)
        } catch (err) {
            next(err)
           console.log(err, '<<< error putProductsId')
        }
    }
    static async patchProductsId(req, res, next) {
        try {
        // console.log(req.file)
        cloudinary.config ({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })

        const buff64 = Buffer.from(req.file.buffer).toString('base64')
        const dataUri = `data:${req.file.mimetype};base64,${buff64}`

        const uploadResponse = await cloudinary.uploader.upload(dataUri, {})

        // console.log(uploadResponse, '<<< uploadResponse')
        const pictUrl = uploadResponse.secure_url

        const { id } = req.params
        const { name, description, price, stock, categoryId } = req.body

        const updatedProducts = await Product.update({
            name,
            description,
            price,
            stock,
            imgUrl: pictUrl,
            categoryId
        }, {
            where: {
                id
            }
        })
        res.status(200).json(updatedProducts)
        }
        catch (err) {
            // console.log(err, '<<< error patchProductsId')
            next(err)
        }
    }
    static async deleteProductsId(req, res, next) {
        try {
            const { id } = req.params
            const products = await Product.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({
                message: "Product successfully deleted",
                products
            });
        } catch (err) {
            next(err)
        }
    }
    static async checkout(req, res, next) {        
        try {
            // console.log(req.user.id, '<<< req.user')
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : process.env.MIDTRANS_SERVER_KEY,
            });
            console.log(process.env.MIDTRANS_SERVER_KEY, '<<< process.env.MIDTRANS_SERVER_KEY')
        
            const orderId = Math.random().toString()
            const amount = 10000;

            let parameter = {
                "transaction_details": {
                    "order_id": orderId,
                    "gross_amount": amount
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "first_name": req.user.username,                    
                    "email": req.user.email,                    
                }
            };
        
            const transaction = await snap.createTransaction(parameter)                
            let transactionToken = transaction.token;
            // console.log('transactionToken:',transactionToken);
            await Order.create({
                orderId,
                amount,
                userId: req.user.id
                 
            })
            res.status(200).json({
                message: "Checkout Success", transactionToken, orderId
            });
        } catch (err) {
            next(err)
            console.log(err, '<<< error che ckout')
        }
    }
    static async postAskMe(req, res, next) {
        const { prompt } = req.body;
        // console.log(prompt, '<<< prompt')       
        try {
            if (!prompt) {
                throw { name: 'PromptRequired' }
            }
          let data = await gemini(prompt)
          res.status(200).json({ reply: data })        
        } catch (err) {
            next(err)
            console.log(err)
        }
    }    
}


module.exports = controllerProducts