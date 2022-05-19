import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment-mini';

@Injectable({
  providedIn: 'root'
})
export class InterconversionService {

  constructor() { }

  public getAuctionTypeDesc(type: string) {
    if (type === 'O') {
      return 'Public';
    } else if (type === 'C') {
      return 'Private';
    } else {
      return '';
    }
  }

  public getAuctionSubTypeDesc(type: string) {
    if (type === 'D') {
      return 'Direct';
    } else if (type === 'C') {
      return 'Closed';
    } else {
      return '';
    }
  }

  public getStartAuctionDesc(type: string) {
    if (type === 'T') {
      return 'To me';
    } else if (type === 'M') {
      return 'Manual';
    } else {
      return '';
    }
  }

  public mappingObjForView(serverObj: any) {
    console.log('InterconversionService :: mappingObjForView');
    let auctionDetails: any = {};
    auctionDetails.auctionId = serverObj.ObjectId;
    auctionDetails.auctionType = this.getAuctionTypeDesc(
      serverObj.BidType
    );
    auctionDetails.auctionSubType = this.getAuctionSubTypeDesc(
      serverObj.ZzCloseInd
    );
    auctionDetails.prevRefNo = serverObj.ZzPrevAucId1;
    auctionDetails.auctionName = serverObj.Description;
    auctionDetails.auctionProduct = serverObj.ZzAucProduct;
    auctionDetails.entityNo = serverObj.ZzAgencyId;
    auctionDetails.entityName = serverObj.ZzAgencyName;
    auctionDetails.auctionDesc = serverObj.ZzAucDesc;
    auctionDetails.auctionStartDate = serverObj.ZzAucSrtDt
      ? serverObj.ZzAucSrtDt !== 0
        ? moment(
            serverObj.ZzAucSrtDt.split(' ')[0],
            'DD.MM.YYYY'
          ).format('YYYY-MM-DD')
        : ''
      : '';
    auctionDetails.auctionStartTime = serverObj.ZzAucSrtDt
      ? serverObj.ZzAucSrtDt !== 0
        ? moment(
            serverObj.ZzAucSrtDt.split(' ')[1],
            'HH:mm:ss'
          ).format('hh:mm')
        : ''
      : '';
    auctionDetails.auctionStartTimeSufix = serverObj.ZzAucSrtDt
      ? serverObj.ZzAucSrtDt !== 0
        ? moment(
            serverObj.ZzAucSrtDt.split(' ')[1],
            'HH:mm:ss'
          ).format('A')
        : ''
      : '';
    auctionDetails.auctionEndDate = serverObj.ZzAucEndDt
      ? serverObj.ZzAucEndDt !== 0
        ? moment(
            serverObj.ZzAucEndDt.split(' ')[0],
            'DD.MM.YYYY'
          ).format('YYYY-MM-DD')
        : ''
      : '';
    auctionDetails.auctionEndTime = serverObj.ZzAucEndDt
      ? serverObj.ZzAucEndDt !== 0
        ? moment(
            serverObj.ZzAucEndDt.split(' ')[1],
            'HH:mm:ss'
          ).format('hh:mm')
        : ''
      : '';
    auctionDetails.auctionEndTimeSufix = serverObj.ZzAucEndDt
      ? serverObj.ZzAucEndDt !== 0
        ? moment(
            serverObj.ZzAucEndDt.split(' ')[1],
            'HH:mm:ss'
          ).format('A')
        : ''
      : '';

    auctionDetails.startAuction = this.getStartAuctionDesc(
      serverObj.ZzStartMethod
    );
    auctionDetails.auctionAnncStartDate = serverObj.ZzAnncSrtD
      ? moment(serverObj.ZzAnncSrtD, 'DD.MM.YYYY').format(
          'YYYY-MM-DD'
        )
      : '';
    auctionDetails.auctionAnncEndDate = serverObj.ZzAnncEndD
      ? moment(serverObj.ZzAnncEndD, 'DD.MM.YYYY').format(
          'YYYY-MM-DD'
        )
      : '';
    auctionDetails.startPrice = serverObj.ZzBidSrtPrice;
    auctionDetails.lowBidValue = serverObj.ZzLowBidVl;
    auctionDetails.gnteePercentage = serverObj.ZzIbgaPercent;
    auctionDetails.finalGntee = serverObj.ZzFbgaDeadline;
    auctionDetails.commissionType = serverObj.ZzCommisionTyp;
    auctionDetails.pursuitPerCommission = serverObj.ZzCommPercent;
    auctionDetails.auctionAttachement = [];

    if (serverObj.listtoattachnav['results']) {
      console.log("att data form API", serverObj.listtoattachnav['results']);
      serverObj.listtoattachnav['results'].forEach(
        (value: any, index: any, array: any) => {
          if (value.ObjectType == '/AuctionDocuments') {
            var fileupload = {
              name: value.FileName + '.' + value.FileExt,
              size: '',
              type: '',
              filesrc: '',
              FilenetId: value.FilenetId,
              MIMEType: value.MIMEType,
            };
            auctionDetails.auctionAttachement.push(fileupload);
          }
          if (value.ObjectType == '/AuctionProductImages') {
            console.log(index, 'attachment index');
            var fileupload = {
              name: value.FileName + '.' + value.FileExt,
              size: '',
              type: '',
              filesrc: '',
              FilenetId: value.FilenetId,
              MIMEType: value.MIMEType,
            };
          }
        }
      );
    }
    return auctionDetails;
  }

