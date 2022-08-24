import { Component, OnInit } from '@angular/core';
import { InvoiceForProduct } from 'src/app/model/auction.model';

@Component({
  selector: 'app-bill-pdf-product',
  templateUrl: './bill-pdf-product.component.html',
  styleUrls: ['./bill-pdf-product.component.scss']
})
export class BillPdfProductComponent implements OnInit {

  pdfproductListData : any;
  selectedPageNumber : number;
  pagelimit: number = 10;
  
  invoiceForProduct: InvoiceForProduct = new InvoiceForProduct();
  constructor() { }

  public mapping(serverObj: any) {
    let resultSet: any = [];
    this.invoiceForProduct.applicationPrintingDate = serverObj.d.results[0].printingdate;
    this.invoiceForProduct.productGrandTotal.gearPrice = serverObj.d.results[0].gearPrice;
    this.invoiceForProduct.productGrandTotal.questRate = serverObj.d.results[0].questRate;
    this.invoiceForProduct.productGrandTotal.valueAddTax = serverObj.d.results[0].valueAddTax;
    this.invoiceForProduct.productGrandTotal.totalInvPrice = serverObj.d.results[0].totalInvPrice;
    serverObj.d.results[0].invoice_detail.forEach((result: any) => {
      
      const items ={
        referenceno: result['ObjectId'] ? result['ObjectId'] : '',
        productname: result['productname'] ? result['productname'] : '',
        SKUNumber: result['sku_number'] ? result['sku_number'] : '',
      }
      resultSet.push(items);
    });
    return resultSet;
  }
  ngOnInit(): void {
    this.getAuctionList(1);
  }

  getAuctionList(pageNumber?: number){
    const pageNoVal = '' + pageNumber;
    const page = {
      pageNumber : pageNumber,
      pageLimit : this.pagelimit
    };
    let res={
      "body" : {
        d:{
          results: [
                {
                  "printingdate"    : "02-02-2021",
                  "gearPrice"       : "3,567,938 SAR",
                  "questRate"       : "89,198.45 SAR",
                  "valueAddTax"     : "53,5190.7 SAR",
                  "totalInvPrice"   : "4,103,128.7 SAR",
                  "invoice_detail"  : [
                  {
                    ObjectId:1,
                    productname:"Isuzu Truck No.1",
                    sku_number:"UGG-BB-PUR-06"
                  },
                  {
                    ObjectId:2,
                    productname:"Isuzu Truck No.2",
                    sku_number:"UGG-BB-PUR-06"
                  },
                  {
                    ObjectId:3,
                    productname:"Isuzu Truck No.3",
                    sku_number:"UGG-BB-PUR-06"
                  },
                  {
                    ObjectId:4,
                    productname:"Isuzu Truck No.4",
                    sku_number:"UGG-BB-PUR-06"
                  },
                  {
                    ObjectId:5,
                    productname:"Isuzu Truck No.5",
                    sku_number:"UGG-BB-PUR-06"
                  },
                  {
                    ObjectId:6,
                    productname:"Isuzu Truck No.6",
                    sku_number:"UGG-BB-PUR-06"
                  },
                  {
                    ObjectId:7,
                    productname:"Isuzu Truck No.7",
                    sku_number:"UGG-BB-PUR-06"
                  },
                  {
                    ObjectId:8,
                    productname:"Isuzu Truck No.8",
                    sku_number:"UGG-BB-PUR-06"
                  },
                  {
                    ObjectId:9,
                    productname:"Isuzu Truck No.9",
                    sku_number:"UGG-BB-PUR-06"
                  },
                  {
                    ObjectId:10,
                    productname:"Isuzu Truck No.10",
                    sku_number:"UGG-BB-PUR-06"
                  },
                  {
                    ObjectId:11,
                    productname:"Isuzu Truck No.11",
                    sku_number:"UGG-BB-PUR-06"
                  },
                  {
                    ObjectId:12,
                    productname:"Isuzu Truck No.12",
                    sku_number:"UGG-BB-PUR-06"
                  },
                  {
                    ObjectId:13,
                    productname:"Isuzu Truck No.13",
                    sku_number:"UGG-BB-PUR-06"
                  },
                  {
                    ObjectId:14,
                    productname:"Isuzu Truck No.14",
                    sku_number:"UGG-BB-PUR-06"
                  },
                  {
                    ObjectId:15,
                    productname:"Isuzu Truck No.15",
                    sku_number:"UGG-BB-PUR-06"
                  },
                  ]
                }
              ]
          }
        }
    }
    
    // Service call
    // this.auctionServc.getAuctionList(page, filters).subscribe((res: any) => {
    //   this.showLoader = false;

    //   this.PaginationServc.setPagerValues(
    //     +res.body.d.results[0].TotEle,
    //     10,
    //     +pageNoVal
    //   );

    //   const csrfToken = localStorage.getItem("x-csrf-token");    
    //   localStorage.setItem("x-csrf-token", res.headers.get('x-csrf-token'));
    //   this.auctionListData = this.mapping(res.body);

    // }, (error) => {
    //   this.showLoader = false;
    //   console.log('getAuctionList RespError : ', error);
    // });
      this.pdfproductListData = this.mapping(res.body);
  }
}
