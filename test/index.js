const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const fs = require("fs");

const app = require("../app.js");

chai.use(chaiHttp);

describe("API ENDPOINT TESTING", () => {
  it("GET LANDING PAGE", (done) => {
    chai
      .request(app)
      .get("/api/v1/member/landing-page")
      .end((error, res) => {
        expect(error).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("Object");
        expect(res.body).to.have.property("hero");
        expect(res.body.hero).to.have.all.keys(
          "travelers",
          "treasures",
          "cities"
        );
        expect(res.body).to.have.property("mostPicked");
        expect(res.body.mostPicked).to.have.an("array");
        expect(res.body).to.have.property("category");
        expect(res.body.category).to.have.an("array");
        expect(res.body).to.have.property("testimonial");
        expect(res.body.testimonial).to.have.an("object");
        done();
      });
  });

  it("POST Booking Page", (done) => {
    const image = __dirname + "/bukti.jpeg";

    const dataSample = {
      image,
      idItem: "5e96cbe292b97300fc902223",
      duration: 2,
      bookingStartDate: "2020-12-11T17:00:00.000+00:00",
      bookingEndDate: "2020-12-11T17:00:00.000+00:00",
      firstName: "itce",
      lastName: "diasari",
      email: "itce@gmail.com",
      phoneNumber: "08150008989",
      accountHolder: "itce",
      bankFrom: "BNI",
    };
    chai
      .request(app)
      .post("/api/v1/member/booking-page")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .field("idItem", dataSample.idItem)
      .field("duration", dataSample.duration)
      .field("bookingStartDate", dataSample.bookingStartDate)
      .field("bookingEndDate", dataSample.bookingEndDate)
      .field("firstName", dataSample.firstName)
      .field("lastName", dataSample.lastName)
      .field("email", dataSample.email)
      .field("phoneNumber", dataSample.phoneNumber)
      .field("accountHolder", dataSample.accountHolder)
      .field("bankFrom", dataSample.bankFrom)
      .attach("image", fs.readFileSync(dataSample.image), "bukti.jpeg")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Booking Success");
        expect(res.body).to.have.property("booking");
        expect(res.body.booking).to.have.all.keys(
          "payments",
          "_id",
          "invoice",
          "bookingStartDate",
          "bookingEndDate",
          "total",
          "itemId",
          "memberId",
          "__v"
        );
        expect(res.body.booking.payments).to.have.all.keys(
          "status",
          "proofPayment",
          "bankFrom",
          "accountHolder"
        );
        expect(res.body.booking.itemId).to.have.all.keys(
          "_id",
          "title",
          "price",
          "duration"
        );
        console.log(res.body.booking);
        done();
      });
  });
});
