import React, { Component } from 'react';
import {
	Grid,
	Row,
	Col,
	Button,
	Form,
	FormGroup,
	FormControl,
	ControlLabel,
	PageHeader,
	Media,
	ListGroup,
	ListGroupItem
} from 'react-bootstrap';
import './walmart.css';
import axios from 'axios';
import ReactLoading from 'react-loading';

class WalmartSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			isLoading: false,
			products: null,
			searches: []
		};
	}

	setLoading = (value) => {
		this.setState({
			isLoading: value
		});
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		let searchValue = this.state.searchValue;

		this.updateProducts(searchValue);
	};

	handleRecentClick = (event) => {
		this.updateProducts(event.target.textContent);
	};

	updateProducts = async (searchValue) => {
		this.setLoading(true);

		let apiURL = '';

		if (process.env.NODE_ENV === 'development') {
			apiURL = process.env.REACT_APP_DEV_ENV;
		} else {
			apiURL = 'https://walmartsearch.herokuapp.com/walmart/product/';
		}

		let response = await axios.get(`${apiURL}${searchValue}`);
		let products = response.data.items;

		let searches = this.state.searches;

		if (searches.includes(searchValue)) {
			// remove search from list and add it to beginning
			let index = searches.indexOf(searchValue);
			searches.splice(index, 1);
			searches.unshift(searchValue);
		} else {
			searches.unshift(searchValue);
		}

		this.setState({
			products,
			searches,
			isLoading: false
		});
	};

	handleChange = (event) => {
		this.setState({
			searchValue: event.target.value
		});
	};

	getRecentSearches = () => {
		let searches = this.state.searches;

		let DOMElements = [];

		for (let search of searches) {
			let element = (
				<div key={search} className="searchable" onClick={this.handleRecentClick}>
					{search}
				</div>
			);
			DOMElements.push(element);
		}

		return DOMElements;
	};

	getAllProduct = () => {
		let products = this.state.products;

		if (!products) {
			return null;
		} else {
			let structures = [];

			for (let product of products) {
				let structure = (
					<Media key={product.itemId}>
						<Media.Left>
							<img width={128} height={128} src={product.mediumImage} />
						</Media.Left>
						<Media.Body>
							<Media.Heading>{product.name}</Media.Heading>
							<p>{product.longDescription}</p>
							<p className="blue bold">Price: ${product.salePrice}</p>

							<p>
								<span className="red bold">
									Reviews: {product.numReviews} Average Rating: {product.customerRating}
								</span>
							</p>
							<p>
								<a href={product.productUrl} target="_blank">
									Visit Product Page
								</a>
							</p>
							<hr />
						</Media.Body>
					</Media>
				);
				structures.push(structure);
			}

			return structures;
		}
	};

	render() {
		return (
			<Grid>
				<Row>
					<Col sm={2} xsHidden={true} />
					<Col xs={12} sm={8}>
						<PageHeader>Walmart Product Search</PageHeader>
					</Col>
					<Col sm={2} xsHidden={true} />
				</Row>
				<Row>
					<Col xsHidden={true} sm={2} />
					<Col sm={8}>
						<Row>
							<Form>
								<Col xs={10} sm={10}>
									<FormGroup controlId="productName">
										<FormControl
											type="text"
											placeholder="Enter a product name"
											value={this.state.searchValue}
											onChange={this.handleChange}
										/>
									</FormGroup>
								</Col>
								<Col xs={2} sm={2}>
									<Button bsStyle="primary" type="submit" onClick={this.handleSubmit}>
										Search
									</Button>
								</Col>
							</Form>
						</Row>
					</Col>
					<Col sm={2} xsHidden={true} />
				</Row>
				<Row>
					<Col sm={2} xs={12}>
						<div className="bold blue">Recent Searches:</div>
						{this.getRecentSearches()}
					</Col>
					<Col sm={10} xs={12}>
						<div className="bold">Search Results</div>
						{this.state.isLoading ? <ReactLoading type="bars" color="#286090" /> : this.getAllProduct()}
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default WalmartSearch;
