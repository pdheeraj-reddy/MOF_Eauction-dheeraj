import { Moment } from 'moment-mini';
export interface AuctionList {
    ObjectId: string;
    title: string;
    description: string;
    imgsrc: string;
    statuscode: string;
    product: string | number;
    auctiontimeSufix: string;
    auctiondate: string | Date | Moment;
    auctionenddate: string | Date | Moment;
    auctiontime : string | Date | Moment;
    auctionendtime : string | Date | Moment;
}