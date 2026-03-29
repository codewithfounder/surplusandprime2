import { useState } from "react";

function AboutContent() {

	return (
		<>
			<section className="about-style-three">
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-sm-12 col-xs-12">
							<div className="about-img-box">
								<img
									src="images/about-us.png"
									alt="Awesome Image"
									style={{ width: '50rem', height: '40rem' }}
								/>
								<div className="content">
									<span>Our Story</span>
									<h3>Something About <br /> Us</h3>
								</div>
							</div>
						</div>

						<div className="col-md-6 col-sm-12 col-xs-12">
							<div className="about-content">
								<h3>
									Global Marketplace for Buying and Selling Industrial Surplus Equipment Worldwide.
								</h3>

								{/* <p>
									Surplus And Prime Worldwide connects global buyers and sellers of surplus industrial equipment. We help operators, distributors, and facility managers recover value from excess inventory while enabling businesses to source quality materials at competitive prices worldwide.
								</p> */}

								{/* Extra Content */}
								{/* {showMore && (
									<div>
										<p>
											We help operators, distributors, and facility managers recover value from excess inventory while enabling businesses to source quality materials at competitive prices worldwide.
										</p>

										<p>
											Our platform ensures transparency, reliability, and seamless transactions across international markets.
										</p>
									</div>
								)} */}

								{/* Button */}
								{/* <a onClick={() => setShowMore(!showMore)} className="about-btn hvr-sweep-to-right" style={{ cursor: 'pointer' }}>{showMore ? "Show Less..." : "Read More..."}</a> */}


							</div>
						</div>
						<div>
							{/* <h3>
								About Surplus And Prime Worldwide
							</h3> */}
							<p>Surplus And Prime Worldwide is a global commercial repurposing and surplus trading company serving multiple industrial sectors including Oil & Gas, Chemical, Power, Solar, Automobile, Marine, Heavy Equipment, Electrical, and General Industrial markets. Our mission is to connect businesses worldwide and create efficient solutions for surplus asset management.<br/><br/>

								We work closely with operators, distributors, procurement teams, facility managers, warehouses, and manufacturers to help them sell excess inventory, closeouts, overstock, unclaimed freight, abandoned goods, and liquidation assets. By leveraging our extensive global network, we ensure maximum value recovery for sellers while providing cost-effective sourcing opportunities for buyers.<br/><br/>

								Our experienced team specializes in matching the right equipment and materials with the right buyers. Whether new, used, surplus, or salvaged, we focus on transparency, reliability, and long-term relationships. We understand the importance of timely execution, competitive pricing, and professional service in today’s fast-moving industrial markets.<br/><br/>

								Through frequent online auctions and a trusted international network of exporters, wholesalers, retailers, and project contractors, we actively source and distribute high-quality surplus materials across the globe. Our goal is simple — to create value, reduce waste, optimize resources, and support sustainable industrial growth.

								At Surplus And Prime Worldwide, we take pride in delivering dependable solutions, personalized service, and global reach for all surplus and equipment needs.</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default AboutContent;