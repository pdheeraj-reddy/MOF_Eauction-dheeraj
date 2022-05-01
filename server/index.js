var auctions = require('./bidder/auctions');
var auctionDetails = require('./bidder/auction-details');
var auctionFinalInvoice = require('./bidder/auction-final-invoice');

module.exports = () => {
    const data = { auctions, auctionDetails, auctionFinalInvoice };
    return data
}
  