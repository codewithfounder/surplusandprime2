function ContactInfo() {
    return (
        <>
            <section className="contact-page sec-pad">
                <div className="container">
                    <div className="sec-title text-center">
                        <h3>
                            Get in <span>touch</span>
                        </h3>
                        <p>
                            You will find yourself working in a true partnership that results
                            in an incredible <br /> experience, and an end product that is the
                            best.
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="contact-image">
                <img
                  src="/images/contact2.jpg"
                  alt="Contact"
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              </div>
                        </div>

                        <div className="col-md-6">
                            <form action="inc/sendemail.php" className="contact-form">
                                <h3>Send Mail</h3>

                                <input
                                    type="text"
                                    placeholder="Your name.."
                                    name="name"
                                />

                                <input
                                    type="text"
                                    placeholder="Your email address.."
                                    name="email"
                                />

                                <input
                                    type="text"
                                    placeholder="Your Location.."
                                    name="subject"
                                />

                                <textarea
                                    placeholder="Write..."
                                    name="message"
                                ></textarea>

                                <button type="submit" className="hvr-sweep-to-right">
                                    Send
                                </button>
                                <div className="sec-title" style={{marginTop: '2rem'}}>
                        <p>
                            You will find yourself working in a true partnership that results
                            in an incredible <br /> experience, and an end product that is the
                            best.
                        </p>
                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ContactInfo;