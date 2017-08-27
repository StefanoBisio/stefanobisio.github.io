var React = require ('react');


class Result extends React.Component {

	render(){
		return(
			<div className="row">
				<div className="col-sm-6">
					<h2><a href={this.props.region.url} target="_blank">{this.props.region.name}</a></h2>
					<p><img className="flag" src={this.props.region.flag} />
					<img className="flag" src={this.props.region.location} /></p>
				</div>
				<div className="col-sm-6">
					<p><strong>Provinces:</strong><br/> {this.props.region.provinces}</p>        		
					<p><strong>Dishes:</strong><br/>{this.props.region.dishes}</p>
				</div>
			</div>
		)
	}

}

class Results extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			foundRegions: props.regions
		}
	}

	componentWillReceiveProps(nextProps) {
		//compare query (nextProps) with the fields of database
		var foundRegions = nextProps.regions.filter(region => {
			return region.name.toLowerCase().match(nextProps.query.toLowerCase())||
				   region.dishes.toLowerCase().match(nextProps.query.toLowerCase()) ||
				   region.provinces.toLowerCase().match(nextProps.query.toLowerCase())
		});
		this.setState({
			foundRegions : foundRegions
		});
	}

	render(){
		return(
			<div className="result">
				{this.state.foundRegions.map(function(region, i){
					return (
						<Result region = {region} key={i} />
					)
				})}
				
				
			</div>
		)
	}
}


class SearchBar extends React.Component {

	handleQuery(event) {
	this.props.onQuery(event.target.value);
}

	render() {
		return(
			<div className="search-bar">
				<input className="form-control" onChange={this.handleQuery.bind(this)} placeholder="Eg: Milan, Tuscany, Risotto"/>
			</div>
		)
	}
}


class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query : ''
		};
	}

	handleQuery(query) {
		this.setState({'query': query.toLowerCase().trim()})
	}

	render () {
		return (
			<div className="search">
				<SearchBar onQuery={this.handleQuery.bind(this)}/>
				<Results regions={this.props.regions} query={this.state.query}/>
			</div>
		)
	}

}

	module.exports = Search;
