import { Time } from "@angular/common";

export class AuctionBasicMaster {
    auctionId: string;
    auctionType: string;
    auctionSubType: string;
    prevRefNo: string;
    auctionName: string;
    auctionProduct: string;
    auctionManager: string;
    entityNo: string;
    entityName: string;
    auctionDesc: string;
    reasonPrivateAuction: string;
    reason: string;
    auctionStartDate: string;
    auctionEndDate: string;
    auctionStartTime: string;
    auctionStartTimeSufix: string;
    auctionEndTime: string;
    auctionEndTimeSufix: string;
    startAuction: string;
    auctionAnncStartDate: string;
    bidOpeningTime: string;
    bidOpeningTimeSufix: string;
    startPrice: string;
    lowBidValue: string;
    gnteePercentage: string;
    finalGntee: Date;
    commissionType: string;
    pursuitPerCommission: string;
    auctionAttachement: any[] = [];

}

export class AuctionProductMaster {
    sameLocNDate: Boolean;
    location: AuctionLocation;
    products: AuctionProduct[];
}

export class AuctionProduct {
    productName: string;
    productCondition: string;
    productSKUNumber: string;
    productSerialNumber: string;
    productNo: string;
    productFiles: [];
    productValue: string;
    productSpec: string;
    productImages: [];
    location?: AuctionLocation;
}

export class AuctionLocation {
    deliveryDate: Date;
    deliveryTime: Time;
    locLatitude: string;
    locLongitude: string;
    locRegion: string;
    locCity: string;
    locNeighborhood: string;
    locStreet: string;
    notes: string;
}

export class InvoiceForSend {
    auctionReferenceNo?: string;
    auctionDate?: Date;
    auctionTime?: string;
    auctionTimeSufix?: string;
    productsType?: string;
    offerAwardDate?: string;
    offerAwardTime?: string;
    offerAwardTimeSufix?: string;
    facilityName?: string;
    entityName?: string;
    commercialRegNo?: number;
    entityNo?: number;
    deliveryDate?: string;
    region?: string;
    city?: string;
    district?: string;
    street?: string;
    otherNotes?: string;
    productDetails?: ProductDetailsForInvoice[];
    productGrandTotal?: ProductGrandTotal
}
export class InvoiceForProduct {
    applicationPrintingDate?: string;
    productGrandTotal: ProductGrandTotal
    productDetails: ProductDetailsForInvoice[];
}

export class ProductDetailsForInvoice {
    referenceno?: string;
    productname?: string;
    SKUNumber?: string;
}

export class ProductGrandTotal {
    gearPrice?: string;
    questRate?: string;
    valueAddTax?: string;
    totalInvPrice?: string;
}

export class AmAuctionDetails {
    auctionSetting: AuctionSetting;
    // applicationPrintingDate? : string;
}
export class SendOffer {
    auctionSetting: AuctionSetting;
}
export class AuctionSetting {
    bitsNo?: number
    participants?: number;
}

export class OfferReport {
    auctionSetting: AuctionSetting;
    auctionReport: string;
    offerList?: any = []
}

export class UpcomingAuction {
    referenceId: any;
    auction_start_date?: any;
    auction_end_date?: any;
    auction_start_time?: string;
    auction_start_timeSufix?: string;
    auction_enddate?: any;
    auctionSetting?: AuctionSetting;
    auctionStatus?: string;
    auctionImage?: any[] = [];
    auctionnote1?: string;
    auctionnote2?: string;
    productCount?: number;
    auctionStartsdate?: any;
    auctionStartstime?: string;
    auctionStartstimeSufix?: string;
    biddingStatus?: string;
    important_info?: ImportantInfo;
    auction_detail?: Auction_detail;
    productDetails?: ProductDetails;
}
export class ImportantInfo {
    auctionstartprice?: string;
    guarantee_per?: string;
    commissionRate?: AuctionSetting;
    end_biddingdate?: string;
    end_biddingtime?: string;
    end_biddingtimeSufix?: string;
    open_biddingdate?: string;
    open_biddingtime?: string;
    open_biddingtimeSufix?: string;
}
export class Auction_detail {
    auctionId?: string;
    auctionType?: string;
    BiddingMethod?: string;
    auctionName?: string;
    auctionProduct?: string;
    entityNo?: string;
    entityName?: string;
    auctionDesc?: string;
    auctionStartDate?: string;
    auctionStartTime?: string;
    biddingBeginstimeSufix?: string;
    auctionEndDate?: string;
    auctionEndTime?: string;
    end_biddingtimeSufix?: string;
    startAuction?: string;
    auctionAnncStartDate?: string;
    auctionAnncStartTime?: string;
    bidOpeningtimeSufix?: string;
    startPrice?: string;
    gnteePercentage?: string;
    commissionType?: string;
    pursuitPerCommission?: string;
    finalgnteePaymentDays?: string;
    auctionAttachement?: any[] = [];
}
export class ProductDetails {
    productTitle?: string;
    productName?: string;
    productCondition?: string;
    deliveryDate?: string;
    deliveryTime?: string;
    productNo?: string;
    productSpecification?: string;
    locLatitude: number;
    locLongitude: number;
    productimg: any[] = [];
    auctionAttachement: any[] = [];
}