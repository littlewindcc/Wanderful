import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {
	ReactiveBase,
	DataSearch,
	RatingsFilter,
	MultiList,
	ToggleList,
	ResultList
} from '@appbaseio/reactivesearch';

import { ReactiveMap } from '@appbaseio/reactivemaps';

import './wanderful.scss';

class Indx extends Component {

	onData(res) {
		const result = {
			image: res.picture_url,
			title: res.name,
			desc: (
				<div>
					<p>{res.address}</p>
					<span className="tag">{res.place_type}</span>
					<span className="tag">{res.tag}</span>
				</div>),
			url: res.listing_url
		};
		return result;
	}

	onPopoverTrigger(marker) {
		return (<div className="row" style={{ margin: "0", maxWidth: "300px", paddingTop: 10 }}>
			<div className="col s12">
				<div>
					<strong>{marker._source.name}</strong>
				</div>
				<p style={{ margin: "5px 0", lineHeight: "18px" }}>
					{marker._source.address}
				</p>
			</div>
		</div>);
	}

	render() {
		return (
			<ReactiveBase
				app="wanderful4"
				credentials="rQFkQEu8o:7376c9cb-98de-4b93-bf26-468461f1c941"
				type="pmmock"
			>
					<header>
						<nav className="background-color:rgba(0, 0, 0, 0.5);">
							<a className="brand">wanderful</a>
							<DataSearch
								componentId="NameSensor"
								placeholder="Search for destination..."
								appbaseField="name"
								searchInputId="NameSearch"
							/>
							<div className="nav-wrapper">
 								<ul className="right hide-on-med-and-down">
 									<li><a className="black-text" href="sass.html">Sign Up</a></li>
 									<li><a className="black-text" href="badges.html">Log In</a></li>
 								</ul>
 						 </div>
						</nav>
					</header>

					<section className="result-wrapper clearfix">
						<div className="left-col">
							<aside className="filters-wrapper">
								<div className="scroll-wrapper">
									<ToggleList
										appbaseField="wifi"
										componentId="WifiSensor"
										title="Matter Most"
										data={[
											{
												label: "Safty", //Wifi
												value: true
											}
										]}
									/>
									<ToggleList
										appbaseField="easy_commute"
										componentId="TrafficSensor"
										data={[
											{
												label: "Easy Commute",
												value: true
											}
										]}
									/>
									<ToggleList
										appbaseField="attractions"
										componentId="AttracSensor"
										data={[
											{
												label: "amazing Price",
												value: true
											}
										]}
									/>
									<ToggleList
										appbaseField="parking_space"
										componentId="ParkingSensor"
										data={[
											{
												label: "Parking Space",
												value: true
											}
										]}
									/>
									{/* reset list begin */}

									<ToggleList
										appbaseField="wifi"
										componentId="WifiSensor"
										title="Commute by Car"
										data={[
											{
												label: "< 30 min",
												value: true
											}
										]}
									/>
									<ToggleList
										appbaseField="attractions"
										componentId="AttracSensor"
										data={[
											{
												label: "30-60 min",
												value: true
											}
										]}
									/>
									<ToggleList
										appbaseField="easy_commute"
										componentId="TrafficSensor"
										data={[
											{
												label: "1.0-1.5 hr",
												value: true
											}
										]}
									/>

									<ToggleList
										appbaseField="parking_space"
										componentId="ParkingSensor"
										data={[
											{
												label: "> 1.5 hr",
												value: true
											}
										]}
									/>
									{/* reset list end */}



									<MultiList
										appbaseField="tag"
										title="Maybe Matters"
										componentId="TagSensor"
										react={{
											and: ["RatingsSensor", "TypeSensor", "WifiSensor", "TrafficSensor", "AttracSensor", "ParkingSensor"]
										}}
									/>
									<RatingsFilter
										componentId="RatingsSensor"
										appbaseField="rating"
										title="Safty Ratings"
										data={[
											{ start: 5, end: 5, label: "5 stars and up" },
											{ start: 4, end: 5, label: "4 stars and up" },
											{ start: 3, end: 5, label: "3 stars and up" },
											{ start: 2, end: 5, label: "2 stars and up" },
											{ start: 1, end: 5, label: "1 stars and up" }
										]}
										defaultSelected={{start: 1, end: 5}}
										react={{
											and: ["TagSensor", "TagSensor", "WifiSensor", "TrafficSensor", "AttracSensor", "ParkingSensor"]
										}}
									/>
									{/* <MultiList
										appbaseField="place_type"
										title="Place Type"
										componentId="TypeSensor"
										react={{
											and: ["RatingsSensor", "TagSensor", "WifiSensor", "TrafficSensor", "AttracSensor", "ParkingSensor"]
										}}
									/> */}

								</div>
							</aside>

							<div className="list">
								<ResultList
									componentId="SearchResult"
									appbaseField="name"
									from={0}
									size={5}
									onData={this.onData}
									pagination={true}
									react={{
										and: ["NameSensor", "RatingsSensor", "TagSensor", "TagSensor", "WifiSensor", "TrafficSensor", "AttracSensor", "ParkingSensor"]
									}}
								/>
							</div>
						</div>

						<div className="right-col">
							<ReactiveMap
								appbaseField="location"
								defaultZoom={12}
								defaultCenter={{ lat: 37.73, lon: -122.45 }}
								historicalData={false}
								setMarkerCluster={false}
								showMapStyles={false}
								showSearchAsMove={false}
								defaultMapStyle="Standard"
								onPopoverTrigger={this.onPopoverTrigger}
								autoCenter={true}
								size={100}
								react={{
									and: ["NameSensor", "RatingsSensor", "TagSensor", "TagSensor", "WifiSensor", "TrafficSensor", "AttracSensor", "ParkingSensor"]
								}}
							/>
						</div>

					</section>

					<footer className="page-footer">
	          <div className="container">
	            <div className="row">
	              <div className="col l6 s12">
	                <h5 className="black-text">Wanderland</h5>
	                <p className="black-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
	              </div>
	              <div className="col l4 offset-l2 s12">
	                <h5 className="black-text">Email</h5>
	                <ul>
	                  <li><a className="black-text" href="#!">Contact</a></li>
	                  <li><a className="black-text" href="#!">Join us</a></li>
	                  <li><a className="black-text" href="#!">Follow our git</a></li>
	                  <li><a className="black-text" href="#!">Facebook</a></li>
	                </ul>
	              </div>
	            </div>
	          </div>
	          <div className="footer-copyright">
	            <div className="container">
	            	<a className="black-text" href="#!">© 2017 Copyright Text</a>
	            </div>
	          </div>
	        </footer>

				</ReactiveBase>

			);
		}
}

ReactDom.render(<Indx />, document.getElementById('app'));
