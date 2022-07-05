
export function getStatusText(auctionStatus: string) {
    if(auctionStatus=="Published"){
        return "Upcoming"
    }else if(auctionStatus=="Ongoing"){
        return "Ongoing";
    }else if(auctionStatus.startsWith("Pending")){
        return auctionStatus;
    }else if(auctionStatus=="Terminated"){
        return "Cancelled";
    }else if(auctionStatus=="Awarded"){
        return "Awarded";
    } else{
        return "";
    }
}