  public mappingObjForProducts(serverObj: any) {
    console.log('InterconversionService :: mappingObjForProduct');
    let auctionProducts: any = [];
    let productsArray = serverObj.listtoproductnav.results;
    console.log('productsArray ', productsArray);
    productsArray.forEach((pItem: any) => {
      let productImages: any = [], productFiles: any = [];
      if (pItem.ZzProductNo) {
        if (serverObj.listtoattachnav['results']) {
          var productImagesArray = serverObj.listtoattachnav['results'].filter(function (el: any) {
            return el.ObjectType == "/AuctionProductImages" &&
              el.ZzProductNo.trim() == pItem.ZzProductNo.trim();
          });
          var productFilesArray = serverObj.listtoattachnav['results'].filter(function (el: any) {
            return el.ObjectType == "/AuctionProductDocuments" &&
              el.ZzProductNo.trim() == pItem.ZzProductNo.trim();
          });
          if (productImagesArray.length > 0) {
            productImagesArray.forEach((value: any) => {
              var imageupload = {
                "name": value.FileName + '.' + value.FileExt,
                "size": '',
                "type": '',
                "filesrc": '',
                "FilenetId": value.FilenetId,
                "MIMEType": value.MIMEType,
                "no": pItem.ZzProductNo
              };
              productImages.push(imageupload);
            });
          }
          if (productFilesArray.length > 0) {
            productFilesArray.forEach((value: any) => {
              var fileupload = {
                "name": value.FileName + '.' + value.FileExt,
                "size": '',
                "type": '',
                "filesrc": '',
                "FilenetId": value.FilenetId,
                "MIMEType": value.MIMEType,
                "no": pItem.ZzProductNo
              };
              productFiles.push(fileupload);
            });
          }
        }
      }
      let item = {
        productNo: pItem.ZzProductNo,
        productName: pItem.Description,
        productCondition: pItem.ZzProductCond,
        productSKUNumber: pItem.ZzProductSku,
        productSerialNumber: pItem.Quantity ? pItem.Quantity.split('.')[0] : '',
        productValue: pItem.ProductValue
          ? pItem.ProductValue.split('.')[0]
          : '',
        productSpec: pItem.ZzProdDesc,
        productImages: productImages,
        productFiles: productFiles,
        location: {
          deliveryDate: pItem.DelivDate
            ? moment(pItem.DelivDate, 'DD.MM.YYYY').format('YYYY-MM-DD')
            : '',
          deliveryTime: pItem.DelivTime
            ? pItem.DelivTime !== 0
              ? moment(pItem.DelivTime, 'HH:mm:ss').format('hh:mm')
              : ''
            : '',
          deliveryTimeSufix: pItem.DelivTime
            ? pItem.DelivTime !== 0
              ? moment(pItem.DelivTime, 'HH:mm:ss').format('A')
              : ''
            : '',
          locLatitude: pItem.ZzLocationCord,
          locLongitude: pItem.ZzLocationCord,
          locRegion: pItem.ZzRegion,
          locCity: pItem.ZzCity,
          locNeighborhood: pItem.ZzNeighbourhood,
          locStreet: pItem.ZzStreet,
          notes: pItem.ZzPdOthrNts,
        },
      };
      auctionProducts.push(item);
    });
    return auctionProducts;
  }

}