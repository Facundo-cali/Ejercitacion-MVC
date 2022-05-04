const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let guardar = (products)=>{fs.writeFileSync(path.join(__dirname, "../data/productsDataBase.json"),JSON.stringify(products, null, " "),"utf-8");
console.log(products);}	

module.exports = {
	index: (req, res) => {
		res.render('products', {products});
	},
	detail: (req, res) => {

		for (let i = 0; i < products.length; i++) {
			if (products[i].id == req.params.id) {
				producto_encontrado = products[i];
			}
		}
		res.render('detail', {producto_encontrado});
		
	},
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name,price,discount,category,description} = req.body// Do the magic
		let newProduct = {
			id:products[products.length-1].id+1,    //busco el ultimo elemento del array y le sumo 1;
			name:name,
			price:price,                              //Tambien se puede hacer let NewProduct = { id:17, ...req}(...req toma todas las propiedades)
			discount:discount,
			category:category,
			description:description
		};
		
		products.push(newProduct);
		guardar(products);
		res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		for (let i = 0; i < products.length; i++) {
			if (products[i].id == req.params.id) {
				producto_encontrado = products[i];
			}
		}
		res.render('product-edit-form', {producto_encontrado});// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		console.log(req.body);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		for (let i = 0; i < products.length; i++) {
			if (products[i].id == req.params.id) {
				producto_encontrado = products[i];
			}
		}
		
		products.splice(producto_encontrado-1,1);
		guardar(products);
		res.redirect('/products');
	}
};

