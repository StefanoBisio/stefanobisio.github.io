var React = require ('react');

// Renders a single result. The list will be generated in the "Results" component through a .map (line 49)
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
// Takes query, compares to database and renders multiple Result components through a .map()
class Results extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			// Displaying all regions at the beginning
			foundRegions: props.regions
		}
	}
	// Invoked before a component receives new props
	componentWillReceiveProps(nextProps) {
		//compare query (nextProps) with the fields of database and update state if .match()
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

// Renders input, listens for change in the input and gives the value to the onQuery prop (line 94)
class SearchBar extends React.Component {

	handleQuery(event) {
	this.props.onQuery(event.target.value);
}

	render() {
		return(
			// ========== REAL TIME SEARCH STARTS HERE ==============
			<div className="search-bar">
				<input className="form-control" onChange={this.handleQuery.bind(this)} placeholder="Eg: Milan, Tuscany, Risotto"/>
			</div>
		)
	}
}

// Takes query from SearchBar, sets it in its state and passes it as prop in line 95. Keep going on line 34
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
