import { Moment } from 'moment-mini';
export interface AuctionList {
    ObjectId: string;
    title: string;
    description: string;
    imgsrc: string;
    statuscode: string;
    product: string | number;
    auctiontimeSufix: string;
    auctiondate: string;
    auctiontime: string | Date | Moment;
    auctionenddate: string | number;
}