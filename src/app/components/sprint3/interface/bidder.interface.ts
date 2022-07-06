export interface AuctionList {
    ObjectId: string;
    title: string;
    description: string;
    imgsrc: string;
    statuscode: string;
    product: string | number;
    auctiondate: string;
    auctiontime: string;
    auctionenddate: string;
}